from django.shortcuts import render
from rest_framework import generics
from .serializers import MessageSerializer,ChatroomSerializer
from .models import ChatRooms,Messages
from django.db.models import Q
from rest_framework.exceptions import NotFound
from rest_framework.response import Response 
from rest_framework.decorators import api_view

class MessageListView(generics.ListAPIView):
    serializer_class = MessageSerializer

    def get_queryset(self):
        user_id1 = self.kwargs['user_id1']
        user_id2 = self.kwargs['user_id2']

        try:
            chat_room = ChatRooms.objects.filter(
                Q(user1_id = user_id1, user2_id = user_id2) | Q(user1_id = user_id2, user2_id = user_id1)

            )
            print("_____",chat_room)
            if not chat_room:
                raise NotFound('Room not found')
            
            return Messages.objects.filter(chat_room__in = chat_room).order_by('-timestamp')
        except ChatRooms.DoesNotExist:
            return Messages.objects.none()
        
@api_view(['GET'])    
def ListChatUsers(request,user_id):
    if request.method == 'GET':
        try:
            users = ChatRooms.objects.filter(Q(user1_id = user_id) | Q(user2_id = user_id))
            if not users:
                return Response({'message':'No chat rooms found '})
            serializer = ChatroomSerializer(users,many = True)
            return Response(serializer.data)

        except ChatRooms.DoesNotExist:
            return ChatRooms.objects.none()


