import time


class SystemClock:
    def __call__(self):
        return time.time()


class FakeClock:
    """Test ve demo için zamanı kontrol edilebilir saat."""

    def __init__(self, start=1_700_000_000.0):
        self.now = start

    def __call__(self):
        return self.now

    def advance_days(self, days):
        self.now += days * 86400
