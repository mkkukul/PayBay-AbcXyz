"""Kural tabanlı metin yardımcıları. LLM bağlanana kadar yedek olarak çalışır."""
import re

AMOUNT_RE = re.compile(
    r"(?:\$|USD\s*)(\d+(?:\.\d{1,2})?)|(\d+(?:\.\d{1,2})?)\s*(?:USD|\$)",
    re.IGNORECASE,
)

DISPUTE_RULES = [
    ("NOT_RECEIVED", ["not received", "never arrived", "didn't arrive", "did not arrive",
                      "no delivery", "missing"]),
    ("NOT_AS_DESCRIBED", ["not as described", "damaged", "wrong item", "different from"]),
    ("UNAUTHORIZED", ["unauthorized", "didn't authorize", "did not authorize", "fraud"]),
]


def parse_amount_cents(text):
    m = AMOUNT_RE.search(text)
    if not m:
        return None
    value = m.group(1) or m.group(2)
    return int(round(float(value) * 100))


def classify_dispute(text):
    lowered = text.lower()
    for category, keywords in DISPUTE_RULES:
        if any(k in lowered for k in keywords):
            return category
    return "OTHER"
