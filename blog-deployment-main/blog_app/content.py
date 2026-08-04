import html
from urllib.parse import urlparse

import bleach


MAX_BLOCKS = 300
MAX_TEXT_LENGTH = 50_000
INLINE_TAGS = {"a", "br", "code", "em", "mark", "s", "strong", "sub", "sup", "u"}
INLINE_ATTRIBUTES = {
    "a": ["href", "title", "target", "rel"],
}
ALLOWED_PROTOCOLS = {"http", "https", "mailto", "tel"}
SUPPORTED_BLOCKS = {
    "paragraph",
    "heading",
    "image",
    "list",
    "quote",
    "table",
    "video",
    "cta",
    "divider",
}


def clean_text(value, maximum=MAX_TEXT_LENGTH):
    stripped = bleach.clean(str(value or ""), tags=set(), strip=True)
    return html.unescape(stripped).strip()[:maximum]


def clean_inline_html(value):
    cleaned = bleach.clean(
        str(value or "")[:MAX_TEXT_LENGTH],
        tags=INLINE_TAGS,
        attributes=INLINE_ATTRIBUTES,
        protocols=ALLOWED_PROTOCOLS,
        strip=True,
    )
    return cleaned.strip()


def clean_url(value, allow_relative=True):
    url = str(value or "").strip()[:1000]
    if not url:
        return ""
    if allow_relative and url.startswith("/") and not url.startswith("//"):
        return url
    parsed = urlparse(url)
    if parsed.scheme not in {"http", "https"} or not parsed.netloc:
        return ""
    return url


def clean_link_options(block):
    return {
        "open_in_new_tab": bool(block.get("open_in_new_tab")),
        "nofollow": bool(block.get("nofollow")),
        "sponsored": bool(block.get("sponsored")),
    }


def sanitize_block(raw):
    if not isinstance(raw, dict):
        return None

    block_type = clean_text(raw.get("type"), 30).lower()
    if block_type not in SUPPORTED_BLOCKS:
        return None

    block = {"type": block_type}

    if block_type == "paragraph":
        block["html"] = clean_inline_html(raw.get("html") or raw.get("content"))
    elif block_type == "heading":
        block["level"] = 3 if int(raw.get("level") or 2) == 3 else 2
        block["text"] = clean_text(raw.get("text") or raw.get("content"), 500)
    elif block_type == "image":
        media_id = raw.get("media_id")
        block["media_id"] = int(media_id) if str(media_id or "").isdigit() else None
        block["alt"] = clean_text(raw.get("alt"), 255)
        block["caption"] = clean_text(raw.get("caption"), 1000)
        block["layout"] = raw.get("layout") if raw.get("layout") in {"wide", "normal"} else "normal"
    elif block_type == "list":
        block["style"] = "numbered" if raw.get("style") == "numbered" else "bulleted"
        items = raw.get("items") if isinstance(raw.get("items"), list) else []
        block["items"] = [clean_inline_html(item) for item in items[:100] if clean_text(item)]
    elif block_type == "quote":
        block["text"] = clean_text(raw.get("text") or raw.get("content"), 3000)
        block["attribution"] = clean_text(raw.get("attribution"), 300)
    elif block_type == "table":
        rows = raw.get("rows") if isinstance(raw.get("rows"), list) else []
        block["rows"] = [
            [clean_inline_html(cell) for cell in row[:12]]
            for row in rows[:100]
            if isinstance(row, list)
        ]
        block["has_header"] = bool(raw.get("has_header", True))
    elif block_type == "video":
        block["url"] = clean_url(raw.get("url"), allow_relative=False)
        block["caption"] = clean_text(raw.get("caption"), 1000)
    elif block_type == "cta":
        block["title"] = clean_text(raw.get("title"), 300)
        block["text"] = clean_text(raw.get("text"), 2000)
        block["button_label"] = clean_text(raw.get("button_label"), 120)
        block["button_url"] = clean_url(raw.get("button_url"))
        block.update(clean_link_options(raw))

    return block


def sanitize_blocks(raw_blocks):
    if not isinstance(raw_blocks, list):
        raise ValueError("Article content must be a list of editor blocks.")
    if len(raw_blocks) > MAX_BLOCKS:
        raise ValueError(f"An article cannot contain more than {MAX_BLOCKS} blocks.")

    return [block for raw in raw_blocks if (block := sanitize_block(raw)) is not None]

