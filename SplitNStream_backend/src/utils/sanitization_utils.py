import bleach

# App imports


class NoInputValue:
    """
    Indicates that the user did not provide any input for a field.
    useful for patch requests.
    """
    pass

def strip_xss(text: str):
    """ Remove all markup from text. """

    if text == NoInputValue or text=="":
        return NoInputValue

    allowed_tags = []
    allowed_attributes = []
    allowed_styles = []

    text = bleach.clean(
        text, allowed_tags, allowed_attributes, allowed_styles,
        strip=True, strip_comments=True).strip()

    return text