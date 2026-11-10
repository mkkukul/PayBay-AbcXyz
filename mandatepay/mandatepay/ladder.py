from dataclasses import dataclass

DEFAULT_TIERS_CENTS = [2000, 4000, 8000]  # 20, 40, 80 USD
SETTLE_DAYS = 7
HUMAN_GATE_AFTER_DISPUTE = 3


@dataclass
class Ladder:
    """Kazanılan özerklik basamakları.

    Tavan başlangıçta en düşük basamaktadır. Teslim onaylı ve itirazsız
    kapanan işlemler basamağı yükseltir. İtiraz basamağı düşürür ve sonraki
    işlemleri insan onayına zorlar. Basamakları yalnızca ekip sahibi tanımlar.
    """

    tiers_cents: list
    tier_index: int = 0
    human_gate_remaining: int = 0

    def __post_init__(self):
        if not self.tiers_cents or sorted(self.tiers_cents) != self.tiers_cents:
            raise ValueError("tiers must be a non-empty ascending list")
        if len(set(self.tiers_cents)) != len(self.tiers_cents):
            raise ValueError("tiers must be unique")

    @property
    def limit_cents(self):
        return self.tiers_cents[self.tier_index]

    def promote(self):
        if self.tier_index < len(self.tiers_cents) - 1:
            self.tier_index += 1

    def demote(self):
        if self.tier_index > 0:
            self.tier_index -= 1
        self.human_gate_remaining = HUMAN_GATE_AFTER_DISPUTE
