from django.shortcuts import render

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
import bleach
from rest_framework.exceptions import ValidationError
from app_split.models import Service
from app_split.services import user_services
from utils.sanitization_utils import NoInputValue, strip_xss
import errors as custom_errors
from utils.error_utils import get_rest_validation_error_response, get_business_error_response

class UserDetailView(APIView):
    
    def get(self, request):
        
        user_model = request.user
        groups_qs = user_services.list_userdetails(request_user_model=request.user)

        response_dict = {}
        for group_model in groups_qs:
            stage_name = group_model.get_stage_display()
            group_details_dict = {
                "group": group_model.id,
                "subscription": f'{group_model.subscription.service.name}: {group_model.subscription.name}'
            }

            subscription_list = response_dict.setdefault(stage_name, [])
            subscription_list.append(group_details_dict)

        user_dict = {
            "first_name": user_model.first_name,
            "last_name": user_model.last_name,
            "email": user_model.email
        }

        response_dict.update(user_dict)
        return Response(response_dict, status=status.HTTP_200_OK)

class RegisterUserView(APIView):
    
        def post(self, request):
        # Gather request body data

            unsafe_username = request.data.get('username', NoInputValue)
            unsafe_first_name = request.data.get('first_name', NoInputValue)
            unsafe_last_name = request.data.get('last_name', NoInputValue)
            unsafe_email = request.data.get('email', NoInputValue)
            unsafe_password = request.data.get('password', NoInputValue)
            # Sanitize 
            
            sanitized_username = strip_xss(unsafe_username)
            sanitized_first_name = strip_xss(unsafe_first_name)
            sanitized_last_name = strip_xss(unsafe_last_name)
            sanitized_email = strip_xss(unsafe_email)


            try:
                user_model = user_services.create_user(
                    sanitized_username=sanitized_username,
                    sanitized_first_name=sanitized_first_name,
                    sanitized_last_name=sanitized_last_name,
                    sanitized_email_address=sanitized_email,
                    unsafe_password=unsafe_password,
                    unsafe_is_admin=True)        

            except ValidationError as e:
                return get_rest_validation_error_response(error=e, http_status_code=status.HTTP_422_UNPROCESSABLE_ENTITY)
            except custom_errors.UsernameConflictError as e:
                return get_business_error_response(error=e, http_status_code=status.HTTP_412_PRECONDITION_FAILED)
            except custom_errors.EmailConflictError as e:
                return get_business_error_response(error=e, http_status_code=status.HTTP_412_PRECONDITION_FAILED)
            

            response_dict = {
                'username': user_model.id,
                'email':user_model.email
            }

            return Response(data=response_dict, status=status.HTTP_201_CREATED)
