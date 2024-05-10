from rest_framework import serializers
from django.contrib.auth import authenticate
from rest_framework.exceptions import AuthenticationFailed
from .models import *


# Admin login serializer
class AdminLoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=255)
    password = serializers.CharField(max_length = 128, write_only = True)
    access_token = serializers.CharField(max_length = 255, read_only = True)
    refresh_token = serializers.CharField(max_length=255, read_only=True)

    class Meta:
        model = User
        fields = ['email', 'password', 'access_token', 'refresh_token']

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')
        request = self.context.get('request')
        user = authenticate(request, email = email, password = password)
        
        if not user :
            raise AuthenticationFailed("Invalid Credentials")
        
        if not user.is_superuser:
            raise AuthenticationFailed("You are not authorized to login as admin")

        user_token = user.tokens()

        return {
            'email':user.email,
            'access_token':str(user_token.get('access')),
            'refresh_token':str(user_token.get('refresh')),
        }


# mentor model serializer
class MentorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mentor
        fields = '__all__'
    # mentor password encryption
    def create(self, validated_data):
        password = validated_data.pop('password',None)
        instance = self.Meta.model(**validated_data)
        if password:
            instance.set_password(password)
        instance.save()
        return instance

# user model serializer 
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

    # user password encryption
    def create(self, validated_data):
        password = validated_data.pop('password',None)
        instance = self.Meta.model(**validated_data)
        if password:
            instance.set_password(password)
        instance.save()
        return instance
    

class UserSerializerWithToken(UserSerializer):
    token =serializers.SerializerMethodField(read_only = True)
    class Meta:
        model = User
        fields = ['id','email','username','password','token']

    def get_token(self,obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)
    
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class CourseSerializer(serializers.ModelSerializer):
    category= CategorySerializer()
    class Meta:
        model = Course
        fields = '__all__'

class ModuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Module
        fields = '__all__'

class TaskSerializer(serializers.ModelSerializer):
    course = CourseSerializer()
    module = ModuleSerializer()
    class Meta:
        model = Task
        fields = '__all__'
