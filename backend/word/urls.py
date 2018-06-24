from django.urls import path
from . import views

urlpatterns = [
    path('word_details', views.word_details.as_view()),
    path('wordbook_details', views.wordbook_details.as_view()),
    path('userdefined', views.userdefined.as_view()),
    # FIXME: debug
    path('gen_my_dict', views.gen_my_dict.as_view()),
]