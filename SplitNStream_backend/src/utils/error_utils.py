from rest_framework import status
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response

from errors import Error


def get_rest_validation_error_response(error: ValidationError, http_status_code=status.HTTP_422_UNPROCESSABLE_ENTITY):

    error_message = error.get_full_details()

    return Response(data=error_message, status=http_status_code)

def get_business_error_response(error: Error, http_status_code):

    error_message = error.message
    error_code = error.internal_error_code

    error_response_dict = {
        "message": error_message,
        "error_code": error_code
    }

    return Response(data=error_response_dict, status=http_status_code)