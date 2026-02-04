from flask import Blueprint, request, jsonify
from backend.data_access.Feedback.feedback import FeedbackRepository
from backend.data_access.Users.users import UserRepository
from backend.data_access.Notifications.notifications import NotificationRepository
from backend.application.notification_service import NotificationService
from backend.application.Feedback.submitFeedback import SubmitFeedbackUseCase

feedback_bp = Blueprint("feedback", __name__, url_prefix="/api")


@feedback_bp.post("/feedback")
def submit_feedback():
    """
    POST /api/feedback
    Body:
    {
        "sender_id": 1,
        "purpose": "Bug Report",
        "rating": 4,
        "content": "The chatbot works well but lags occasionally."
    }
    """

    payload = request.get_json() or {}

    # Repositories
    feedback_repo = FeedbackRepository()
    user_repo = UserRepository()
    notification_repo = NotificationRepository()

    # Services
    notification_service = NotificationService(notification_repo, user_repo)

    # Use case
    use_case = SubmitFeedbackUseCase(
        feedback_repo,
        user_repo,
        notification_service
    )

    result = use_case.execute(payload)

    status_code = 201 if result.get("ok") else 400
    return jsonify(result), status_code
