import uuid

from .clock import SystemClock
from .ladder import DEFAULT_TIERS_CENTS, SETTLE_DAYS, Ladder
from .models import (ACTIVE, AUTHORIZED, CAPTURED, DISPUTED, PENDING_HUMAN, REJECTED,
                     REVOKED, SETTLED, VOIDED, Mandate, Purchase)
from .rules import evaluate
from .text import classify_dispute

DAY = 86400


def _uid(prefix):
    return f"{prefix}_{uuid.uuid4().hex[:8]}"


class MandatePay:
    def __init__(self, paypal, ledger, clock=None):
        self.paypal = paypal
        self.ledger = ledger
        self.clock = clock or SystemClock()
        self.mandates = {}
        self.purchases = {}
        self._by_idem = {}

    # --- yardımcılar -------------------------------------------------------
    def _log(self, kind, **payload):
        return self.ledger.append(kind, payload, self.clock())

    def _reserved(self, mandate_id):
        return sum(p.amount_cents for p in self.purchases.values()
                   if p.mandate_id == mandate_id and p.status == AUTHORIZED)

    def _authorize(self, p):
        p.paypal_id = self.paypal.authorize(p.amount_cents, p.merchant)
        p.status = AUTHORIZED
        self._log("AUTHORIZED", purchase=p.id, paypal_id=p.paypal_id, amount=p.amount_cents)

    # --- yaşam döngüsü -----------------------------------------------------
    def create_mandate(self, owner, merchants, shipping_address, tiers_cents=None, days=30):
        now = self.clock()
        m = Mandate(
            id=_uid("mdt"),
            owner=owner,
            merchants=frozenset(merchants),
            shipping_address=shipping_address,
            ladder=Ladder(list(tiers_cents or DEFAULT_TIERS_CENTS)),
            expires_at=now + days * DAY,
        )
        self.mandates[m.id] = m
        self._log("MANDATE_CREATED", mandate=m.id, owner=owner,
                  tiers=m.ladder.tiers_cents, days=days)
        return m

    def request_purchase(self, mandate_id, idem_key, merchant, amount_cents, address):
        # Aynı anahtar: yeni işlem açılmaz, önceki sonuç döner (çift ödeme engeli).
        if idem_key in self._by_idem:
            return self.purchases[self._by_idem[idem_key]]

        m = self.mandates[mandate_id]
        verdict = evaluate(m, merchant, amount_cents, address,
                           self._reserved(mandate_id), self.clock())
        p = Purchase(id=_uid("pur"), mandate_id=mandate_id, idem_key=idem_key,
                     merchant=merchant, amount_cents=amount_cents, address=address,
                     status=REJECTED, reason=verdict.code, created_at=self.clock())
        self.purchases[p.id] = p
        self._by_idem[idem_key] = p.id

        if verdict.code == "APPROVED":
            self._authorize(p)
        elif verdict.code == "PENDING_HUMAN":
            p.status = PENDING_HUMAN
            self._log("PENDING_HUMAN", purchase=p.id, amount=amount_cents,
                      detail=verdict.detail)
        else:
            self._log("REJECTED", purchase=p.id, reason=verdict.code, detail=verdict.detail)
        return p

    def approve_human(self, purchase_id, approver):
        p = self.purchases[purchase_id]
        if p.status != PENDING_HUMAN:
            raise ValueError(f"{purchase_id} is not waiting for human approval")
        m = self.mandates[p.mandate_id]
        # Onay anında kapasite yeniden kontrol edilir; bekleme sırasında durum değişmiş olabilir.
        if self._reserved(p.mandate_id) + p.amount_cents > m.ladder.limit_cents:
            p.status = REJECTED
            p.reason = "CAP_EXCEEDED"
            self._log("REJECTED", purchase=p.id, reason="CAP_EXCEEDED",
                      detail="re-checked at approval")
            return p
        m.ladder.human_gate_remaining = max(0, m.ladder.human_gate_remaining - 1)
        p.reason = "HUMAN_APPROVED"
        self._log("HUMAN_APPROVED", purchase=p.id, approver=approver)
        self._authorize(p)
        return p

    def confirm_delivery(self, purchase_id):
        p = self.purchases[purchase_id]
        if p.status != AUTHORIZED:
            raise ValueError(f"{purchase_id} is not authorized")
        self.paypal.capture(p.paypal_id)
        p.status = CAPTURED
        p.settle_at = self.clock() + SETTLE_DAYS * DAY
        self._log("CAPTURED", purchase=p.id, paypal_id=p.paypal_id)
        return p

    def report_dispute(self, purchase_id, complaint):
        p = self.purchases[purchase_id]
        if p.status not in (AUTHORIZED, CAPTURED):
            raise ValueError(f"{purchase_id} cannot be disputed in status {p.status}")
        if p.status == AUTHORIZED:
            self.paypal.void(p.paypal_id)
        p.status = DISPUTED
        p.dispute_category = classify_dispute(complaint)
        m = self.mandates[p.mandate_id]
        m.ladder.demote()
        self._log("DISPUTED", purchase=p.id, category=p.dispute_category,
                  tier=m.ladder.tier_index, gate=m.ladder.human_gate_remaining)
        return p

    def settle_due(self):
        """Teslim onaylı ve süresi dolmuş, itirazsız işlemleri kapatır ve basamağı yükseltir."""
        now = self.clock()
        settled = []
        for p in self.purchases.values():
            if p.status == CAPTURED and p.settle_at is not None and now >= p.settle_at:
                p.status = SETTLED
                m = self.mandates[p.mandate_id]
                if m.status == ACTIVE:
                    m.ladder.promote()
                self._log("SETTLED", purchase=p.id, tier=m.ladder.tier_index)
                settled.append(p)
        return settled

    def revoke(self, mandate_id):
        m = self.mandates[mandate_id]
        m.status = REVOKED
        for p in self.purchases.values():
            if p.mandate_id == mandate_id and p.status == AUTHORIZED:
                self.paypal.void(p.paypal_id)
                p.status = VOIDED
                self._log("VOIDED", purchase=p.id, reason="MANDATE_REVOKED")
        self._log("MANDATE_REVOKED", mandate=mandate_id)
