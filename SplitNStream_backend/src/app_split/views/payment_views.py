from rest_framework import status
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework.views import APIView

from app_split.services import payment_services
from utils.error_utils import get_rest_validation_error_response, get_business_error_response
from utils.sanitization_utils import NoInputValue
import errors as custom_errors

class PaymentAddView(APIView):
    def post(self, request):

        unsafe_group_id = request.data.get('group_id', NoInputValue)
        unsafe_payment_amount = request.data.get('payment_amount', NoInputValue)

        # Sanitize strings
        # No string to sanitize

        # Call service
        try:
            payment_model = payment_services.make_payment(
                request_user_model=request.user, 
                unsafe_group_id=unsafe_group_id,
                unsafe_payment_amount=unsafe_payment_amount
            )
        except ValidationError as e:
            return get_rest_validation_error_response(error=e, http_status_code=status.HTTP_422_UNPROCESSABLE_ENTITY)
        except custom_errors.GroupIdDoesNotExist as e:
            return get_business_error_response(error=e, http_status_code=status.HTTP_412_PRECONDITION_FAILED)
        except custom_errors.GroupNotInFormedStage as e:
            return get_business_error_response(error=e, http_status_code=status.HTTP_412_PRECONDITION_FAILED)
        except custom_errors.PaymentAmountMismatch as e:
            return get_business_error_response(error=e, http_status_code=status.HTTP_412_PRECONDITION_FAILED)


        response_dict = {
            'group_id': payment_model.group.id,
        }

        return Response(data=response_dict, status=status.HTTP_201_CREATED)