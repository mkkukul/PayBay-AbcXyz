import pytest

from mandatepay.ladder import Ladder


def test_promote_stops_at_top():
    l = Ladder([100, 200, 300])
    for _ in range(5):
        l.promote()
    assert l.tier_index == 2 and l.limit_cents == 300


def test_demote_stops_at_floor_and_opens_human_gate():
    l = Ladder([100, 200])
    l.promote()
    l.demote()
    l.demote()
    assert l.tier_index == 0
    assert l.human_gate_remaining == 3


@pytest.mark.parametrize("tiers", [[], [300, 200], [100, 100]])
def test_invalid_tiers_rejected(tiers):
    with pytest.raises(ValueError):
        Ladder(tiers)
