from django.urls import path
from . import views
from  . import razorpay

urlpatterns = [
    path('enroll/',views.EnrolledCoursesList,name="enroll_course"),
    path('mentor/',views.MentorCourseList,name="mentor_courses"),
    path('mentor/delete/<int:pk>/',views.MentorCourseView.as_view(),name="mentor_courses"),
    path('razorpay_order/',razorpay.PaymentView.as_view(),name='payment_view'),
    path('razorpay_callback/',razorpay.CallbackView.as_view(),name='callback_view'),
    path('review_marks/',views.ReviewMarkView.as_view(),name='review_marks'),
   ]

