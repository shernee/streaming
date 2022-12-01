import datetime

from django.db import transaction

from app_split.models import Group, User, Payment
from app_split.serializers import payment_serializers
import errors as custom_errors

def make_payment(request_user_model: User, unsafe_group_id: int, unsafe_payment_amount: float):

    fields_to_validate_dict = {
        "group_id": unsafe_group_id,
        "payment_amount": unsafe_payment_amount
    }
    payment_serializer = payment_serializers.PaymentSerializer(data=fields_to_validate_dict)
    payment_serializer.is_valid(raise_exception=True)
    validated_dict = payment_serializer.validated_data

    # substitute defaults if needed
    group_id = validated_dict.get('group_id')
    payment_amount = validated_dict.get('payment_amount')

    group_model = Group.objects\
        .prefetch_related('subscription')\
        .get(id=group_id)

    # Check if group id exists
    if not Group.objects.filter(id=group_id).exists():
        raise custom_errors.GroupIdDoesNotExist()

    if group_model.stage != Group.StageChoice.FORMED:
        raise custom_errors.GroupNotInFormedStage

    amount_to_pay = round(group_model.subscription.price / group_model.subscription.max_members_allowed, 2)
    
    if payment_amount != amount_to_pay:
        raise custom_errors.PaymentAmountMismatch()

    # check how many members have paid

    current_group_members = group_model.members.filter(membership__is_active=True)
    payment_qs = Payment.objects.filter(group_id=group_id).values_list('user__id', flat=True)

    paid_members = []

    for member in current_group_members:
        if member.id in payment_qs:
            paid_members.append(member.username)

    if len(paid_members) == len(current_group_members)-1:
        with transaction.atomic():

            # Create payment
            payment_model = Payment.objects.create(
                group_id=group_id,
                user=request_user_model,
                amount_paid=payment_amount,
                paid_on=datetime.datetime.now()
            )
            # Update group stage to verified
            Group.objects.filter(id=group_id).update(stage=Group.StageChoice.VERIFIED)

            return payment_model

    else:
        payment_model = Payment.objects.create(
                group_id=group_id,
                user=request_user_model,
                amount_paid=payment_amount,
                paid_on=datetime.datetime.now()
            ) 

        return payment_model