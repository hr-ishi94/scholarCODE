from datetime import datetime
from django.db import models
from django.contrib.auth.models import AbstractUser,PermissionsMixin,AbstractBaseUser,BaseUserManager

# Create your models here.
class Task(models.Model):
    task = models.CharField(max_length=500)

class Module(models.Model):
    module = models.CharField(max_length=100)
    task_id = models.ForeignKey(Task, on_delete=models.CASCADE)

class Course(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    module_id = models.ForeignKey(Module, on_delete=models.CASCADE)
    price = models.IntegerField()
    published_on = models.DateField(default=datetime.now , blank = True)
    thumbnail = models.ImageField(upload_to='course/uploads/')
    status = models.BooleanField(default=True)

class CustomUserManager(BaseUserManager):
    def create_user(self, email, username, password = None, **extra_fields):
        if not email:
            raise ValueError("The email field must be set")
        email = self.normalize_email(email)
        user = self.model(email = email, username = username, **extra_fields)
        user.set_password(password)
        user.save(using = self._db)
        return user
    
    def create_superuser(self, email, username, password = None, **extra_fields):
        extra_fields.setdefault('is_staff',True)
        extra_fields.setdefault('is_superuser',True)
        return self.create_user(email, username, password, **extra_fields)
    
class CustomUser(AbstractBaseUser):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=150, unique=True)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    objects = CustomUserManager()

    def __str__(self):
        return self.email


class Mentor(CustomUser):
    designation = models.CharField(max_length=100)
    course_id = models.ForeignKey(Course,on_delete=models.CASCADE,null=True)
    linkedin_profile = models.CharField(max_length=300)
    profile_img = models.ImageField(upload_to='mentor/uploads/', null=True)
    isActive = models.BooleanField(default=False)
    
class User(CustomUser):
    designation = models.CharField(max_length=100)
    profile_img = models.ImageField(upload_to='user/uploads/',null=True)
    isActive = models.BooleanField(default=True)

