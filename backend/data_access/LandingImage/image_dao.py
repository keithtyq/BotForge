from datetime import datetime
from typing import Optional, List
from backend.models import LandingImage as LandingImageModel

# Domain Representation

class LandingImage:

    def __init__(
        self,
        image_id: Optional[int],
        image_url: str,
        alt_text: Optional[str],
        display_order: int,
        is_active: bool,
        created_at: Optional[datetime] = None,
        updated_at: Optional[datetime] = None,
    ):
        self.image_id = image_id
        self.image_url = image_url
        self.alt_text = alt_text
        self.display_order = display_order
        self.is_active = is_active
        self.created_at = created_at
        self.updated_at = updated_at

    def to_dict(self):
        return {
            "image_id": self.image_id,
            "image_url": self.image_url,
            "alt_text": self.alt_text,
            "display_order": self.display_order,
            "is_active": self.is_active,
        }


# Repository
class LandingImageRepository:

    def get_active_images(self) -> List[LandingImage]:

        rows = (
            LandingImageModel.query
            .filter_by(is_active=True)
            .order_by(LandingImageModel.display_order)
            .all()
        )

        return [self._to_entity(row) for row in rows]

    def _to_entity(self, row: LandingImageModel) -> LandingImage:

        return LandingImage(
            image_id=row.image_id,
            image_url=row.image_url,
            alt_text=row.alt_text,
            display_order=row.display_order,
            is_active=row.is_active,
            created_at=row.created_at,
            updated_at=row.updated_at,
        )