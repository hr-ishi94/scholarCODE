from django.db import models
from main.models import User, Mentor
# Create your models here.

class ChatRoom(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='chatroom_as_user')
    mentor = models.ForeignKey(Mentor,on_delete=models.CASCADE,related_name='chatroom_as_mentor')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user','mentor')

    def __str__(self):
        return f'{self.user,self.mentor}\'s chatroom'
    
class Message(models.Model):
    chat_room = models.ForeignKey(ChatRoom,on_delete= models.CASCADE, related_name='message')
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    mentor = models.ForeignKey(Mentor,on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['timestamp']

    def __str__(self):
        if self.user:
            return f'"message by {self.user} at {self.timestamp}'
        elif self.mentor:
            return f'"message by {self.mentor} at {self.timestamp}'
        