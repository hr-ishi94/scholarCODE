from django.urls import path
from . import views
from rest_framework import routers

urlpatterns = [
    path('user/<int:user_id1>/<int:user_id2>/',views.MessageListView.as_view(),name='index'),
    ]
