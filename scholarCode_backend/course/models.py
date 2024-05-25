from django.db import models
from main.models import *
import string
import random

N = 9
# Create your models here.
class MentorCourses(models.Model):
    mentor = models.ForeignKey(Mentor, on_delete=models.CASCADE)
    course = models.OneToOneField(Course,on_delete=models.CASCADE)
    
    def __str__(self):
        return self.course.name

class EnrolledCourse(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    course = models.ForeignKey(MentorCourses, on_delete=models.CASCADE)
    curr_module = models.CharField(max_length=100,default='module 1')
    enroll_id= models.CharField(max_length=100, unique=True,blank=True)
    is_completed =models.BooleanField(default=False)
    certificate = models.CharField(blank=True)

    def generate_enroll_id(self):
        self.enroll_id =  ''.join(random.choices(string.ascii_uppercase +
                             string.digits, k=N))
    
    def save(self,*args, **kwargs):
        self.generate_enroll_id()
        super().save(*args,*kwargs)

    def __str__(self):
        return self.enroll_id

