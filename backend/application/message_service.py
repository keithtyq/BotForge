# backend/application/chat_conversation_service.py
from backend.application.chat_service import ChatMessageService


class ChatConversationService:
    """
    Manages chat conversations by integrating message storage and chatbot engine.
    All messages are automatically saved.
    """

    def __init__(self, chatbot_engine):
        self.chatbot_engine = chatbot_engine
        self.message_service = ChatMessageService()

    def handle_message(
        self,
        chatbot_id: int,
        session_id: str,
        user_message: str
    ) -> str:

        # Save user message
        self.message_service.save_message(
            chatbot_id=chatbot_id,
            session_id=session_id,
            sender="user",
            message=user_message
        )

        # Generate reply
        result = self.chatbot_engine.reply(user_message)
        if isinstance(result, tuple):
            reply, intent = result
        else:
            reply, intent = result, None

        # Save bot reply
        self.message_service.save_message(
            chatbot_id=chatbot_id,
            session_id=session_id,
            sender="bot",
            message=reply,
            intent=intent
        )

        return reply
