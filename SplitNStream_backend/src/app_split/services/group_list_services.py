from app_split.models import Group, Subscription
from app_split.serializers import subscription_serializers
import errors

def list_groups_for_subscription(subscription_model: int):

    group_qs = Group.objects.filter(subscription_id=subscription_model.id, stage=1)

    return group_qs