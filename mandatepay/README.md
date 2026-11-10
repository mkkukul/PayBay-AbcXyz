# MandatePay

**AI ajanlarına harcama yetkisini kazandırılan bir sistem.** Ajan küçük bir tavanla başlar.
Teslim onaylı ve itirazsız kapanan her işlem tavanı bir basamak yükseltir. İtiraz tavanı düşürür
ve sonraki işlemleri insan onayına zorlar. Her karar zincirlenmiş bir kayıt defterine yazılır.

## Neden

Bugün bir AI ajanına para harcama yetkisi verirken ya çok sıkı (her şeyi insan onaylar) ya da
çok gevşek (sınırsız yetki) olmak zorunda kalırsınız. MandatePay yetkiyi davranışla büyütüp
küçültür ve bunu kanıtla izlenebilir kılar.

## Mimari ilkesi

**AI karar vermez, kurallar karar verir.** AI yalnızca talebi yapılandırır ve açıklama yazar
(bu sürümde kural tabanlı yedek olarak çalışır). Tavan, basamak ve onay kararları deterministik
koddadır.

## Hızlı başlangıç

```bash
pip install -r requirements-dev.txt
python -m pytest -q          # testler
python demo.py               # uçtan uca demo
```

Çalışma zamanı bağımlılığı yoktur (yalnızca standart kütüphane). Testler için pytest gerekir.

## Kural kontrol sırası

| Sıra | Kod | Anlamı |
|---|---|---|
| 1 | `INVALID_AMOUNT` | Tutar sıfır ya da negatif |
| 2 | `MANDATE_INACTIVE` | Yetki iptal edilmiş |
| 3 | `MANDATE_EXPIRED` | Yetki süresi dolmuş |
| 4 | `MERCHANT_NOT_ALLOWED` | Satıcı izinli listede değil |
| 5 | `PER_REQUEST_LIMIT` | Tutar mevcut basamak tavanını aşıyor |
| 6 | `CAP_EXCEEDED` | Açık yetkilendirmeler + yeni tutar tavanı aşıyor |
| 7 | `ADDRESS_MISMATCH` | Teslimat adresi yetkideki adresle farklı |
| 8 | `PENDING_HUMAN` | İtiraz sonrası insan onayı bekleniyor |
| 9 | `APPROVED` | Yetkilendirmeye geçer |

Aynı `idem_key` ile gelen tekrar istek yeni işlem açmaz, önceki sonucu döndürür.

## Basamaklar

- Başlangıç: 20 USD, sonra 40 USD, sonra 80 USD (ekip tanımlar, AI değiştiremez).
- Teslim onaylı işlem 7 gün itirazsız kalırsa basamak yükselir.
- İtiraz basamağı düşürür ve sonraki 3 işlemi insan onayına alır.

## Kayıt zinciri

Her olay, önceki olayın hash'ini içerir. Bir kayıt değiştirilirse `Ledger.verify()` bozulan
ilk olayın sıra numarasını döndürür. `demo.py` bunu gösterir.

## Bilinen sınırlar (dürüst liste)

- Durum bellekte tutulur, kalıcı depolama henüz yok (olaylar SQLite'a yazılır, ama mandate ve
  purchase durumu yeniden oluşturulamaz).
- Varsayılan PayPal adaptörü `MockPayPal`'dır. `SandboxPayPal` sipariş oluşturma, onay sonrası
  yetkilendirme, capture ve void çağrılarını içerir ama **uçtan uca test edilmedi**; alıcı onay
  adımı manuel olduğu için servise bağlı değildir.
- Dispute sınıflandırması anahtar kelime tabanlıdır. LLM ile değiştirilmeye hazır.
- Web arayüzü yoktur. Demo terminaldedir.

## Yol haritası

1. Sandbox'ta uçtan uca: create order → alıcı onayı → finalize authorization → capture/void.
2. Kalıcı depolama (SQLite'ta mandate ve purchase tabloları).
3. PayPal webhook'ları ile itirazların otomatik yakalanması.
4. Streamlit tek ekran: tavan panosu, işlem listesi, zincir doğrulama butonu.
5. Basamak verisinden "ajan güven skoru" API'si.

## Lisans

MIT
