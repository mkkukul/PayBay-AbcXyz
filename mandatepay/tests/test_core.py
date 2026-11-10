import pytest

from mandatepay import Ledger, MandatePay, MockPayPal
from mandatepay.clock import FakeClock

ADDR = "Istanbul HQ"
MERCH = {"api-credits-co"}


@pytest.fixture
def mp():
    return MandatePay(MockPayPal(), Ledger(), FakeClock())


@pytest.fixture
def m(mp):
    return mp.create_mandate("team", MERCH, ADDR)


def test_approved_request_is_authorized(mp, m):
    p = mp.request_purchase(m.id, "a", "api-credits-co", 1500, ADDR)
    assert p.status == "AUTHORIZED" and p.reason == "APPROVED"


def test_per_request_limit(mp, m):
    p = mp.request_purchase(m.id, "a", "api-credits-co", 5500, ADDR)
    assert p.status == "REJECTED" and p.reason == "PER_REQUEST_LIMIT"


def test_merchant_not_allowed(mp, m):
    p = mp.request_purchase(m.id, "a", "unknown-shop", 1000, ADDR)
    assert p.reason == "MERCHANT_NOT_ALLOWED"


def test_address_mismatch(mp, m):
    p = mp.request_purchase(m.id, "a", "api-credits-co", 1000, "Elsewhere")
    assert p.reason == "ADDRESS_MISMATCH"


def test_cap_counts_outstanding_authorizations(mp, m):
    # starting tier is 20 USD: 15 + 10 = 25 exceeds the 20 USD cap
    mp.request_purchase(m.id, "a", "api-credits-co", 1500, ADDR)
    p = mp.request_purchase(m.id, "b", "api-credits-co", 1000, ADDR)
    assert p.reason == "CAP_EXCEEDED"


def test_same_idem_key_does_not_double_authorize(mp, m):
    p1 = mp.request_purchase(m.id, "same", "api-credits-co", 1000, ADDR)
    p2 = mp.request_purchase(m.id, "same", "api-credits-co", 1000, ADDR)
    assert p1.id == p2.id and len(mp.purchases) == 1


def test_expired_mandate_rejects(mp, m):
    mp.clock.advance_days(31)
    p = mp.request_purchase(m.id, "a", "api-credits-co", 1000, ADDR)
    assert p.reason == "MANDATE_EXPIRED"


def test_revoke_voids_open_authorizations(mp, m):
    p = mp.request_purchase(m.id, "a", "api-credits-co", 1000, ADDR)
    mp.revoke(m.id)
    assert p.status == "VOIDED"
    assert mp.request_purchase(m.id, "b", "api-credits-co", 1000, ADDR).reason == "MANDATE_INACTIVE"


def test_clean_settlement_promotes_only_after_window(mp, m):
    p = mp.request_purchase(m.id, "a", "api-credits-co", 1000, ADDR)
    mp.confirm_delivery(p.id)
    mp.clock.advance_days(6)
    mp.settle_due()
    assert m.ladder.tier_index == 0
    mp.clock.advance_days(1)
    mp.settle_due()
    assert m.ladder.tier_index == 1 and p.status == "SETTLED"


def test_dispute_demotes_gates_and_human_approval_works(mp, m):
    p = mp.request_purchase(m.id, "a", "api-credits-co", 1000, ADDR)
    mp.report_dispute(p.id, "item not received")
    assert m.ladder.tier_index == 0 and m.ladder.human_gate_remaining == 3
    assert p.dispute_category == "NOT_RECEIVED"

    q = mp.request_purchase(m.id, "b", "api-credits-co", 1000, ADDR)
    assert q.status == "PENDING_HUMAN"
    mp.approve_human(q.id, "lead")
    assert q.status == "AUTHORIZED" and m.ladder.human_gate_remaining == 2


def test_dispute_on_captured_does_not_void(mp, m):
    p = mp.request_purchase(m.id, "a", "api-credits-co", 1000, ADDR)
    mp.confirm_delivery(p.id)
    mp.report_dispute(p.id, "fraud, I never bought this")
    assert p.status == "DISPUTED" and p.dispute_category == "UNAUTHORIZED"


def test_demote_at_floor_stays_at_floor(mp, m):
    p = mp.request_purchase(m.id, "a", "api-credits-co", 1000, ADDR)
    mp.report_dispute(p.id, "damaged")
    assert m.ladder.tier_index == 0
