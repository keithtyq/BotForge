from flask import Blueprint, request, jsonify
from backend.models import Feedback, AppUser
from backend import db

sysadmin_bp = Blueprint("sysadmin", __name__)

@sysadmin_bp.get("/feedback/candidates")
def list_feedback_candidates():

    rows = (
        Feedback.query
        .order_by(
            Feedback.rating.desc().nullslast(),
            Feedback.creation_date.desc()
        )
        .all()
    )

    candidates = []
    for fb in rows:
        sender = AppUser.query.get(fb.sender_id)

        candidates.append({
            "feedback_id": fb.feedback_id,
            "sender_id": fb.sender_id,
            "sender_username": sender.username if sender else None,
            "sender_role_id": sender.role_id if sender else None,
            "rating": fb.rating,
            "title": fb.title,
            "content": fb.content,
            "is_testimonial": fb.is_testimonial,
            "creation_date": fb.creation_date.isoformat() if fb.creation_date else None
        })

    return jsonify({"ok": True, "candidates": candidates}), 200


@sysadmin_bp.post("/testimonials/feature")
def feature_feedback():
    
    # Body: { "feedback_id": 1, "is_testimonial": true/false }
    
    payload = request.get_json(force=True)
    feedback_id = payload.get("feedback_id")
    is_testimonial = payload.get("is_testimonial")

    if feedback_id is None or is_testimonial is None:
        return jsonify({"ok": False, "error": "feedback_id and is_testimonial required."}), 400

    fb = Feedback.query.get(int(feedback_id))
    if not fb:
        return jsonify({"ok": False, "error": "Feedback not found."}), 404

    fb.is_testimonial = bool(is_testimonial)
    db.session.commit()

    return jsonify({
        "ok": True,
        "message": "Updated testimonial flag.",
        "feedback_id": fb.feedback_id,
        "is_testimonial": fb.is_testimonial
    }), 200
