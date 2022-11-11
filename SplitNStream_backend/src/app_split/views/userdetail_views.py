from django.shortcuts import render

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
import bleach

from app_split.models import Service
from app_split.services import userdetails_services

class UserDetailView(APIView):
    
    def get(self, request):
        
        user_model = userdetails_services.list_userdetails(request_user_model=request.user)
        response_dict = {
            "first_name": user_model.first_name,
            "last_name": user_model.last_name,
            "email": user_model.email
        }
        return Response(response_dict, status=status.HTTP_200_OK)