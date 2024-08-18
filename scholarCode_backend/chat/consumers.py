# import logging
import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from main.models import CustomUser
from .models import ChatRooms, Messages

#aa logger = logging.getLogger('chat')

class ChatConsumer(AsyncWebsocketConsumer):
    # def some_method(self):
    #     from main.models import CustomUser
    #     from .models import ChatRooms, Messages

    async def connect(self):
        try:
            self.request_user = self.scope['user']
            if self.request_user.is_authenticated:
                self.chat_with_user = self.scope["url_route"]["kwargs"]["id"]
                user_ids = [int(self.request_user.id), int(self.chat_with_user)]
                user_ids = sorted(user_ids)
                self.room_group_name = f"chat_{user_ids[0]}-{user_ids[1]}"
                
                await self.channel_layer.group_add(self.room_group_name, self.channel_name)
                self.chat_room = await self.get_or_create_chat_room()
                await self.accept()
                # logger.info(f"WebSocket CONNECT: {self.room_group_name} by user {self.request_user.id}")
            else:
                await self.close()
                # logger.warning("WebSocket CLOSE: Unauthorized user")
        except Exception as e:
            # logger.error(f"Error in connect: {str(e)}")
            await self.close()

    @database_sync_to_async
    def get_or_create_chat_room(self):
        user1 = self.request_user
        user2 = CustomUser.objects.get(id=self.chat_with_user)
        user_ids = sorted([user1.id, user2.id])
        
        chat_room, created = ChatRooms.objects.get_or_create(
            user1_id=user_ids[0],
            user2_id=user_ids[1],
            defaults={'user1_id': user_ids[0], 'user2_id': user_ids[1]}
        )
        
        return chat_room, created

    async def receive(self, text_data):
        try:
            data = json.loads(text_data)
            message = data["message"]
            message_id = await self.save_message(message)
            await self.channel_layer.group_send(
                self.room_group_name, 
                {
                    "type": "chat_message", 
                    "message_id": message_id,
                    "message": message
                }
            )
            # logger.info(f"Message received in room {self.room_group_name}: {message}")
        except Exception as e:
            # logger.error(f"Error in receive: {str(e)}")
            await self.send(text_data=json.dumps({"error": str(e)}))

    @database_sync_to_async
    def save_message(self, message_content):
        chat_room = self.chat_room[0]
        message = Messages.objects.create(
            chat_room=chat_room,
            user=self.request_user,
            content=message_content
        )
        # logger.info(f"Message saved in room {self.room_group_name}: {message_content}")
        return message.id

    async def disconnect(self, code):
        try:
            await self.channel_layer.group_discard(
                self.room_group_name, 
                self.channel_name
            )
            # logger.info(f"WebSocket DISCONNECT: {self.room_group_name} by user {self.request_user.id}")
        except Exception as e:
            print(f"Error in disconnect: {str(e)}")
            # logger.error(f"Error in disconnect: {str(e)}")

    @database_sync_to_async
    def get_message_object(self, message_id):
        try:
            message = Messages.objects.get(id=message_id)
            message_obj = {
                'id': message.id,
                'chat_room': message.chat_room_id,
                'user': message.user.id,
                'content': message.content,
                'timestamp': message.timestamp.isoformat()
            }
            return message_obj
        except Messages.DoesNotExist:
            return None

    async def chat_message(self, event):
        try:
            message_id = event["message_id"]
            message_obj = await self.get_message_object(message_id)
            await self.send(text_data=json.dumps(message_obj))
            # logger.info(f"Message sent in room {self.room_group_name}: {message_obj}")
        except Exception as e:
            print(f"Error in chat_message: {str(e)}")
            # logger.error(f"Error in chat_message: {str(e)}")
