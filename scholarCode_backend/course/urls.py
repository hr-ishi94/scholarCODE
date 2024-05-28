from django.urls import path
from . import views
from  . import razorpay

urlpatterns = [
    path('enroll/<int:user_id>/',views.EnrolledCoursesList,name="enroll_course"),
    path('mentor/<int:mentor_id>/',views.MentorCourseList,name="mentor_courses"),
    path('mentor/delete/<int:pk>/',views.MentorCourseView.as_view(),name="mentor_courses"),
    path('razorpay_order/',razorpay.PaymentView.as_view(),name='payment_view'),
    path('razorpay_callback/',razorpay.CallbackView.as_view(),name='callback_view')
    
   ]

