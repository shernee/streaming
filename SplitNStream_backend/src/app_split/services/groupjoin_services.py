from django.http import Http404

from rest_framework import status
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework.views import APIView

from app_split.services import group_services
from utils.error_utils import get_rest_validation_error_response, get_business_error_response
from utils.sanitization_utils import NoInputValue
import errors as custom_errors
from app_split.models import Group, User, Subscription, Membership
from django.db import transaction
import datetime


class GroupJoin(APIView):

    def group_join(user_model:User, group_model:int):

        
       
        #user_model = User.objects.filter(username="Anotheruser")
        user_model = User.objects.filter(user=user_model)
        
    # Get queryset of group details for given groupid
        group_qs = Group.objects\
            .filter(id=group_model)\
            .prefetch_related('subscription')

        #get service name from group_qs
        for each in group_qs:
            group_id_service = each.subscription.id


        #get group of lists for that service
            group_list_qs = Group.objects\
            .filter(subscription_id=group_id_service, stage=Group.StageChoice.FORMATION)\
            .prefetch_related('members')
            for each_group in group_list_qs:
                users_list = each_group.members.all().values('id')
                if user_model[0].id in users_list:
                    return False
            
            


            with transaction.atomic():
                if len(each.members) == each.subscription.max_members_allowed:
                    return False

                # Create membership for user
                membership_update_rows = Membership.objects.update_or_create(
                    #user=user_model[0].id,
                    user = user_model[0],
                    group=group_qs[0],
                    is_active=True,
                    start_date=datetime.datetime.now()
                )
        
        return True
