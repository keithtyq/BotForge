from datetime import datetime, timezone
from bson import ObjectId
from typing import Optional

class ChatMessage:
    """
    Domain representation of a chat message.
    Mirrors MongoDB document structure exactly.
    """

    def __init__(
        self,
        organisation_id: int,
        chatbot_id: int,
        session_id: str,
        sender: str,
        message: str,
        sender_user_id: Optional[int] = None,
        sender_name: Optional[str] = None,
        intent: Optional[str] = None,
        embedding_id: Optional[str] = None,
        timestamp: Optional[datetime] = None,
        _id: Optional[ObjectId] = None,
    ):
        self._id = _id
        self.organisation_id = organisation_id
        self.chatbot_id = chatbot_id
        self.session_id = session_id
        self.sender = sender
        self.sender_user_id = sender_user_id
        self.sender_name = sender_name
        self.message = message
        self.timestamp = timestamp or datetime.now(timezone.utc)

        self.metadata = {}
        if intent:
            self.metadata["intent"] = intent
        if embedding_id:
            self.metadata["embeddingId"] = embedding_id

    def to_dict(self) -> dict:
        doc = {
            "organisationId": self.organisation_id,
            "chatbotId": self.chatbot_id,
            "sessionId": self.session_id,
            "sender": self.sender,
            "senderUserId": self.sender_user_id,
            "senderName": self.sender_name,
            "message": self.message,
            "timestamp": self.timestamp,
            "metadata": self.metadata,
        }

        if self._id:
            doc["_id"] = self._id

        return doc

    @staticmethod
    def from_dict(doc: dict) -> "ChatMessage":
        return ChatMessage(
            organisation_id=doc["organisationId"],
            chatbot_id=doc["chatbotId"],
            session_id=doc["sessionId"],
            sender=doc["sender"],
            message=doc["message"],
            sender_user_id=doc.get("senderUserId"),
            sender_name=doc.get("senderName"),
            intent=doc.get("metadata", {}).get("intent"),
            embedding_id=doc.get("metadata", {}).get("embeddingId"),
            timestamp=doc.get("timestamp"),
            _id=doc.get("_id"),
        )


# ==============================
# MongoDB Repository
# ==============================

class ChatMessageRepository:
    def __init__(self, db):
        self.collection = db.chatMessages

    def insert(self, message: ChatMessage) -> str:
        result = self.collection.insert_one(message.to_dict())
        return str(result.inserted_id)

    def get_by_session(
        self,
        organisation_id: int,
        chatbot_id: int,
        session_id: str,
        limit: int | None = None,
    ):
        cursor = (
            self.collection
            .find({
                "organisationId": organisation_id,
                "chatbotId": chatbot_id,
                "sessionId": session_id,
            })
            .sort("timestamp", -1)  # newest first
        )

        if limit is not None and limit > 0:
            cursor = cursor.limit(limit)

        docs = list(cursor)
        docs.reverse()  # restore chronological order

        return [ChatMessage.from_dict(doc) for doc in docs]

