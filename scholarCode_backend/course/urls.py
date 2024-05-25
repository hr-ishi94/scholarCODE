from django.urls import path
from . import views

urlpatterns = [
    path('enroll/<int:user_id>/',views.EnrolledCoursesList,name="enroll_course"),
    path('mentor/<int:mentor_id>/',views.MentorCourseList,name="mentor_courses"),
    path('mentor/delete/<int:pk>/',views.MentorCourseView.as_view(),name="mentor_courses"),
]

