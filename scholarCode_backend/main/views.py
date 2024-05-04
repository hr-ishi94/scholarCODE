from rest_framework import generics,status
from .models import Mentor, User, Category, Course, Module, Task
from .serializers import MentorSerializer, UserSerializer, CategorySerializer, CourseSerializer, ModuleSerializer, TaskSerializer

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from rest_framework.decorators import api_view

from django.db.models import Q

# Mentor token generator 
class MentorTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls,mentor):
        token = super().get_token(mentor)
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


# GET, POST mentors entire mentors
class MentorList(generics.ListCreateAPIView):
    queryset = Mentor.objects.all()
    serializer_class = MentorSerializer
    
# GET, PUT, DELETE particular mentor
class MentorDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Mentor.objects.all()
    serializer_class = MentorSerializer

# GET, POST users
class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

#GET, PUT, DELETE particular user
class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer 

# GET,POST Category
class Categories(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

#GET, PUT, DELETE particular categories
class CategoryList(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

# GET,POST Course List
class CoursesList(generics.ListCreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

#GET, PUT, DELETE particular Course
class CourseDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer 

# # GET , POST tasks 

# class TaskList(generics.ListCreateAPIView):
#     queryset = Task.objects.all()
#     serializer_class = TaskSerializer

# UPDATE, DELETE Tasks
class TaskUpdate(generics.RetrieveUpdateDestroyAPIView):
    queryset= Task.objects.all()
    serializer_class = TaskSerializer


@api_view(['GET','POST'])
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