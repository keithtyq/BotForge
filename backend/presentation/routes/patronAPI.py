from flask import Blueprint, request, jsonify
from models import Organisation, Chatbot, AppUser
from __init__ import db

patron_bp = Blueprint("patron", __name__)

@patron_bp.get("/chat-directory")
def chat_directory():
    user_id = request.headers.get("X-USER-ID")
    if not user_id:
        return jsonify({"ok": False, "error": "Unauthorized"}), 401

    user = AppUser.query.get(user_id)
    if not user or user.system_role_id != 2:
        return jsonify({"ok": False, "error": "Forbidden"}), 403

    rows = (
        db.session.query(
            Chatbot.bot_id,
            Chatbot.name.label("bot_name"),
            Chatbot.organisation_id,
            Organisation.industry,
        )
        .join(Organisation)
        .order_by(Organisation.industry.asc(), Chatbot.name.asc())
        .all()
    )

    grouped = {}
    for r in rows:
        industry = r.industry or "Other"
        grouped.setdefault(industry, []).append({
            "bot_id": r.bot_id,
            "company_id": r.organisation_id,
            "name": r.bot_name,
        })

    return jsonify({
        "ok": True,
        "industries": [{"title": k, "orgs": v} for k, v in grouped.items()]
    }), 200
