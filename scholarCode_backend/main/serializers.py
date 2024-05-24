import cloudinary.uploader
from django.utils import timezone
from rest_framework import serializers
from django.contrib.auth import authenticate
from rest_framework.exceptions import AuthenticationFailed
from .models import *
import cloudinary


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

# user Login serializer
class UserLoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length = 255)
    password = serializers.CharField(max_length = 128, write_only = True)
    access_token = serializers.CharField(max_length = 255, read_only = True)
    refresh_token = serializers.CharField(max_length = 255, read_only = True)


    class Meta :
        model = User
        fields = ['email','password', 'access_token','refresh_token']

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')
        request = attrs.get('request')
        user = authenticate(request, email= email , password = password)

        if not user:
            raise AuthenticationFailed("invalid Credentials")
        
        if user.is_superuser:
            raise AuthenticationFailed("You are not authorized to login as user")
        
        if not user.is_active:
            raise AuthenticationFailed("Either check your mail for activation link or kindly contact the admin")
        
        user_token = user.tokens()

        return {
            'email':user.email,
            'access_token':str(user_token.get('access')),
            'refresh_token':str(user_token.get('refresh'))
        }
    
class MentorLoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length = 150)
    password = serializers.CharField(max_length = 150,write_only = True)
    access_token = serializers.CharField(max_length = 300,read_only = True)
    refresh_token = serializers.CharField(max_length = 300,read_only = True)

    class Meta:
        model = Mentor
        fields = ['email','password','access_token','refresh_token']

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')
        request = attrs.get('request')
        mentor = authenticate(request, email = email, password = password)
    
        if not mentor:
            raise AuthenticationFailed("Invalid credentials")
        
        if not mentor.is_active:
            raise AuthenticationFailed("You are not allowed to login Please contact the admin")

        if not mentor.is_staff:
            raise AuthenticationFailed("Please check your mail for activation link and then login")
        
        if mentor.is_superuser:
            raise AuthenticationFailed("Sorry Admin, You can't login as mentor")
        
        mentor_token = mentor.tokens()
        return {
            'email':mentor.email,
            'access_token':str(mentor_token.get('access')),
            'refresh_token':str(mentor_token.get('refresh')),

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
    
    def update(self, instance, validated_data):
        password = validated_data.pop('password',None)
        for attr, value in validated_data.items():
            setattr(instance,attr,value)
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
        email = validated_data['email']
        password = validated_data.pop('password',None)
        instance = self.Meta.model(**validated_data)
        if password:
            instance.set_password(password)
        instance.save()
        return instance
    
    def update(self, instance, validated_data):
        password = validated_data.pop('password',None)
        for attr, value in validated_data.items():
            setattr(instance,attr,value)
        if password:
            instance.set_password(password)
        instance.save()
        return instance
    
class MentorSerializerWithToken(MentorSerializer):
    token = serializers.SerializerMethodField(read_only = True)
    class Meta:
        model = Mentor
        fields = ['id','is_staff','is_active','token']

    def get_token(self,obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)


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
    # category= CategorySerializer(read_only = True)
    published_on = serializers.DateTimeField(default=timezone.now, read_only=True)
    thumbnail = serializers.ImageField(use_url=True, required=False)

    class Meta:
        model = Course
        fields = '__all__'

    # def create(self,validated_data):
    #     thumbnail_file = validated_data.get('thumbnail',None)
    #     print(validated_data)
    #     if thumbnail_file:
    #         upload_file = cloudinary.uploader.upload(thumbnail_file)
    #         validated_data['thumbnail']= upload_file['secure_url']
    #         print(upload_file)

    #     category_data = validated_data.pop('category')
    #     category_serializer = CategorySerializer(data=category_data)

    #     if category_serializer.is_valid():
    #         category_instance = category_serializer.save()
    #     else:
    #         raise serializers.ValidationError( category_serializer.errors)
        
    #     course_instance= Course.objects.create(category = category_instance,**validated_data)

    #     return course_instance
    

class ModuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Module
        fields = '__all__'

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'
