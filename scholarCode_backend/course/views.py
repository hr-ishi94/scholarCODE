from django.shortcuts import render
from .models import *
from .serializers import *

from rest_framework.response import Response
from rest_framework import generics,status
from rest_framework.decorators import api_view

class EnrollCourseView(generics.ListCreateAPIView):
    queryset = EnrolledCourse.objects.all()
    serializer_class = EnrollSerializer

class MentorCourseView(generics.DestroyAPIView):
    queryset = MentorCourses.objects.all()
    serializer_class = MentorCourseSerializer

@api_view(['GET','POST'])
def EnrolledCoursesList(request,user_id):
    if request.method == 'GET':
        try:
            enrolls = EnrolledCourse.objects.filter(user = user_id)
            if not enrolls:
                return Response({'message':'No courses for this mentor'})
            serializer = EnrollSerializer(enrolls, many = True)
            return Response(serializer.data)
        except Exception as e:
            return Response({'message':str(e)},status= status.HTTP_500_INTERNAL_SERVER_ERROR)



@api_view(['GET','POST'])
def MentorCourseList(request,mentor_id):
    if request.method == 'GET':
        try:
            courses = MentorCourses.objects.filter(mentor = mentor_id)
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
        
