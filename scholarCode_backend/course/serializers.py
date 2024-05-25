from rest_framework import serializers
from .models import *
from main.serializers import *

class MentorCourseSerializer(serializers.ModelSerializer):
    # course = CourseSerializer()

    class Meta:
        model = MentorCourses
        fields = ['id','mentor','course']
        
class EnrollSerializer(serializers.ModelSerializer):
    course = MentorCourseSerializer()
    
    class Meta:
        model = EnrolledCourse
        fields='__all__'
