from flask import Blueprint, request, jsonify
from backend.data_access.Organisation.orgRoles import OrgRoleRepository
from backend.data_access.Organisation.orgRolePermissions import OrgRolePermissionRepository
from backend.application.Organisation.orgRolePermissions import ManageOrgRolePermissions

from backend.models import OrgPermission

org_role_permissions_bp = Blueprint(
    "org_role_permissions",
    __name__,
    url_prefix="/api/org-roles"
)


@org_role_permissions_bp.get("/permissions")
def list_permissions():
    permissions = OrgPermission.query.order_by(OrgPermission.code.asc()).all()
    return jsonify([
        {
            "id": p.org_permission_id,
            "code": p.code,
            "description": p.description
        }
        for p in permissions
    ]), 200


@org_role_permissions_bp.put("/<int:org_role_id>/permissions")
def assign_permissions(org_role_id):
    data = request.json or {}

    permission_ids = data.get("permission_ids")

    if not isinstance(permission_ids, list):
        return jsonify({"error": "permission_ids must be a list"}), 400

    role_repo = OrgRoleRepository()
    perm_repo = OrgRolePermissionRepository()
    service = ManageOrgRolePermissions(role_repo, perm_repo)

    try:
        result = service.assign_permissions(
            org_role_id=org_role_id,
            permission_ids=permission_ids
        )
        return jsonify(result), 200

    except ValueError as e:
        return jsonify({"error": str(e)}), 400
