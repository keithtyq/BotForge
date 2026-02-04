from flask import Blueprint, jsonify
from backend.application.landing_image_service import LandingImageService

landing_images_bp = Blueprint("landing_images_bp", __name__)

service = LandingImageService()

@landing_images_bp.get("/landing-images")
def get_landing_images():
    return jsonify(service.list_active_images()), 200