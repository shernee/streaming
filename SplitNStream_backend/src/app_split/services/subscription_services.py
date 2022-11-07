from app_split.models import Service, Subscription
from app_split.serializers import subscription_serializers
import errors


def list_subscriptions():
    subscription_qs = Subscription.objects.prefetch_related("service")

    return subscription_qs
    