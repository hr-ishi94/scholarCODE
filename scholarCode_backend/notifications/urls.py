from django.urls import path
from .views import NotificationListView

urlpatterns = [
    path('noti/', NotificationListView.as_view(), name='notification-list'),
    # other routes...
]