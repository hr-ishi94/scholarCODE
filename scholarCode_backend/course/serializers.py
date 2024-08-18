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
    class Meta:
        model = EnrolledCourse
        fields='__all__'

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

class AdminWalletSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdminWallet
        fields = '__all__'


class ReviewMarkSerializer(serializers.ModelSerializer):
    # user = UserSerializer()

    class Meta:
        model = ReviewMarks
        fields = '__all__'


class MentorWalletSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Mentor_wallet
        fields = '__all__'


class MentorTransactionSerializer(serializers.ModelSerializer):
    mentor_wallet = MentorWalletSerializer(read_only = True)
    class Meta:
        model = MentorTransaction
        fields = '__all__'


class FeedbackSerializer(serializers.ModelSerializer):
    course = serializers.PrimaryKeyRelatedField(queryset=MentorCourses.objects.all())
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    
    class Meta:
        model = UserFeedback
        fields = '__all__'

