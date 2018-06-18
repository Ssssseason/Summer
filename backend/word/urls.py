from django.urls import path
from . import views

urlpatterns = [
    path('word_details', views.word_details.as_view()),
    path('wordbook_details', views.wordbook_details.as_view()),
]