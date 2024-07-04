from django.db import models
from django.db.models import Q
from main.models import CustomUser
# Create your models here.

class ChatRooms(models.Model):
    user1 = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='chatroom_as_user1')
    user2 = models.ForeignKey(CustomUser,on_delete=models.CASCADE,related_name='chatroom_as_user2')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['user1', 'user2'],
                name='unique_chat_room',
                condition=Q(user1__lt=models.F('user2'))
            )
        ]

    def save(self, *args, **kwargs):
        if self.user1.id > self.user2.id:
            self.user1, self.user2 = self.user2, self.user1
        super().save(*args, **kwargs)

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