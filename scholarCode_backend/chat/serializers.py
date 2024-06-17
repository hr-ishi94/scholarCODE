from rest_framework import serializers
from . models import *

class ChatroomSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatRooms
        fields  = ['id', 'user1', 'user2']

class MessageSerializer(serializers.ModelSerializer):
    chat_room = ChatroomSerializer(read_only = True)

    class Meta:
        model = Messages
        fields = ['id','chat_room','user','content','timestamp']