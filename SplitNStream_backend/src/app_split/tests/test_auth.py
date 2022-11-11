from django.test import TestCase

from rest_framework import status
from rest_framework.test import APIRequestFactory

from app_split.views import auth_views
from utils import test_utils

class LoginTestCase(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.view = auth_views.LoginView.as_view()

        self.user_model = test_utils.UserFactory(password='testpassword') 
    
        # self.maxDiff = None

    ########
    # GET #
    ########
    def test_successful_rendering_of_login(self):
        """Successfully renders the login page"""
        
        request = self.factory.get("/api/auth/login")
        with self.assertNumQueries(0):
            resp = self.view(request)
        

        self.assertEqual(status.HTTP_200_OK, resp.status_code)

        # test if 'SplitnShare' header text is present in the rendered template 
        self.assertInHTML(needle='<h1>SplitNShare</h1>', haystack=resp.rendered_content)

    ########
    # POST #
    ########
    def test_successful_login(self):
        """Successful login when correct username and password are provided"""
        
        username = self.user_model.username
        request = self.factory.post("/api/auth/login", data={"username": username, "password": "testpassword"})

        with self.assertNumQueries(2):
            resp = self.view(request)

        self.assertEqual(status.HTTP_302_FOUND, resp.status_code)


    def test_invalid_username(self):
        """Unauthorized error when a non existant username is provided"""
        pass

    def test_invalid_password(self):
        """Unauthorized error when password does not match the username"""
        pass

