from django.urls import path
from . import views

urlpatterns = [
    path('rec_word', views.rec_word.as_view(), name='rec_word'),
    path('rec_plan', views.rec_plan.as_view(), name='rec_plan'),
    path('target_num', views.target_num.as_view(), name='target_num'),
    path('subscription', views.subscription.as_view(), name='subscription'),
]