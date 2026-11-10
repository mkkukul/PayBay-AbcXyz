from mandatepay import Ledger, MandatePay, MockPayPal
from mandatepay.clock import FakeClock


def build():
    mp = MandatePay(MockPayPal(), Ledger(), FakeClock())
    m = mp.create_mandate("team", {"shop"}, "HQ")
    mp.request_purchase(m.id, "a", "shop", 1000, "HQ")
    return mp


def test_chain_is_intact_after_normal_flow():
    mp = build()
    assert mp.ledger.verify() == (True, None)


def test_tampering_is_detected_at_the_changed_event():
    mp = build()
    mp.ledger.db.execute("UPDATE events SET payload='{}' WHERE seq=2")
    mp.ledger.db.commit()
    assert mp.ledger.verify() == (False, 2)
