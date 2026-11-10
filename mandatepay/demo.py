"""Uçtan uca demo. Kullanım: python demo.py [--lang en|fr|es|de|it|ar|pt|ru|tr]"""
import sys

from mandatepay import Ledger, MandatePay, MockPayPal
from mandatepay.clock import FakeClock
from mandatepay.i18n import t, resolve_lang
from mandatepay.text import parse_amount_cents

ADDR = "Istanbul HQ"


def usd(cents):
    return f"${cents / 100:.2f}"


def main(argv=None):
    lang = resolve_lang(sys.argv[1:] if argv is None else argv)
    clock = FakeClock()
    ledger = Ledger()
    mp = MandatePay(MockPayPal(), ledger, clock)
    m = mp.create_mandate("team-ai", {"api-credits-co", "devtools-shop"}, ADDR)
    print(t("demo.header", lang, id=m.id,
            tiers=", ".join(usd(x) for x in m.ladder.tiers_cents),
            cap=usd(m.ladder.limit_cents)) + "\n")

    def show(p):
        print(t("demo.status_line", lang,
                status=t(f"status.{p.status}", lang) if f"status.{p.status}" in
                _keys() else p.status,
                reason=t(f"reason.{p.reason}", lang)))

    print(t("demo.step1", lang))
    amt = parse_amount_cents("API credits $15")
    p1 = mp.request_purchase(m.id, "req-1", "api-credits-co", amt, ADDR)
    show(p1)
    mp.confirm_delivery(p1.id)
    print(t("demo.delivered", lang))
    clock.advance_days(7)
    mp.settle_due()
    print(t("demo.settled", lang, cap=usd(m.ladder.limit_cents)) + "\n")

    print(t("demo.step2", lang))
    p2 = mp.request_purchase(m.id, "req-2", "api-credits-co", 5500, ADDR)
    show(p2)
    print()

    print(t("demo.step3", lang))
    p3 = mp.request_purchase(m.id, "req-3", "devtools-shop", 3500, ADDR)
    show(p3)
    mp.report_dispute(p3.id, "Order not received, tracking shows nothing")
    print(t("demo.disputed", lang, cat=t(f"category.{p3.dispute_category}", lang),
            cap=usd(m.ladder.limit_cents), n=m.ladder.human_gate_remaining) + "\n")

    print(t("demo.step4", lang))
    p4 = mp.request_purchase(m.id, "req-4", "api-credits-co", 1000, ADDR)
    show(p4)
    mp.approve_human(p4.id, approver="ops-lead")
    print(t("demo.approved_by", lang, status=t(f"status.{p4.status}", lang),
            n=m.ladder.human_gate_remaining) + "\n")

    print(t("demo.step5", lang))
    again = mp.request_purchase(m.id, "req-4", "api-credits-co", 1000, ADDR)
    print(t("demo.same", lang, ans=t("demo.yes" if again.id == p4.id else "demo.no", lang)) + "\n")

    print(t("demo.step6", lang))
    ok, _ = ledger.verify()
    print(t("demo.chain_ok", lang, n=len(ledger.events())))
    ledger.db.execute("UPDATE events SET payload = '{\"tampered\": true}' WHERE seq = 3")
    ledger.db.commit()
    ok, bad = ledger.verify()
    print(t("demo.tampered", lang, seq=bad))


def _keys():
    from mandatepay.i18n import MESSAGES
    return MESSAGES["en"]


if __name__ == "__main__":
    main()
