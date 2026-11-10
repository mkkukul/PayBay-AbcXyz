"""Deterministik kural motoru. AI burada karar vermez; sıra önemlidir, ilk başarısızlıkta durulur."""
from typing import NamedTuple

from .models import ACTIVE


class Verdict(NamedTuple):
    code: str
    detail: str = ""


def evaluate(mandate, merchant, amount_cents, address, reserved_cents, now):
    if amount_cents <= 0:
        return Verdict("INVALID_AMOUNT")
    if mandate.status != ACTIVE:
        return Verdict("MANDATE_INACTIVE", mandate.status)
    if now >= mandate.expires_at:
        return Verdict("MANDATE_EXPIRED")
    if merchant not in mandate.merchants:
        return Verdict("MERCHANT_NOT_ALLOWED", merchant)
    limit = mandate.ladder.limit_cents
    if amount_cents > limit:
        return Verdict("PER_REQUEST_LIMIT", f"{amount_cents} > current tier {limit}")
    if reserved_cents + amount_cents > limit:
        return Verdict("CAP_EXCEEDED", f"reserved {reserved_cents} + {amount_cents} > {limit}")
    if address != mandate.shipping_address:
        return Verdict("ADDRESS_MISMATCH")
    if mandate.ladder.human_gate_remaining > 0:
        return Verdict("PENDING_HUMAN", f"{mandate.ladder.human_gate_remaining} human approvals left")
    return Verdict("APPROVED")
