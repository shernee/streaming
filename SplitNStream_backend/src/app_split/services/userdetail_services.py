from app_split.models import User, Membership
from app_split.serializers import subscription_serializers
import errors

def list_userdetails(request_user_model: User):

    user_groups_qs = request_user_model.group_set.prefetch_related("subscription")      

    return user_groups_qs
