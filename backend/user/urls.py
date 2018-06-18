from django.urls import path
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token, verify_jwt_token
from . import views

urlpatterns = [
    # path('', views.index, name='index'),
    path('userinfo', views.userinfo.as_view(), name='user'),
    path('token_auth', obtain_jwt_token),
    path('register', views.register.as_view(), name='register'),
    path('token_refresh', refresh_jwt_token),
    path('token_verify', verify_jwt_token),
]