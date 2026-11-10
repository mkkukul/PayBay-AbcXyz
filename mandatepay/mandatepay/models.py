from dataclasses import dataclass
from typing import FrozenSet, Optional

from .ladder import Ladder

# Mandate durumları
ACTIVE = "ACTIVE"
REVOKED = "REVOKED"

# Purchase durumları
PENDING_HUMAN = "PENDING_HUMAN"
AUTHORIZED = "AUTHORIZED"
CAPTURED = "CAPTURED"
VOIDED = "VOIDED"
DISPUTED = "DISPUTED"
SETTLED = "SETTLED"
REJECTED = "REJECTED"


@dataclass
class Mandate:
    id: str
    owner: str
    merchants: FrozenSet[str]
    shipping_address: str
    ladder: Ladder
    expires_at: float
    status: str = ACTIVE


@dataclass
class Purchase:
    id: str
    mandate_id: str
    idem_key: str
    merchant: str
    amount_cents: int
    address: str
    status: str
    reason: str
    created_at: float
    paypal_id: Optional[str] = None
    settle_at: Optional[float] = None
    dispute_category: Optional[str] = None
