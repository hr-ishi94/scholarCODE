from django.db import models
from main.models import CustomUser
# Create your models here.

class ChatRooms(models.Model):
    user1 = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='chatroom_as_user1')
    user2 = models.ForeignKey(CustomUser,on_delete=models.CASCADE,related_name='chatroom_as_user2')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user1','user2')

    def __str__(self):
        return f"{self.user1.username} - {self.user2.username} chatroom"
    
class Messages(models.Model):
    chat_room = models.ForeignKey(ChatRooms,on_delete= models.CASCADE, related_name='message')
    user = models.ForeignKey(CustomUser,on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['timestamp']

    def __str__(self):
        return f'Message by {self.user.username} at {self.timestamp}'