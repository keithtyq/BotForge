from backend.models import ChatbotQuickReply

LANGUAGE_MAP = {
    "english": "en",
    "en": "en",
    "french": "fr",
    "fr": "fr",
    "chinese": "zh",
    "zh": "zh",
}


class QuickReplyRepository:
    """
    Data access layer for chatbot quick replies.

    Reads org-specific rows first, then industry defaults, then general defaults.
    Falls back to an in-code English list if DB does not have data.
    """

    DEFAULT_QUICK_REPLIES = {
        "en": [
            "Business hours",
            "Location",
            "Pricing",
            "Contact support",
            "Make a booking",
        ],
        "fr": [
            "Heures d'ouverture",
            "Localisation",
            "Tarifs",
            "Contacter le support",
            "Faire une réservation",
        ],
        "zh": [
            "营业时间",
            "地址",
            "价格",
            "联系客服",
            "预约",
        ],
    }

    def _normalize_language(self, language: str | None) -> str:
        if not language:
            return "en"
        return LANGUAGE_MAP.get(language.strip().lower(), "en")

    def get_quick_replies(self, company_id: str | int | None, industry: str, intent: str, language: str | None):
        industry = industry or "default"
        intent = intent or "any"
        language = self._normalize_language(language)

        def _query(org_id: int | None, ind: str, lang: str, it: str):
            return (
                ChatbotQuickReply.query
                .filter_by(
                    organisation_id=org_id,
                    industry=ind,
                    language=lang,
                    intent=it,
                )
                .order_by(ChatbotQuickReply.display_order.asc())
                .all()
            )

        org_id = None
        try:
            org_id = int(company_id) if company_id is not None else None
        except (TypeError, ValueError):
            org_id = None

        # 1) Org-specific for intent, then any
        if org_id is not None:
            rows = _query(org_id, industry, language, intent)
            if rows:
                return [r.text for r in rows]
            rows = _query(org_id, industry, language, "any")
            if rows:
                return [r.text for r in rows]

        # 2) Industry defaults
        rows = _query(None, industry, language, intent)
        if rows:
            return [r.text for r in rows]
        rows = _query(None, industry, language, "any")
        if rows:
            return [r.text for r in rows]

        # 3) Default industry
        rows = _query(None, "default", language, intent)
        if rows:
            return [r.text for r in rows]
        rows = _query(None, "default", language, "any")
        if rows:
            return [r.text for r in rows]

        return self.DEFAULT_QUICK_REPLIES.get(language, self.DEFAULT_QUICK_REPLIES["en"])
