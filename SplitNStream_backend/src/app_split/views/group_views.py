from django.http import Http404

from rest_framework import status
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework.views import APIView

from app_split.services import group_services
from utils.error_utils import get_rest_validation_error_response, get_business_error_response
from utils.sanitization_utils import NoInputValue
import errors as custom_errors

class GroupListView(APIView):

    def get(self, request):
        # get url query paramaters
        unsafe_subscription_id = request.query_params.get("subscription_id", NoInputValue)

        # Sanitize strings
        # No strings to sanitize

        # Call service 
        try:
            group_qs = group_services.list_groups_for_subscription(unsafe_subscription_id=unsafe_subscription_id) 
        except ValidationError as e:
            return get_rest_validation_error_response(error=e, http_status_code=status.HTTP_422_UNPROCESSABLE_ENTITY)
        except custom_errors.SubscriptionIdDoesNotExist as e:
            return get_business_error_response(error=e, http_status_code=status.HTTP_412_PRECONDITION_FAILED)
        
        groups_for_subscription = []
        for group in group_qs:
            curr_num = len(group.members.all())
            group_dict = {
                "group": group.id,
                "max_members": group.subscription.max_members_allowed,
                "current_num_members": curr_num
            }
            groups_for_subscription.append(group_dict)
        
        response_list =  groups_for_subscription

        return Response(response_list, status=status.HTTP_200_OK)
    
class GroupCreateView(APIView):

    def post(self, request):
        # Gather request body data
        unsafe_subscription_id = request.data.get('subscription_id', NoInputValue)

        # Sanitize strings
        # No string to sanitize

        try:
            group_model = group_services.create_group(
                request_user_model=request.user, unsafe_subscription_id=unsafe_subscription_id)
        except ValidationError as e:
            return get_rest_validation_error_response(
                error=e, http_status_code=status.HTTP_422_UNPROCESSABLE_ENTITY)
        except custom_errors.SubscriptionIdDoesNotExist as e:
            return get_business_error_response(
                error=e, http_status_code=status.HTTP_412_PRECONDITION_FAILED)

        response_data_dict = {
            'group_id': group_model.id,
        }

        return Response(data=response_data_dict, status=status.HTTP_201_CREATED)

