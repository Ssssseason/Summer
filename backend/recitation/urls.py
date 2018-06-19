from django.urls import path
from . import views

urlpatterns = [
    path('rec_word', views.rec_word.as_view(), name='rec_word'),
    path('rec_plan', views.rec_plan.as_view(), name='rec_plan'),
]