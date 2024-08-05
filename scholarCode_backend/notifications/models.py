# Create your models here.
from django.db import models
from main.models import CustomUser
from course.models import EnrolledCourse

class Notification(models.Model):
    user = models.ForeignKey(CustomUser, related_name='notifications', on_delete=models.CASCADE)
    message = models.CharField(max_length=255)
    timestamp = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)
    link = models.URLField(null=True, blank=True)
    enrolled_course = models.ForeignKey(EnrolledCourse, related_name='course_notifications', on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return f'Notification for {self.user.username}'

    def mark_as_read(self):
        self.is_read = True
        self.save()

    class Meta:
        ordering = ['-timestamp']