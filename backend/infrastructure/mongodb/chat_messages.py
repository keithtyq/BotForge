from datetime import datetime, timezone
from bson import ObjectId


class ChatMessage:
    def __init__(
        self,
        chatbot_id: int,              # FK to PostgreSQL chatbot table
        session_id: str,
        sender: str,
        message: str,
        intent: str | None = None,
        embedding_id: str | None = None,
        timestamp: datetime | None = None,
        _id: ObjectId | None = None,
    ):
        self._id = _id
        self.chatbot_id = chatbot_id
        self.session_id = session_id
        self.sender = sender
        self.message = message
        self.timestamp = timestamp or datetime.now(timezone.utc)

        self.metadata = {}
        if intent is not None:
            self.metadata["intent"] = intent
        if embedding_id is not None:
            self.metadata["embeddingId"] = embedding_id

    def to_dict(self):
        doc = {
            "chatbotId": self.chatbot_id,
            "sessionId": self.session_id,
            "timestamp": self.timestamp,
            "sender": self.sender,
            "message": self.message,
            "metadata": self.metadata,
        }

        if self._id:
            doc["_id"] = self._id

        return doc
