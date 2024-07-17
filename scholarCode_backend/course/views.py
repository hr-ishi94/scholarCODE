from django.shortcuts import render
from datetime import datetime
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
            serializer = AllEnrollSerializer(enrolls, many = True)
            return Response(serializer.data)
        except Exception as e:
            return Response({'message':str(e)},status= status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET','POST','PUT','PATCH'])
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
    elif request.method in ['PUT','PATCH']:
        try:       
            data = request.data
            enroll_id = data.get('id')
            mentor = data.get('mentor')
            time = data.get('review_time')
            review_date = data.get('next_review_date')

            try:
                course = EnrolledCourse.objects.get(id = enroll_id , user = user_id )
            except EnrolledCourse.DoesNotExist:
                return Response({'status':'error','message':'Enrollment not found'})
            print(data)

            if time is not None and review_date is not None:
                try:
                    time_dt = datetime.datetime.strptime(time, "%H:%M").time()  # Parse time only
                except ValueError:
                    return Response({'status': 'error', 'message': 'Invalid time format'}, status=status.HTTP_400_BAD_REQUEST)

                # Check if time is not equal to any existing review_time or is at least 30 minutes ahead
                existing_reviews = EnrolledCourse.objects.filter(
                    course__mentor=mentor,
                    next_review_date=review_date
                ).exclude(pk = enroll_id)

                for review in existing_reviews:
                    existing_time = review.review_time
                    print(existing_time,time_dt,'klei')
                    if existing_time == time_dt:
                        return Response({'status': 'error', 'message': 'You already have a review at the same time.'}, status=status.HTTP_400_BAD_REQUEST)
                    if abs((datetime.datetime.combine(datetime.datetime.today(), time_dt) - datetime.datetime.combine(datetime.datetime.today(), existing_time)).total_seconds()) < 1800:
                        return Response({'status': 'error', 'message': 'Review time must be at least 30 minutes apart any of your reviews.'}, status=status.HTTP_400_BAD_REQUEST)
    
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