"""Zincirlenmiş (hash chain) olay kaydı. Bir kayıt değişirse doğrulama başarısız olur."""
import hashlib
import json
import sqlite3

GENESIS = "GENESIS"


class Ledger:
    def __init__(self, path=":memory:"):
        self.db = sqlite3.connect(path)
        self.db.execute(
            "CREATE TABLE IF NOT EXISTS events ("
            "seq INTEGER PRIMARY KEY AUTOINCREMENT, ts REAL, kind TEXT, "
            "payload TEXT, prev_hash TEXT, hash TEXT)"
        )
        self.db.commit()

    @staticmethod
    def _digest(prev, ts, kind, payload):
        return hashlib.sha256(f"{prev}|{ts}|{kind}|{payload}".encode()).hexdigest()

    def _last_hash(self):
        row = self.db.execute("SELECT hash FROM events ORDER BY seq DESC LIMIT 1").fetchone()
        return row[0] if row else GENESIS

    def append(self, kind, payload, ts):
        body = json.dumps(payload, sort_keys=True, ensure_ascii=False)
        prev = self._last_hash()
        h = self._digest(prev, ts, kind, body)
        self.db.execute(
            "INSERT INTO events (ts, kind, payload, prev_hash, hash) VALUES (?,?,?,?,?)",
            (ts, kind, body, prev, h),
        )
        self.db.commit()
        return h

    def events(self):
        return self.db.execute(
            "SELECT seq, ts, kind, payload, prev_hash, hash FROM events ORDER BY seq"
        ).fetchall()

    def verify(self):
        """Returns (True, None) if chain is intact, else (False, seq_of_first_bad_event)."""
        prev = GENESIS
        for seq, ts, kind, payload, prev_hash, h in self.events():
            if prev_hash != prev or self._digest(prev, ts, kind, payload) != h:
                return False, seq
            prev = h
        return True, None
