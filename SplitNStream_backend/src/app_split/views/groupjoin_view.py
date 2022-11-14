from django.shortcuts import render

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
import bleach

from app_split.models import Service
from app_split.services import groupjoin_services,

class GroupJoinView(APIView):



    
    def post(self, request):
        
        group_model = request.GET.get('group_id')
        user_model = request.user
        res = groupjoin_services.GroupJoin.group_join(user_model,group_model)

        if res:
            return Response("Successfully joined group", status=status.HTTP_200_OK)
        return Response("Either the group has reached the limit to add members or you already exist in a different group for this service", status=status.HTTP_200_OK)
