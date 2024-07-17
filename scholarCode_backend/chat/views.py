from django.shortcuts import render
from rest_framework import generics,status
from .serializers import MessageSerializer,ChatroomSerializer
from .models import ChatRooms,Messages
from django.db.models import Q
from rest_framework.exceptions import NotFound
from rest_framework.response import Response 
from rest_framework.decorators import api_view

class MessageListView(generics.ListCreateAPIView):
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

@api_view(['POST'])
def AddChatRoom(request):
    if request.method == 'POST':
        try:
            user_id1 = request.data.get('user_id1')
            user_id2 = request.data.get('user_id2')

            # Ensure user_id1 and user_id2 are different
            if user_id1 == user_id2:
                return Response({'error': 'Cannot create chat room with the same user.'}, status=status.HTTP_400_BAD_REQUEST)

            # Query for existing chat rooms
            chat_rooms = ChatRooms.objects.filter(
                Q(user1_id=user_id1, user2_id=user_id2) | Q(user1_id=user_id2, user2_id=user_id1)
            )

            # Check if chat room already exists
            if chat_rooms.exists():
                chat_room = chat_rooms.first()  # Assuming you want to use the first found chat room
                serializer = ChatroomSerializer(chat_room)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                # Create a new chat room if none exists
                chat_room = ChatRooms.objects.create(user1_id=user_id1, user2_id=user_id2)
                serializer = ChatroomSerializer(chat_room)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        
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


