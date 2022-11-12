from django.http import Http404

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from app_split.models import Subscription
from app_split.services import group_list_services

class GroupListView(APIView):

    def get_object(self, pk):
        try:
            return Subscription.objects.get(pk=pk)
        except Subscription.DoesNotExist:
            raise Http404
    
    def get(self, request, pk):
        subscription_model = self.get_object(pk=pk)

        group_qs = group_list_services.list_groups_for_subscription(subscription_model=subscription_model) 
        
        response_dict = {
            "groups": []
        }
        groups_for_subscription = []
        for group in group_qs:
            curr_num = len(group.members.all())
            group_dict = {
                "group": group.id,
                "max_members": group.subscription.max_members_allowed,
                "current_num_members": curr_num
            }
            groups_for_subscription.append(group_dict)
        
        response_dict["groups"] = groups_for_subscription

        return Response(response_dict, status=status.HTTP_200_OK)
