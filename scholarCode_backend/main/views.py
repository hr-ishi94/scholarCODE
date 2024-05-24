from rest_framework import generics,status
from .models import Mentor, User, Category, Course, Module, Task
from .serializers import MentorSerializer, UserSerializer, CategorySerializer, CourseSerializer, UserSerializerWithToken, TaskSerializer,AdminLoginSerializer,MentorSerializerWithToken,UserLoginSerializer,MentorLoginSerializer

from rest_framework.response import Response
from rest_framework.decorators import api_view,authentication_classes,permission_classes
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated,BasePermission

from django.contrib.auth.hashers import make_password
from django.http import HttpResponse
from django.core.mail import EmailMessage
from django.core.exceptions import ValidationError

# email verification
from django.db.models import Q
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_decode,urlsafe_base64_encode
from .utils import generate_token
from django.utils.encoding import force_bytes,force_text
from django.conf import settings
from django.views.generic import View
from django.db import transaction
from django.db.utils import IntegrityError



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
    
# user login 
class UserLogin(generics.CreateAPIView):
    serializer_class = UserLoginSerializer

    def create(self,request,*args, **kwargs):
        serializer = self.get_serializer(
            data = request.data,context = {'request':request}
        )
        serializer.is_valid(raise_exception = True)
        return Response(serializer.data,status = status.HTTP_200_OK)

# mentor login
class MentorLogin(generics.CreateAPIView):
    serializer_class = MentorLoginSerializer

    def create(self,request,*args, **kwargs):
        serializer = self.get_serializer(
            data = request.data,context = {'request':request}
        )
        serializer.is_valid(raise_exception = True)
        return Response(serializer.data,status= status.HTTP_200_OK)
    

# GET, POST mentors entire mentors
class MentorList(generics.ListCreateAPIView):
    queryset = Mentor.objects.all()
    serializer_class = MentorSerializer
    authentication_classes =[JWTAuthentication]

    
# GET, PUT, DELETE particular mentor
class MentorDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Mentor.objects.all()
    serializer_class = MentorSerializer
    authentication_classes =[JWTAuthentication]

    def put(self,request,*args, **kwargs):
        instance = self.get_object()
        data = request.data.copy()
        password = data.get('password')
        if password:
            instance.set_password(password)
            instance.save()
            data.pop('password',None)
        serializer = self.get_serializer(instance,data = request.data,partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            print(serializer.errors)
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)


class AdminMentorApproval(generics.RetrieveUpdateDestroyAPIView):
    queryset =Mentor.objects.all()
    serializer_class = MentorSerializer
    authentication_classes =[JWTAuthentication]
    permission_classes = [AdminOnlyPermission,IsAuthenticated]
    
    def put (self,request, *args, **kwargs):
        data = request.data
        try:
            Mentor.objects.filter(pk = kwargs['pk']).update(is_staff = data['is_staff'])
            mentor = Mentor.objects.get(pk=kwargs['pk'])
            print(mentor.pk,"dsfsdfdskkkkk")
            email_subject = 'Mentor Request Accepted'
            message =render_to_string("mentor_activate.html",{
                'mentor':mentor,
                'domain':'127.0.0.1:8000',
                'uid':urlsafe_base64_encode(force_bytes(mentor.pk)),
                'token':generate_token.make_token(mentor)
            })
            # print(message)
            email_message = EmailMessage(email_subject, message, settings.EMAIL_HOST_USER,[mentor.email] )
            email_message.send()
            serialize = MentorSerializerWithToken(mentor,many=False)
            return Response(serialize.data)
        
        except Exception as e:
            message = {'details':e}
            print(e)
            return Response(message,status=status.HTTP_400_BAD_REQUEST)

