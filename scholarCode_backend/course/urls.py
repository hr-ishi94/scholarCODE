from django.urls import path
from . import views
from  . import razorpay

urlpatterns = [
    path('enrolls/',views.EnrolledCoursesList,name="enroll_course"),
    path('enroll/<int:user_id>/',views.EnrolledCoursesUser,name="enroll_course"),
    path('mentor/',views.MentorCourseList,name="mentor_courses"),
    path('mentor/delete/<int:pk>/',views.MentorCourseView.as_view(),name="mentor_courses"),
    path('razorpay_order/',razorpay.PaymentView.as_view(),name='payment_view'),
    path('razorpay_callback/',razorpay.CallbackView.as_view(),name='callback_view'),
    path('razorpay_tran_ids/',views.razorpay_order_id, name="all_payments"),
    path('transactions/',views.Transactions.as_view(),name = 'all_transactions'),
    path('review_marks/',views.ReviewMarkView.as_view(),name='review_marks'),
    path('upload/',views.IssueCertificate.as_view(),name='upload'),
    path('mentor_timings/<int:mentor_id>/',views.mentorTimings, name='mentor_dtimings')
   ]

