from django.shortcuts import render

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
import bleach

from app_split.models import Service
from app_split.services import groupdetail_services

class GroupDetailView(APIView):
    
    def get(self, request):
        
        group_model = request.GET.get('group_id')
        groups_qs = groupdetail_services.list_group_details(group_model)

        response_dict = {}
        members = []
        for group_model in groups_qs:
            for each in group_model.members.all():
                members.append(each.username)
            group_dict = {
            "Name": group_model.subscription.name,
            "Service": group_model.subscription.service.name,
            "Price": group_model.subscription.price,
            "max_members_allowed":group_model.subscription.max_members_allowed,
            "Existing_members": members
            }
            response_dict.update(group_dict)
            

        
        return Response(response_dict, status=status.HTTP_200_OK)