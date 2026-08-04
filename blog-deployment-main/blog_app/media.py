import hashlib
import io
import uuid
import warnings
from pathlib import Path

from PIL import Image, ImageOps, UnidentifiedImageError
from werkzeug.utils import secure_filename


ALLOWED_FORMATS = {"JPEG", "PNG", "WEBP"}
VARIANT_WIDTHS = {
    "thumbnail": 400,
    "card": 900,
    "hero": 1600,
}


class InvalidImage(ValueError):
    pass


def _save_webp(image, path, *, size=None, crop=None):
    output = ImageOps.exif_transpose(image)
    if crop:
        output = ImageOps.fit(output, crop, method=Image.Resampling.LANCZOS)
    elif size and output.width > size:
        height = max(1, round(output.height * size / output.width))
        output = output.resize((size, height), Image.Resampling.LANCZOS)

    if output.mode not in {"RGB", "RGBA"}:
        output = output.convert("RGB")
    output.save(path, "WEBP", quality=84, method=6)
    return {"filename": str(path), "width": output.width, "height": output.height}


def process_upload(file_storage, media_root):
    original_name = secure_filename(file_storage.filename or "")
    if not original_name:
        raise InvalidImage("Choose an image to upload.")

    payload = file_storage.read()
    if not payload:
        raise InvalidImage("The uploaded image is empty.")

    try:
        with warnings.catch_warnings():
            warnings.simplefilter("error", Image.DecompressionBombWarning)
            with Image.open(io.BytesIO(payload)) as probe:
                probe.verify()
            image = Image.open(io.BytesIO(payload))
            image.load()
    except (Image.DecompressionBombError, Image.DecompressionBombWarning, UnidentifiedImageError, OSError) as error:
        raise InvalidImage("Upload a valid JPEG, PNG, or WebP image.") from error

    if image.format not in ALLOWED_FORMATS:
        raise InvalidImage("Only JPEG, PNG, and WebP images are supported.")

    identifier = uuid.uuid4().hex
    directory = Path(media_root) / identifier[:2] / identifier
    directory.mkdir(parents=True, exist_ok=False)

    variants = {}
    try:
        for name, width in VARIANT_WIDTHS.items():
            path = directory / f"{name}.webp"
            info = _save_webp(image, path, size=width)
            variants[name] = {
                "path": str(path.relative_to(media_root)),
                "width": info["width"],
                "height": info["height"],
            }

        social_path = directory / "social.webp"
        info = _save_webp(image, social_path, crop=(1200, 630))
        variants["social"] = {
            "path": str(social_path.relative_to(media_root)),
            "width": info["width"],
            "height": info["height"],
        }
    except Exception:
        for path in directory.glob("*"):
            path.unlink(missing_ok=True)
        directory.rmdir()
        raise

    return {
        "original_filename": original_name,
        "stored_filename": variants["hero"]["path"],
        "mime_type": "image/webp",
        "byte_size": len(payload),
        "width": image.width,
        "height": image.height,
        "sha256": hashlib.sha256(payload).hexdigest(),
        "variants": variants,
    }
