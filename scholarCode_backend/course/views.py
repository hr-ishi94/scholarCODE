from django.shortcuts import render
from .models import *
from .serializers import *

from rest_framework.response import Response
from rest_framework import generics,status
from rest_framework.decorators import api_view

class EnrollCourseView(generics.ListCreateAPIView):
    queryset = EnrolledCourse.objects.all()
    serializer_class = EnrollSerializer

class MentorCourseView(generics.RetrieveUpdateDestroyAPIView):
    queryset = MentorCourses.objects.all()
    serializer_class = MentorCourseSerializer
    def put(self,request,*args, **kwargs):
        instance = self.get_object()
        data = request.data.copy()
        serializer = self.get_serializer(instance,data = request.data, partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status= status.HTTP_200_OK)
        return Response(serializer.errors, status= status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def EnrolledCoursesList(request):
    if request.method == 'GET':
        try:
            enrolls = EnrolledCourse.objects.all()
            if not enrolls:
                return Response({'message':'No courses for this mentor'})
            serializer = EnrollSerializer(enrolls, many = True)
            return Response(serializer.data)
        except Exception as e:
            return Response({'message':str(e)},status= status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET','POST','PUT'])
def EnrolledCoursesUser(request,user_id):
    if request.method == 'GET':
        try:
            enrolls = EnrolledCourse.objects.filter(user = user_id)
            if not enrolls:
                return Response({'message':'No courses for this mentor'})
            serializer = EnrollSerializer(enrolls, many = True)
            return Response(serializer.data)
        except Exception as e:
            return Response({'message':str(e)},status= status.HTTP_500_INTERNAL_SERVER_ERROR)
    elif request.method =='POST':
        serializer = EnrollSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_200_OK)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'PUT':
        try:       
            data = request.data
            enroll_id = data.get('id')
            print(enroll_id)
            print(data)
            try:
                course = EnrolledCourse.objects.get(id = enroll_id , user = user_id )
            except EnrolledCourse.DoesNotExist:
                return Response({'status':'error','message':'Enrollment not found'})
            
            if 'next_review_time' in request.data and request.data['next_review_time'] is None:
                course.next_review_time = None
            
            serializer = EnrollSerializer(course,data=data,partial = True)
            if serializer.is_valid():
                serializer.save()
                return Response({'status':'success','data':serializer.data},status=status.HTTP_200_OK)
            
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            # Handle exceptions and return an error response
            return Response({'status': 'error', 'message': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        




@api_view(['GET','POST'])
def MentorCourseList(request):
    if request.method == 'GET':
        try:
            courses = MentorCourses.objects.all()
            if not courses:
                return Response({'message':'No course found for this mentor'})
            serializer = MentorCourseSerializer(courses,many = True)
            return Response(serializer.data)
        except Exception as e:
            return Response({"message":str(e)},status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    elif request.method == 'POST':
            serializer = MentorCourseSerializer(data =request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data,status= status.HTTP_200_OK)
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        
class ReviewMarkView(generics.ListCreateAPIView):
    queryset = ReviewMarks.objects.all()
    serializer_class = ReviewMarkSerializer

    def post(self, request, *args, **kwargs):
        serializer = ReviewMarkSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status = status.HTTP_200_OK)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)