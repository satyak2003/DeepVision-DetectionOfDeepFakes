# backend/utils.py
from PIL import Image
import io

def read_image(file_storage) -> Image.Image:
    """Read image from Flask's FileStorage."""
    image_bytes = file_storage.read()
    return Image.open(io.BytesIO(image_bytes)).convert('RGB')
