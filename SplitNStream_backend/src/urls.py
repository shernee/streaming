"""split_project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path

from app_split.views import auth_views, subscription_views, user_views, group_views, payment_views


urlpatterns = [
    path('api/admin/', admin.site.urls),
    path('api/auth/login/', auth_views.LoginView.as_view()),
    path('api/subscriptions/', subscription_views.SubscriptionView.as_view()),
    path('api/user-details/', user_views.UserDetailView.as_view()),
    path('api/group-list/', group_views.GroupListView.as_view()),
    path('api/group-create/', group_views.GroupCreateView.as_view()),
    path('api/group-details/', group_views.GroupDetailView.as_view()),
    path('api/group-join/', group_views.GroupJoinView.as_view()),
    path('api/group-leave/', group_views.GroupLeaveView.as_view()),
    path('api/register-user/',user_views.RegisterUserView.as_view()),
    path('api/payment/',payment_views.PaymentAddView.as_view())
]
