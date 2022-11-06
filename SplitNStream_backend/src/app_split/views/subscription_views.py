from django.shortcuts import render

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
import bleach

from app_split.models import Service
from app_split.services import subscription_services


# Create your views here.

class SubscriptionView(APIView):

    def get(self, request):
        subscriptions_qs = subscription_services.list_subscriptions()

        response_dict = {}
        for subscription_model in subscriptions_qs:
            service_name = subscription_model.service.name
            subscription_details_dict = {
                "name": subscription_model.name,
                "price": subscription_model.price
            }

            subscription_list = response_dict.setdefault(service_name, [])
            subscription_list.append(subscription_details_dict)

        return Response(response_dict, status=status.HTTP_200_OK)







