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

    # def update(self, instance, validated_data):
    #     instance.certificate = validated_data.get('certificate', instance.certificate)
    #     instance.save()
    #     return instance

class AllEnrollSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    course = MentorCourseSerializer()

    class Meta:
        model = EnrolledCourse
        fields = '__all__'


class RazorpaySerializer(serializers.ModelSerializer):
    class Meta:
        model = RazorpayPayment
        fields = '__all__'


class TransactionSerializer(serializers.ModelSerializer):
    # user = UserSerializer()
    # payment = RazorpaySerializer()
    class Meta:
        model = Transaction
        fields = '__all__'


class ReviewMarkSerializer(serializers.ModelSerializer):
    # user = UserSerializer()

    class Meta:
        model = ReviewMarks
        fields = '__all__'