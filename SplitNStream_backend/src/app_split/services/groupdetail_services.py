import datetime

from django.db import transaction

from app_split.models import Group, User, Subscription, Membership
from app_split.serializers import subscription_serializers
import errors

def list_group_details(group_id: int):

    # Get queryset of group details for given groupid
    group_qs = Group.objects\
        .filter(id=group_id)\
        .prefetch_related('subscription')

    return group_qs


    

    