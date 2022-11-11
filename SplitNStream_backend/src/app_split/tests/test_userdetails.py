from django.test import TestCase

from rest_framework import status
from rest_framework.test import APIRequestFactory

from app_split.views import userdetail_views
from utils import test_utils

class UserDetailGetTestCase(TestCase):
    def setUp(self) -> None:
        self.factory = APIRequestFactory()
        self.view = userdetail_views.UserDetailView.as_view()

        self.user_model = test_utils.UserFactory()

    def test_get_user_details(self):
        """List the user"""
        request = self.factory.get('api/user-details/')

        with self.assertNumQueries(1):
            resp = self.view(request)

        self.assertEqual(status.HTTP_200_OK, resp.status_code)

        # Exactly 1 user should be returned
        resp_user_name_set = set(resp.data.keys())
        self.assertEqual(len(resp_user_name_set), 1)

        # Name of the user should be returned
        resp_user_name_set = set([self.user_model['first_name']])
        self.assertEqual(resp_user_name_set, resp_user_name_set)


    def test_get_none_users(self):
        """Should list no services when they dont exist"""
        self.user_model.delete()

        request = self.factory.get("/api/user-details/")
        with self.assertNumQueries(1):
            resp = self.view(request)

        self.assertEqual(status.HTTP_200_OK, resp.status_code)

        # Exactly zero users should be returned
        resp_user_name_set = set(resp.data.keys())
        self.assertEqual(len(resp_user_name_set), 0)