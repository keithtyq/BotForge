from backend.data_access.LandingImage.image_dao import LandingImageRepository

class LandingImageService:

    def __init__(self):
        self.repo = LandingImageRepository()

    def list_active_images(self):

        images = self.repo.get_active_images()

        return [
            {
                "image_id": img.image_id,
                "image_url": img.image_url,
                "alt_text": img.alt_text,
                "display_order": img.display_order,
            }
            for img in images
        ]
