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

    class Meta:
        constraints = [models.UniqueConstraint(fields=['mentor','course'],name='unique_mentor_courses')]
    
    def __str__(self):
        return self.course.name+" - "+self.mentor.first_name
    
class MentorTimes(models.Model):
    mentor = models.ForeignKey(Mentor, on_delete=models.CASCADE)
    date = models.DateField()
    time = models.TimeField()
    booked = models.BooleanField(default=False)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields= ['mentor','date','time','booked'],name='unique_time')
        ]

    def __str__(self):
        return f"{self.time}"


def default_review_date():
    return datetime.now().date() + timedelta(days=7)


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
        return f" {self.id} - {self.amount} -{self.email} - {self.provider_order_id} - {self.status}"

class Transaction(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE,related_name='transactions')
    admin = models.ForeignKey(CustomUser,on_delete=models.CASCADE,related_name='admin_transactions')
    payment = models.OneToOneField(RazorpayPayment,on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    timestamp = models.DateTimeField(auto_now_add=True)
    

    def __str__(self):
        return f'Transaction {self.id}: {self.user.email} to Admin {self.admin.email} for Rs. {self.amount} '

class AdminWallet(models.Model):
    admin = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='admin_wallet')
    balance = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)

    def __str__(self):
        return f'Admin {self.admin.email} Wallet'


class EnrolledCourse(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    course = models.ForeignKey(MentorCourses, on_delete=models.CASCADE)
    total_modules = models.IntegerField(default=0)
    curr_module = models.CharField(max_length=100,default='module 1')
    current_module = models.IntegerField(default=1)
    enroll_id= models.CharField(max_length=100, unique=True,blank=True)
    is_completed =models.BooleanField(default=False)
    certificate = models.FileField(upload_to='pdfs/',null=True, blank=True)
    next_review_date =  models.DateField(default = default_review_date)
    review_time = models.TimeField(blank=True,null=True)
    vcall_link = models.CharField(max_length=300,null=True, blank=True)
    feedback_status = models.BooleanField(default=False)
    payment = models.ForeignKey(RazorpayPayment, on_delete=models.CASCADE, null=True, blank= True)
    transaction = models.ForeignKey(Transaction,on_delete=models.CASCADE, null=True , blank= True)
    
    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['course', 'user'], name='user_enrolled_course')
        ]

    
    def generate_enroll_id(self):
        self.enroll_id =  ''.join(random.choices(string.ascii_uppercase +
                             string.digits, k=N))
    
    def save(self, *args, **kwargs):
        if not self.enroll_id: 
            self.generate_enroll_id()
        super().save(*args, **kwargs)

    def __str__(self):
        return f'{self.id}-{self.enroll_id}'

class ReviewMarks(models.Model):

    user = models.ForeignKey(User,on_delete=models.CASCADE)
    course = models.ForeignKey(EnrolledCourse,on_delete=models.CASCADE)
    module = models.CharField(max_length=100)
    pendings = models.CharField(max_length=500,blank=True)
    mark = models.IntegerField(
        validators = [
            MinValueValidator(0),MaxValueValidator(50)
                      ]
                               )

    def __str__(self) -> str:
        return f'{self.user}-{self.course}-{self.module} mark'
    

class Mentor_wallet(models.Model):
    mentor = models.ForeignKey(Mentor, on_delete=models.CASCADE)
    review_count = models.IntegerField(default=0,blank=True,null = True )
    amount = models.DecimalField(max_digits=10, decimal_places=2,blank = True, default=0)
    balance = models.DecimalField(max_digits=10, decimal_places=2,blank = True, default=0)
    payment_date = models.DateTimeField(auto_now_add=True,blank=True, null = True)
    status = models.CharField(max_length=10, choices=(('pending', 'Pending'), ('completed', 'Completed')), default='pending')

    def __str__(self):
        return f"{self.id}-{self.mentor}'s wallet"
    

class MentorTransaction(models.Model):
    mentor_wallet = models.ForeignKey(Mentor_wallet, on_delete=models.CASCADE, related_name='mentor_transactions')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    transaction_type = models.CharField(max_length=15, default='BANK TRANSFER')
    timestamp = models.DateTimeField(default=timezone.now)
    
    def __str__(self):
        return f"Transaction {self.id} for {self.mentor_wallet.mentor}"
    
class UserFeedback(models.Model):
    course = models.ForeignKey(MentorCourses,on_delete=models.CASCADE)
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    feedback_text = models.TextField(blank=True, null= True)
    rating = models.PositiveIntegerField(
        validators=[MinValueValidator(1),MaxValueValidator(5)]
    )
    submitted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"feedback by {self.user.username}- Rating :{self.rating}"
    
    class Meta:
        verbose_name = 'User Feedback'
        verbose_name_plural = 'User Feedbacks'
        ordering = ['-submitted_at']