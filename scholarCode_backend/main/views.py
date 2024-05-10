from rest_framework import generics,status
from .models import Mentor, User, Category, Course, Module, Task
from .serializers import MentorSerializer, UserSerializer, CategorySerializer, CourseSerializer, UserSerializerWithToken, TaskSerializer,AdminLoginSerializer

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from rest_framework.decorators import api_view,authentication_classes,permission_classes
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated,BasePermission

from django.contrib.auth.hashers import make_password
from django.http import HttpResponse
from django.shortcuts import render
from django.core.mail import EmailMessage

# email verification
from django.template import TemplateSyntaxError
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_decode,urlsafe_base64_encode
from .utils import generate_token,TokenGenerator
from django.utils.encoding import force_bytes,force_text,DjangoUnicodeDecodeError
from django.core.mail import EmailMessage
from django.conf import settings
from django.views.generic import View

# Mentor token generator 
class MentorTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls,user):
        token = super().get_token(user)
        token['is_mentor'] = True
        return token
    
# Mentor token request validator 
class MentorTokenObtainPairView(TokenObtainPairView):
    def post(self,request,*args, **kwargs):
        serializer = MentorTokenObtainPairSerializer(data = request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.validated_data)

# User token generator 
class UserTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['is_mentor'] = False
        return token

# User token request validator
class UserTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        serializer = UserTokenObtainPairSerializer(data = request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.validated_data)

# Admin token generator
class AdminTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['is_superuser'] = user.is_superuser
        return token

# Admin token request validator
class AdminTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        serializer = AdminTokenObtainPairSerializer(data = request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.validated_data)

class AdminOnlyPermission(BasePermission):
    """
    Custom permission to only allow admin users to access the view.
    """

    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.is_superuser


class AdminLogin(generics.CreateAPIView):
    serializer_class = AdminLoginSerializer

    def create(self,request,*args, **kwargs):
        serializer = self.get_serializer(
            data = request.data,context = {'request':request})
        
        serializer.is_valid(raise_exception = True)
        return Response(serializer.data,status=status.HTTP_200_OK)



# GET, POST mentors entire mentors
class MentorList(generics.ListCreateAPIView):
    queryset = Mentor.objects.all()
    serializer_class = MentorSerializer
    # authentication_classes =[JWTAuthentication]
    # permission_classes = [AdminOnlyPermission,IsAuthenticated]

    
# GET, PUT, DELETE particular mentor
class MentorDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Mentor.objects.all()
    serializer_class = MentorSerializer
    # authentication_classes =[JWTAuthentication]
    # permission_classes = [AdminOnlyPermission,IsAuthenticated]
    def put(self,request,*args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance,data = request.data,partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            print(serializer.errors)
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)


# GET, POST users
class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
        

    def post(self, request, *args, **kwargs):
        data = request.data
        try:
            user = User.objects.create(username = data['username'],email=data['email'],password= make_password(data['password']),isactive=data['isactive'])
            email_subject = 'Activate Your Account'
            message = render_to_string("activate.html",{
                'user':user,
                'domain':'127.0.0.1:8000',
                'uid':urlsafe_base64_encode(force_bytes(user.pk)),
                'token':generate_token.make_token(user)
            })
            # print(message)
            email_message = EmailMessage(email_subject,message,settings.EMAIL_HOST_USER,[data['email']])
            email_message.send()
            serialize = UserSerializerWithToken(user,many = False)
            return Response(serialize.data)
        
        except Exception as e:
            message = {'details':e}
            print(e)
            return Response(message,status=status.HTTP_400_BAD_REQUEST)

        
        
class ActivateAccountView(View):
    def get(self, request, uidb64, token):
        try:
            uid = force_text(urlsafe_base64_decode(uidb64))
            print(uid)
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None

        if user is not None and generate_token.check_token(user, token):
            user.isactive = True
            user.save()
            message = {"details": "Account is activated..."}
            return HttpResponse("Activation success.You can login to your account now")
        else:
            return HttpResponse("Activation Failed.")

#GET, PUT, DELETE particular user
class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    # authentication_classes =[JWTAuthentication]
    # permission_classes = [AdminOnlyPermission,IsAuthenticated]
    def put(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            print(serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# GET,POST Category
class Categories(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    # authentication_classes =[JWTAuthentication]
    # permission_classes = [AdminOnlyPermission,IsAuthenticated]


#GET, PUT, DELETE particular categories
class CategoryList(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    # authentication_classes =[JWTAuthentication]
    # permission_classes = [AdminOnlyPermission,IsAuthenticated]


# GET,POST Course List
class CoursesList(generics.ListCreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    # authentication_classes =[JWTAuthentication]
    # permission_classes = [AdminOnlyPermission,IsAuthenticated]


#GET, PUT, DELETE particular Course
class CourseDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer 
    # authentication_classes =[JWTAuthentication]
    # permission_classes = [AdminOnlyPermission,IsAuthenticated]



# UPDATE, DELETE Tasks
class TaskUpdate(generics.RetrieveUpdateDestroyAPIView):
    queryset= Task.objects.all()
    serializer_class = TaskSerializer
    # authentication_classes =[JWTAuthentication]
    # permission_classes = [AdminOnlyPermission,IsAuthenticated]



@api_view(['GET','POST'])
# @authentication_classes([JWTAuthentication])
# @permission_classes([AdminOnlyPermission,IsAuthenticated])
def TaskList(request, course_id):
    
    if request.method == 'GET':
        try:
            tasks = Task.objects.filter(course=course_id)
            if not tasks:
                return Response({"message": "No tasks found for this course."}, status=status.HTTP_404_NOT_FOUND)
            
            serializer = TaskSerializer(tasks, many=True)
            return Response(serializer.data)
        except Course.DoesNotExist:
            return Response({"message": "Course does not exist."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"message": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    elif request.method == 'POST':
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(course_id=course_id)  # Assign the course ID to the new task
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    




