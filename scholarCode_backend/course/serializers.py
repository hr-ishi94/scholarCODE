from rest_framework import serializers
from .models import *
from main.serializers import *
import datetime

class MentorCourseSerializer(serializers.ModelSerializer):

    class Meta:
        model = MentorCourses
        fields = ['id','mentor','course']
        
class EnrollSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = EnrolledCourse
        fields='__all__'

