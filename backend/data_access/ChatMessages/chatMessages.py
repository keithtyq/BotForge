class ChatMessageRepository:

    def __init__(self, db):
        self.collection = db["chat_messages"]

    def insert(self, chat_message):
        doc = chat_message.to_dict()
        result = self.collection.insert_one(doc)
        return result.inserted_id

    def get_by_session(self, chatbot_id: int, session_id: str):
        return list(
            self.collection.find(
                {
                    "chatbotId": chatbot_id,
                    "sessionId": session_id
                }
            ).sort("timestamp", 1)
        )
