from rest_framework import generics
from .models import Notification
from .serializers import NotificationSerializer
from rest_framework.response import Response
from rest_framework import status
# Create your views here.

class NotificationListView(generics.ListAPIView):
    serializer_class = NotificationSerializer

    def get_queryset(self):
        return Notification.objects.filter(user = self.request.user).order_by('-timestamp')
    
    def put(self, request, *args, **kwargs):
        user = self.request.user
        notifications = Notification.objects.filter(user=user, is_read=False)
        print(user,'---',notifications,'-----')
        notifications.update(is_read=True)
        return Response({'status': 'success'}, status=status.HTTP_200_OK)


    