from backend import db
from backend.models import AppUser, Organisation
from backend.data_access.Subscriptions import SubscriptionRepository


class AssignSubscriptionUseCase:
    """
    Assigns a subscription plan to a user's organisation according to what the user selected.
    Called during registration for unregistered users.
    """

    def __init__(self, subscription_repo: SubscriptionRepository):
        self.subscription_repo = subscription_repo

    def execute(self, user_id: int, subscription_id: int) -> dict:
        user = AppUser.query.get(user_id)
        if not user:
            return {"ok": False, "error": "User not found."}

        if not user.organisation_id:
            return {"ok": False, "error": "User has no organisation."}

        subscription = self.subscription_repo.get_active_by_id(subscription_id)
        if not subscription:
            return {"ok": False, "error": "Invalid or inactive subscription."}

        organisation = Organisation.query.get(user.organisation_id)
        if not organisation:
            return {"ok": False, "error": "Organisation not found."}

        organisation.subscription_id = subscription.subscription_id
        db.session.commit()

        return {
            "ok": True,
            "organisation_id": organisation.organisation_id,
            "subscription_id": subscription.subscription_id,
        }
