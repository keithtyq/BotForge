from flask import Blueprint, request, jsonify
from backend import db
from backend.models import Organisation, Feedback, AppUser, FAQ, OrgRole
from sqlalchemy import desc
from backend.application.auth_service import (
    register_org_admin, confirm_email, login, update_org_profile
)

unregistered_bp = Blueprint("unregistered", __name__)

@unregistered_bp.post("/register")
def register():
    payload = request.get_json(force=True)
    result = register_org_admin(payload)
    return jsonify(result), (200 if result.get("ok") else 400)

@unregistered_bp.get("/verify-email")
def verify_email():
    token = request.args.get("token", "")
    result = confirm_email(token)
    return jsonify(result), (200 if result.get("ok") else 400)

@unregistered_bp.post("/login")
def do_login():
    payload = request.get_json(force=True)
    result = login(payload)
    return jsonify(result), (200 if result.get("ok") else 401)

@unregistered_bp.post("/organisation/profile")
def org_profile():
    payload = request.get_json(force=True)
    result = update_org_profile(payload)
    return jsonify(result), (200 if result.get("ok") else 400)

@unregistered_bp.get("/organisation/profile/<int:organisation_id>")
def get_org_profile(organisation_id):
    org = Organisation.query.get(organisation_id)

    if not org:
        return jsonify({
            "ok": False,
            "error": "Organisation not found."
        }), 404

    return jsonify({
        "ok": True,
        "organisation": {
            "organisation_id": org.organisation_id,
            "name": org.name,
            "industry": org.industry,
            "size": org.size,
            "subscription_id": org.subscription_id
        }
    }), 200

@unregistered_bp.get("/testimonials")
def get_testimonials():
    testimonials = []

    def pick_for_group(role_name: str):
        # 1) override: featured first
        featured = (
            Feedback.query
            .join(AppUser, Feedback.sender_id == AppUser.user_id)
            .join(OrgRole, AppUser.org_role_id == OrgRole.org_role_id)
            .filter(OrgRole.name == role_name)
            .filter(Feedback.is_testimonial.is_(True))
            .filter(Feedback.content.isnot(None))
            .order_by(Feedback.creation_date.desc())
            .first()
        )
        if featured:
            return featured

        # 2) default: best rating then newest
        best = (
            Feedback.query
            .join(AppUser, Feedback.sender_id == AppUser.user_id)
            .join(OrgRole, AppUser.org_role_id == OrgRole.org_role_id)
            .filter(OrgRole.name == role_name)
            .filter(Feedback.content.isnot(None))
            .order_by(Feedback.rating.desc().nullslast(), Feedback.creation_date.desc())
            .first()
        )
        return best

    # Slot 1: ORG_ADMIN
    orgadmin_fb = pick_for_group("ORG_ADMIN")
    if orgadmin_fb:
        sender = AppUser.query.get(orgadmin_fb.sender_id)
        testimonials.append({
            "feedback_id": orgadmin_fb.feedback_id,
            "role": "ORG_ADMIN",
            "author": sender.username if sender else "Anonymous",
            "rating": orgadmin_fb.rating,
            "title": orgadmin_fb.title,
            "content": orgadmin_fb.content,
            "date": orgadmin_fb.creation_date.isoformat() if orgadmin_fb.creation_date else None
        })

    # Slot 2: STAFF (operator/staff)
    staff_fb = pick_for_group("STAFF")
    if staff_fb:
        sender = AppUser.query.get(staff_fb.sender_id)
        testimonials.append({
            "feedback_id": staff_fb.feedback_id,
            "role": "STAFF",
            "author": sender.username if sender else "Anonymous",
            "rating": staff_fb.rating,
            "title": staff_fb.title,
            "content": staff_fb.content,
            "date": staff_fb.creation_date.isoformat() if staff_fb.creation_date else None
        })

    return jsonify({"ok": True, "testimonials": testimonials}), 200




@unregistered_bp.get("/faq")
def list_public_faq():
    rows = (
        FAQ.query
        .filter(FAQ.status == 0)
        .order_by(FAQ.display_order.asc(), FAQ.faq_id.asc())
        .all()
    )

    return jsonify({
        "ok": True,
        "faqs": [
            {
                "faq_id": f.faq_id,
                "question": f.question,
                "answer": f.answer
            } for f in rows
        ]
    }), 200