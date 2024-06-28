from rest_framework import serializers
from .models import *
from main.serializers import *
import datetime

class MentorCourseSerializer(serializers.ModelSerializer):

    class Meta:
        model = MentorCourses
        fields = ['id','mentor','course']
        


class MentorTimesSerializer(serializers.ModelSerializer):

    class Meta:
        model = MentorTimes
        fields = '__all__'

class EnrollSerializer(serializers.ModelSerializer):
    # next_review_time = MentorTimesSerializer(read_only = True) 
    class Meta:
        model = EnrolledCourse
        fields='__all__'


class ReviewMarkSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReviewMarks
        fields = '__all__'