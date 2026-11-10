"""PayPal adaptörleri.

MockPayPal: çevrimdışı, varsayılan. Demo ve testler bunu kullanır.
SandboxPayPal: PayPal Sandbox REST çağrıları. Henüz uçtan uca test edilmedi;
alıcı onay adımı (buyer approval) manuel olduğu için servis katmanına bağlı değil.
"""
import base64
import json
import os
import urllib.request
import uuid


class MockPayPal:
    def __init__(self):
        self.auths = {}

    def authorize(self, amount_cents, merchant):
        auth_id = f"MOCK-AUTH-{uuid.uuid4().hex[:8]}"
        self.auths[auth_id] = "AUTHORIZED"
        return auth_id

    def capture(self, auth_id):
        self._transition(auth_id, "CAPTURED")

    def void(self, auth_id):
        self._transition(auth_id, "VOIDED")

    def _transition(self, auth_id, new_state):
        if self.auths.get(auth_id) != "AUTHORIZED":
            raise RuntimeError(f"{auth_id} is not in AUTHORIZED state")
        self.auths[auth_id] = new_state


class SandboxPayPal:
    BASE = "https://api-m.sandbox.paypal.com"

    def __init__(self, client_id=None, client_secret=None):
        self.client_id = client_id or os.environ["PAYPAL_CLIENT_ID"]
        self.client_secret = client_secret or os.environ["PAYPAL_CLIENT_SECRET"]
        self._token = None

    def _get_token(self):
        if self._token is None:
            creds = base64.b64encode(f"{self.client_id}:{self.client_secret}".encode()).decode()
            req = urllib.request.Request(
                self.BASE + "/v1/oauth2/token",
                data=b"grant_type=client_credentials",
                method="POST",
                headers={"Authorization": f"Basic {creds}",
                         "Content-Type": "application/x-www-form-urlencoded"},
            )
            with urllib.request.urlopen(req, timeout=30) as r:
                self._token = json.load(r)["access_token"]
        return self._token

    def _call(self, method, path, body=None):
        data = json.dumps(body).encode() if body is not None else None
        req = urllib.request.Request(
            self.BASE + path,
            data=data,
            method=method,
            headers={"Authorization": f"Bearer {self._get_token()}",
                     "Content-Type": "application/json",
                     "PayPal-Request-Id": uuid.uuid4().hex},
        )
        with urllib.request.urlopen(req, timeout=30) as r:
            raw = r.read()
            return json.loads(raw) if raw else {}

    def create_order(self, amount_cents, merchant):
        """Intent AUTHORIZE ile sipariş açar. Dönen approve linkini alıcı onaylamalı."""
        order = self._call("POST", "/v2/checkout/orders", {
            "intent": "AUTHORIZE",
            "purchase_units": [{
                "reference_id": merchant,
                "amount": {"currency_code": "USD", "value": f"{amount_cents / 100:.2f}"},
            }],
        })
        approve = next((l["href"] for l in order["links"] if l["rel"] == "payer-action"), None)
        return order["id"], approve

    def finalize_authorization(self, order_id):
        """Alıcı onayından sonra yetkilendirmeyi kesinleştirir ve authorization id döner."""
        res = self._call("POST", f"/v2/checkout/orders/{order_id}/authorize", {})
        return res["purchase_units"][0]["payments"]["authorizations"][0]["id"]

    def capture(self, auth_id):
        self._call("POST", f"/v2/payments/authorizations/{auth_id}/capture", {"final_capture": True})

    def void(self, auth_id):
        self._call("POST", f"/v2/payments/authorizations/{auth_id}/void", {})
