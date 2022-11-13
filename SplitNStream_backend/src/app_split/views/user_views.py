from django.shortcuts import render

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
import bleach

from app_split.models import Service
from app_split.services import user_services

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