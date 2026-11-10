from mandatepay.i18n import MESSAGES, SUPPORTED, placeholders, resolve_lang, t


def test_every_language_has_every_key_as_english():
    en_keys = set(MESSAGES["en"])
    for lang in SUPPORTED:
        assert set(MESSAGES[lang]) == en_keys, f"{lang} key mismatch"


def test_placeholders_match_english_in_every_language():
    for key, en_text in MESSAGES["en"].items():
        expected = placeholders(en_text)
        for lang in SUPPORTED:
            assert placeholders(MESSAGES[lang][key]) == expected, f"{lang}:{key}"


def test_all_languages_are_supported_names():
    assert set(SUPPORTED) == {"en", "fr", "es", "de", "it", "ar", "pt", "ru", "tr"}


def test_t_formats_and_falls_back():
    assert t("demo.yes", "tr") == "evet"
    assert t("demo.chain_ok", "fr", n=5) == "   5 événements, chaîne INTACTE"
    assert t("reason.APPROVED", "xx") == "Approved"


def test_resolve_lang_precedence_and_validation():
    assert resolve_lang(["--lang", "ar"], env={}) == "ar"
    assert resolve_lang([], env={"MANDATEPAY_LANG": "ru"}) == "ru"
    assert resolve_lang([], env={}) == "en"
    try:
        resolve_lang(["--lang", "klingon"], env={})
    except SystemExit:
        pass
    else:
        raise AssertionError("unsupported language accepted")
