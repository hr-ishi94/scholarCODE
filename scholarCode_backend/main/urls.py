from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

urlpatterns = [
    
    path('api/token/user/',views.UserTokenObtainPairView.as_view(), name='user_token_obtain_pair'),
    path('api/token/mentor/',views.MentorTokenObtainPairView.as_view(), name = 'mentor_token_obtain_pair'),
    path('api/token/admin/',views.AdminTokenObtainPairView.as_view(),name='admin_token_obtain_pair'),
    path('mentors/', views.MentorList.as_view(),name='mentor_list'),
    path('mentors/active/',views.activeMentorList,name = 'active_mentors'),
    path('mentors/request/',views.mentorRequests,name = 'mentors_request'),
    path('mentor/<int:pk>/', views.MentorDetail.as_view(),name='mentor_details'),
    path('users/',views.UserList.as_view(), name= 'user_list'),
    path('user/<int:pk>/', views.UserDetail.as_view(),name='user_details'),
    
]