from backend import db
from backend.models import AppUser, OrgRole


class UserRepository:

    def get_by_id(self, user_id: int) -> AppUser | None:
        return db.session.get(AppUser, user_id)

    def get_by_organisation(self, organisation_id: int):
        return (
            AppUser.query
            .filter(AppUser.organisation_id == organisation_id)
            .all()
        )

    def get_org_role(self, role_id: int) -> OrgRole | None:
        return db.session.get(OrgRole, role_id)

    def update_org_role(
        self,
        user_id: int,
        organisation_id: int,
        new_org_role_id: int
    ) -> AppUser:

        user = self.get_by_id(user_id)
        if not user:
            raise ValueError("User not found")

        if user.organisation_id != organisation_id:
            raise ValueError("Organisation mismatch")

        user.org_role_id = new_org_role_id

        try:
            db.session.commit()
        except Exception:
            db.session.rollback()
            raise

        return user
