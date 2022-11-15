from django.contrib.auth import views as auth_views
from django.http import JsonResponse
from rest_framework import status

class LoginView(auth_views.LoginView):
    template_name = "app_split/auth_login.html"

    def form_valid(self, form):
        super().form_valid(form)
        return JsonResponse({'detail': 'Logged in successfully'}, status=status.HTTP_202_ACCEPTED)

    def form_invalid(self, form):
        super().form_invalid(form)
        print(form.errors)
        return JsonResponse(form.errors, status=status.HTTP_401_UNAUTHORIZED)



