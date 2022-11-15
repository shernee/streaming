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
        print(request)
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

        return Response(data=response_list, status=status.HTTP_200_OK)
    
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

        response_dict = {
            'group_id': group_model.id,
        }

        return Response(data=response_dict, status=status.HTTP_201_CREATED)


class GroupDetailView(APIView):
    
    def get(self, request):
        
        unsafe_group_id = request.query_params.get('group_id', NoInputValue)

        # Sanitize strings
        # No string to sanitize

        # Call service
        try:
            group_model = group_services.get_group_details(unsafe_group_id=unsafe_group_id)
        except ValidationError as e:
            return get_rest_validation_error_response(error=e, http_status_code=status.HTTP_422_UNPROCESSABLE_ENTITY)
        except custom_errors.GroupIdDoesNotExist as e:
            return get_business_error_response(error=e, http_status_code=status.HTTP_412_PRECONDITION_FAILED)


        members = []
        current_group_members = group_model.members.filter(membership__is_active=True)
        for each in current_group_members:
            members.append(each.username)
        response_dict = {
            "group_id": group_model.id,
            "subscription_name": group_model.subscription.name,
            "service_name": group_model.subscription.service.name,
            "subscription_price": group_model.subscription.price,
            "max_members_allowed":group_model.subscription.max_members_allowed,
            "current_members": members,
            "group_stage": group_model.get_stage_display(),
            "price_per_member": round(group_model.subscription.price / group_model.subscription.max_members_allowed, 2),
            "is_member": request.user in current_group_members,
            "user_id": request.user.id
          
        }
                   
        return Response(data=response_dict, status=status.HTTP_200_OK)


class GroupJoinView(APIView):
    
    def post(self, request):

        unsafe_group_id = request.data.get('group_id', NoInputValue)

        # Sanitize strings
        # No string to sanitize
    
        group_model = group_services.join_group(request_user_model=request.user, unsafe_group_id=unsafe_group_id)

        # Call service
        try:
            group_model = group_services.get_group_details(unsafe_group_id=unsafe_group_id)
        except ValidationError as e:
            return get_rest_validation_error_response(error=e, http_status_code=status.HTTP_422_UNPROCESSABLE_ENTITY)
        except custom_errors.GroupIdDoesNotExist as e:
            return get_business_error_response(error=e, http_status_code=status.HTTP_412_PRECONDITION_FAILED)
        except custom_errors.GroupNotInFormationStage as e:
            return get_business_error_response(error=e, http_status_code=status.HTTP_412_PRECONDITION_FAILED)
        except custom_errors.UserMembershipExistsForGroup as e:
            return get_business_error_response(error=e, http_status_code=status.HTTP_412_PRECONDITION_FAILED)
        except custom_errors.GroupMemberLimitExceeded as e:
            return get_business_error_response(error=e, http_status_code=status.HTTP_412_PRECONDITION_FAILED)

        response_dict = {
            'group_id': group_model.id,
        }

        return Response(data=response_dict, status=status.HTTP_201_CREATED)

class GroupLeaveView(APIView):
    
    def delete(self, request):

        unsafe_group_id = request.query_params.get('group_id', NoInputValue)

        # Sanitize strings
        # No string to sanitize
      

        # Call service
        try:
            group_model = group_services.leave_group(request_user_model=request.user, unsafe_group_id=unsafe_group_id)
        except ValidationError as e:
            return get_rest_validation_error_response(error=e, http_status_code=status.HTTP_422_UNPROCESSABLE_ENTITY)
        except custom_errors.GroupIdDoesNotExist as e:
            return get_business_error_response(error=e, http_status_code=status.HTTP_412_PRECONDITION_FAILED)
        except custom_errors.GroupNotInFormationStage as e:
            return get_business_error_response(error=e, http_status_code=status.HTTP_412_PRECONDITION_FAILED)
        except custom_errors.UserMembershipExistsForGroup as e:
            return get_business_error_response(error=e, http_status_code=status.HTTP_412_PRECONDITION_FAILED)
        except custom_errors.GroupMemberLimitExceeded as e:
            return get_business_error_response(error=e, http_status_code=status.HTTP_412_PRECONDITION_FAILED)

        response_dict = {
            'message': "deleted user from the membership"
        }

        return Response(data=response_dict, status=status.HTTP_204_NO_CONTENT)
