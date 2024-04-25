from rest_framework import generics
from .models import Mentor, User
from .serializers import MentorSerializer, UserSerializer

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

# active mentors list
@api_view(['GET'])
def activeMentorList(request):
    mentors = Mentor.objects.filter(is_staff = True)
    serializer = MentorSerializer(mentors, many = True)
    return Response(serializer.data)

# mentors Request list
@api_view(['GET'])
def mentorRequests(request):
    mentors = Mentor.objects.filter(is_staff = False)
    serializer = MentorSerializer(mentors, many = True)
    return Response(serializer.data)
    
# GET, PUT, DELETE particular mentor
class MentorDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Mentor.objects.all()
    serializer_class = MentorSerializer

# GET, USER users
class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

#GET, PUT, DELETE particular user
class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer 
    