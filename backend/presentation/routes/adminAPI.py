from flask import Blueprint, request, jsonify
from backend.application.invitation_service import create_invitation, revoke_invitation

admin_bp = Blueprint("admin", __name__)

@admin_bp.post("/invitations")
def invite_operator():
    payload = request.get_json(force=True)
    result = create_invitation(payload)
    return jsonify(result), (200 if result.get("ok") else 400)

@admin_bp.post("/invitations/revoke")
def revoke():
    payload = request.get_json(force=True)
    result = revoke_invitation(payload)
    return jsonify(result), (200 if result.get("ok") else 400)