class MentorActivateAccountView(View):
    def get(self,request,uidb64,token):
        try:
            uid= force_text(urlsafe_base64_decode(uidb64))
            mentor = Mentor.objects.get(pk = uid)
        except (TypeError, ValueError, OverflowError, Mentor.DoesNotExist):
            mentor = None

        if mentor is not None and generate_token.check_token(mentor,token):
            mentor.is_active = True
            mentor.save()
            message = {"details": "Account is activated..."}
            return HttpResponse("Activation success.You can login to your account now")
        else:
            return HttpResponse("Activation Failed.")



class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    authentication_classes =[JWTAuthentication]
    # permission_classes = [AdminOnlyPermission,IsAuthenticated]


    def post(self, request, *args, **kwargs):
        data = request.data
        serializer = UserSerializer(data=data)
        
        if serializer.is_valid():
            email = data.get('email')
            username = data.get('username')
            
            if User.objects.filter(email=email).exists():
                return Response({'error': 'Email already exists'}, status=status.HTTP_400_BAD_REQUEST)
            if User.objects.filter(username=username).exists():
                return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)
            
            try:
                with transaction.atomic():
                    user = User.objects.create(
                        username=username,
                        email=email,
                        password=make_password(data['password']),
                        is_active=data['is_active']
                    )
                    email_subject = 'Activate Your Account'
                    message = render_to_string("activate.html", {
                        'user': user,
                        'domain': '127.0.0.1:8000',
                        'uid': urlsafe_base64_encode(force_bytes(user.pk)),
                        'token': generate_token.make_token(user)
                    })
                    email_message = EmailMessage(email_subject, message, settings.EMAIL_HOST_USER, [email])
                    email_message.send()

                    serialize = UserSerializerWithToken(user, many=False)
                    return Response(serialize.data, status=status.HTTP_201_CREATED)

            except IntegrityError:
                return Response({'error': 'Integrity error occurred, possibly due to duplicate entry'}, status=status.HTTP_400_BAD_REQUEST)
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ActivateAccountView(View):
    def get(self, request, uidb64, token):
        try:
            uid = force_text(urlsafe_base64_decode(uidb64))
            print(uid)
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None

        if user is not None and generate_token.check_token(user, token):
            user.is_active = True
            user.save()
            message = {"details": "Account is activated..."}
            return HttpResponse("Activation success.You can login to your account now")
        else:
            return HttpResponse("Activation Failed.")

#GET, PUT, DELETE particular user
class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    authentication_classes =[JWTAuthentication]
    # permission_classes = [AdminOnlyPermission,IsAuthenticated]
    def put(self, request, *args, **kwargs):
        instance = self.get_object()
        data = request.data.copy()
        password = data.get('password')
        if password:
            instance.set_password(password)
            instance.save()
            data.pop('password',None)
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
    authentication_classes =[JWTAuthentication]
    permission_classes = [AdminOnlyPermission,IsAuthenticated]


#GET, PUT, DELETE particular categories
class CategoryList(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    authentication_classes =[JWTAuthentication]
    permission_classes = [AdminOnlyPermission,IsAuthenticated]


# GET,POST Course List
class CoursesList(generics.ListCreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    authentication_classes =[JWTAuthentication]
    # permission_classes = [AdminOnlyPermission,IsAuthenticated]



#GET, PUT, DELETE particular Course
class CourseDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer 
    authentication_classes =[JWTAuthentication]
    # permission_classes = [AdminOnlyPermission,IsAuthenticated]
    def put(self,request,*args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data = request.data, partial =True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            print(serializer.error)
            return Response(serializer.error,status=status.HTTP_400_BAD_REQUEST)


    



# UPDATE, DELETE Tasks
class TaskUpdate(generics.RetrieveUpdateDestroyAPIView):
    queryset= Task.objects.all()
    serializer_class = TaskSerializer
    authentication_classes =[JWTAuthentication]
    permission_classes = [AdminOnlyPermission,IsAuthenticated]
    def put(self,request,*args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data = request.data, partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            print(serializer.error)
            return Response (serializer.error,status=status.HTTP_400_BAD_REQUEST)



@api_view(['GET','POST'])
@authentication_classes([JWTAuthentication])
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
    




