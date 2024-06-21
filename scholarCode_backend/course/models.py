from django.db import models
from main.models import *
import string
import random
from datetime import datetime,timedelta 
from django.core.validators import MinValueValidator,MaxValueValidator

N = 9
# Create your models here.
class MentorCourses(models.Model):
    mentor = models.ForeignKey(Mentor, on_delete=models.CASCADE)
    course = models.ForeignKey(Course,on_delete=models.CASCADE)
    courseStatus = models.BooleanField(default=True)
    
    def __str__(self):
        return self.course.name+" - "+self.mentor.first_name
    
class MentorTimes(models.Model):
    mentor = models.ForeignKey(Mentor, on_delete=models.CASCADE)
    time = models.TimeField()

    def __str__(self):
        return f"{self.time}"


def default_review_date():
    return datetime.now().date() + timedelta(days=7)

class EnrolledCourse(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    course = models.ForeignKey(MentorCourses, on_delete=models.CASCADE)
    total_modules = models.IntegerField(default=0)
    curr_module = models.CharField(max_length=100,default='module 1')
    enroll_id= models.CharField(max_length=100, unique=True,blank=True)
    is_completed =models.BooleanField(default=False)
    certificate = models.CharField(blank=True)
    next_review_date =  models.DateField(default = default_review_date)
    next_review_time = models.ForeignKey(MentorTimes,on_delete=models.CASCADE,blank=True,null=True)
    vcall_link = models.CharField(max_length=300,null=True, blank=True)

    class Meta:
        unique_together = ('next_review_date','next_review_time')

    def generate_enroll_id(self):
        self.enroll_id =  ''.join(random.choices(string.ascii_uppercase +
                             string.digits, k=N))
    
    def save(self, *args, **kwargs):
        if not self.enroll_id: 
            self.generate_enroll_id()
        super().save(*args, **kwargs)

    def __str__(self):
        return self.enroll_id

class PaymentStatus(models.TextChoices):
    CREATED = 'created', 'Created'
    SUCCESS = 'success', 'Success'
    FAILED = 'failed', 'Failed'
    PENDING = 'pending', 'Pending'

class RazorpayPayment(models.Model):
    email = models.EmailField(max_length=254)
    course_id = models.CharField(max_length=150)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    provider_order_id = models.CharField(max_length=100, unique=True)
    status = models.CharField(
        max_length=20,
        choices=PaymentStatus.choices,
        default=PaymentStatus.CREATED
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.email} - {self.provider_order_id} - {self.status}"


class ReviewMarks(models.Model):

    user = models.ForeignKey(User,on_delete=models.CASCADE)
    course = models.ForeignKey(EnrolledCourse,on_delete=models.CASCADE)
    module = models.CharField(max_length=100)
    mark = models.IntegerField(
        validators = [
            MinValueValidator(0),MaxValueValidator(50)
                      ]
                               )

    def __str__(self) -> str:
        return f'{self.user}-{self.course}-{self.module} mark'