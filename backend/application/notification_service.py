from backend.data_access.Notifications.notifications import NotificationRepository

class NotificationService:

    def __init__(self, repo: NotificationRepository):
        self.repo = repo

    def list_notifications(self, user_id: int):
        return self.repo.get_by_user(user_id)

    def mark_read(self, user_id: int, message_id: int):
        notification = self.repo.get_by_id(message_id)
        if not notification:
            raise ValueError("Notification not found")

        if notification.user_id != user_id:
            raise ValueError("Not allowed")

        self.repo.mark_as_read(notification)

    def delete_notification(self, user_id: int, message_id: int):
        notification = self.repo.get_by_id(message_id)
        if not notification:
            raise ValueError("Notification not found")

        if notification.user_id != user_id:
            raise ValueError("Not allowed")

        self.repo.delete(notification)
