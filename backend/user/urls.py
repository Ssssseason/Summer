from django.urls import path
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token, verify_jwt_token
# from
from . import views

urlpatterns = [
    # path('', views.index, name='index'),
    path('userinfo', views.userinfo.as_view(), name='user'),
    path('token-auth', obtain_jwt_token),
    path('token-refresh', refresh_jwt_token),
    path('token-verify', verify_jwt_token),
]