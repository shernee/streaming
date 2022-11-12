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

from app_split.views import auth_views, subscription_views, userdetail_views, group_list_views

urlpatterns = [
    path('api/admin/', admin.site.urls),
    path('api/auth/login/', auth_views.LoginView.as_view()),
    path('api/subscriptions/', subscription_views.SubscriptionView.as_view()),
    path('api/user-details/', userdetail_views.UserDetailView.as_view()),
    path('api/group-list/<int:pk>/', group_list_views.GroupListView.as_view())
]
