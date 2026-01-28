import numpy as np
from sentence_transformers import SentenceTransformer

from backend.application.ai.intent_training_data import INTENT_EXAMPLES


class EmbeddingIntentService:
    """
    Intent detection using sentence embeddings + cosine similarity.
    This is a lightweight pretrained alternative to the TF-IDF model.
    """

    def __init__(self, model_name: str = "sentence-transformers/all-MiniLM-L6-v2"):
        self.model = SentenceTransformer(model_name)
        self._intent_texts: list[str] = []
        self._intent_labels: list[str] = []

        for intent, examples in INTENT_EXAMPLES.items():
            for ex in examples:
                self._intent_texts.append(ex)
                self._intent_labels.append(intent)

        # Precompute embeddings for all example phrases
        self._intent_embeddings = self.model.encode(
            self._intent_texts,
            normalize_embeddings=True,
            convert_to_numpy=True,
        )

    def parse(self, message: str) -> dict:
        if not message or not message.strip():
            return {"intent": "fallback", "confidence": 0.0, "entities": []}

        query_emb = self.model.encode(
            [message],
            normalize_embeddings=True,
            convert_to_numpy=True,
        )[0]

        # Cosine similarity since vectors are normalized
        sims = np.dot(self._intent_embeddings, query_emb)
        best_idx = int(np.argmax(sims))
        best_intent = self._intent_labels[best_idx]
        confidence = float(sims[best_idx])

        return {"intent": best_intent, "confidence": confidence, "entities": []}
