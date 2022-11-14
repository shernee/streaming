import datetime

from django.db import transaction

from app_split.models import Group, User, Subscription, Membership
from app_split.serializers import subscription_serializers, group_serializers
import errors as custom_errors

def list_groups_for_subscription(unsafe_subscription_id: int):

    fields_to_validate_dict = {
        "subscription_id": unsafe_subscription_id,
    }
    list_groups_serializer = subscription_serializers.ListGroupsSerializer(data=fields_to_validate_dict)
    list_groups_serializer.is_valid(raise_exception=True)
    validated_dict = list_groups_serializer.validated_data

    # substitute defaults
    subscription_id = validated_dict.get('subscription_id')

    # Check if subscription id exists
    if not Subscription.objects.filter(id=subscription_id).exists():

        raise custom_errors.SubscriptionIdDoesNotExist()

    # Get queryset of groups for subscription
    group_qs = Group.objects\
        .filter(subscription_id=subscription_id, stage=Group.StageChoice.FORMATION)\
        .prefetch_related('members')
    
    return group_qs

def create_group(
        request_user_model: User, unsafe_subscription_id: int):

    # Validate fields
    fields_to_validate_dict = {
        "subscription_id": unsafe_subscription_id,
    }
    list_groups_serializer = subscription_serializers.ListGroupsSerializer(data=fields_to_validate_dict)
    list_groups_serializer.is_valid(raise_exception=True)
    validated_dict = list_groups_serializer.validated_data

    # substitute defaults if needed
    subscription_id = validated_dict.get('subscription_id')

    # Check if subscription id exists
    if not Subscription.objects.filter(id=subscription_id).exists():
        raise custom_errors.SubscriptionIdDoesNotExist()

    with transaction.atomic():

        # Create the group
        group_model = Group.objects.create(
            subscription_id=subscription_id,
            stage=Group.StageChoice.FORMATION,
        )
        # Create membership for user
        membership_model = Membership.objects.create(
            user=request_user_model,
            group=group_model,
            is_active=True,
            start_date=datetime.datetime.now()
        )

    return group_model

def get_group_details(unsafe_group_id: int):

    fields_to_validate_dict = {
        "group_id": unsafe_group_id,
    }
    group_details_serializer = group_serializers.GroupDetailsSerializer(data=fields_to_validate_dict)
    group_details_serializer.is_valid(raise_exception=True)
    validated_dict = group_details_serializer.validated_data

    # substitute defaults if needed
    group_id = validated_dict.get('group_id')

    # Check if subscription id exists
    if not Group.objects.filter(id=group_id).exists():
        raise custom_errors.GroupIdDoesNotExist()

    # Get queryset of group details for given groupid
    group_model = Group.objects\
        .prefetch_related('subscription')\
        .get(id=group_id)
    return group_model

    

    