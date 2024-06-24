from rest_framework import serializers
from . models import *
from main.serializers import CustomUserSerializer


class ChatroomSerializer(serializers.ModelSerializer):
    user1 = CustomUserSerializer(read_only = True)
    user2 = CustomUserSerializer(read_only = True)
    class Meta:
        model = ChatRooms
        fields  = ['id', 'user1', 'user2']


class MessageSerializer(serializers.ModelSerializer):
    chat_room = ChatroomSerializer(read_only = True)

    class Meta:
        model = Messages
        fields = ['id','chat_room','user','content','timestamp']