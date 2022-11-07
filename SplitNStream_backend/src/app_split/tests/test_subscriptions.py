from django.test import TestCase

from rest_framework import status
from rest_framework.test import APIRequestFactory

from app_split.views import subscription_views
from utils import test_utils

# Create your tests here.

class SubscriptionGetTestCase(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.view = subscription_views.SubscriptionView.as_view()

        # Create 3 services with 2 subscriptions each
        self.services_model_list = []
        self.subscriptions_list = []
        for i in range(3):
            service_model = test_utils.ServiceFactory()
            self.services_model_list.append(service_model)
            for i in range(2):
                self.subscriptions_list.append(test_utils.SubscriptionFactory(service=service_model))
    
        # self.maxDiff = None

    ########
    # GET #
    ########
    def test_get_all_services(self):
        """Should list the 3 services"""
        
        request = self.factory.get("/api/subscriptions/")
        with self.assertNumQueries(2):
            resp = self.view(request)

        self.assertEqual(status.HTTP_200_OK, resp.status_code)

        # Exactly 3 services should be returned
        resp_service_name_set = set(resp.data.keys())
        self.assertEqual(len(resp_service_name_set), 3)

        # Name of the services should be returned
        given_service_name_set = set([x.name for x in self.services_model_list])
        self.assertEqual(resp_service_name_set, given_service_name_set)


    def test_get_none_services(self):
        """Should list no services when they dont exist"""
        for service_model in self.services_model_list:
            service_model.delete()

        request = self.factory.get("/api/subscriptions/")
        with self.assertNumQueries(1):
            resp = self.view(request)

        self.assertEqual(status.HTTP_200_OK, resp.status_code)

        # Exactly zero services should be returned
        resp_service_name_set = set(resp.data.keys())
        self.assertEqual(len(resp_service_name_set), 0)


    def test_get_first_service_subscriptions(self):
        """Should list the 2 subscriptions in the first service"""
        
        request = self.factory.get("/api/subscriptions/")
        with self.assertNumQueries(2):
            resp = self.view(request)

        self.assertEqual(status.HTTP_200_OK, resp.status_code)

        # Exactly 2 subscriptions should be returned
        first_service_name = self.services_model_list[0].name
        resp_subscription_name_set = set([x['name'] for x in resp.data[first_service_name]])
        self.assertEqual(len(resp_subscription_name_set), 2)

        # Name of the subscriptions should match
        given_subscription_name_set = set([x.name for x in self.subscriptions_list[:2]])
        self.assertEqual(resp_subscription_name_set, given_subscription_name_set)

    