from datetime import datetime
from django.db import models
from django.utils import timezone
from django.contrib.auth.models import AbstractUser,PermissionsMixin,AbstractBaseUser,BaseUserManager
from rest_framework_simplejwt.tokens import RefreshToken


# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=250,unique=True)

    def __str__(self):
        return self.name

class Course(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE,related_name='courses')
    price = models.IntegerField()
    published_on = models.DateTimeField(default=datetime.now, blank = True)
    thumbnail = models.ImageField(upload_to='course/uploads/',blank=True)
    status = models.BooleanField(default=True)

    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        if not self.published_on:
            self.published_on = timezone.now().date()  # Convert datetime to date
        super().save(*args, **kwargs)

    
class Module(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name
    

class Task(models.Model):
    name = models.CharField(max_length=500)
    course = models.ForeignKey(Course,on_delete=models.CASCADE,related_name='tasks')
    module = models.CharField(max_length=150)
    task_module= models.IntegerField(default=0,blank=True)

    def __str__(self):
        return self.name


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
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, username, password, **extra_fields)
    
class CustomUser(AbstractBaseUser):
    first_name = models.CharField(max_length=150,blank=True)
    last_name = models.CharField(max_length=150,blank=True)
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=150, unique=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    objects = CustomUserManager()

    def has_perm(self, perm, obj = None):
        return True
    
    def has_module_perms(self,app_label):
        return True

    def __str__(self):
        return self.email
    
    def tokens(self):
        refresh = RefreshToken.for_user(self)
        return {
            'refresh' : str(refresh),
            'access' : str(refresh.access_token)
        }


class Mentor(CustomUser):
    designation = models.CharField(max_length=100)
    course_id = models.ForeignKey(Course,on_delete=models.CASCADE,null=True,blank=True)
    linkedin_profile = models.CharField(max_length=300)
    profile_img = models.ImageField(upload_to='mentor/uploads/',blank=True)
    request_attempt = models.IntegerField(default=0,blank=True,null=True)
    degree_certificate = models.FileField(upload_to='mentor/pdfs/',null=True, blank=True)
    
class User(CustomUser):
    designation = models.CharField(max_length=100,blank=True)
    profile_img = models.ImageField(upload_to='user/uploads/',blank=True)

