from django.urls import path
from . import views

urlpatterns = [
    
    path('api/token/user/',views.UserTokenObtainPairView.as_view(), name='user_token_obtain_pair'),
    path('api/token/mentor/',views.MentorTokenObtainPairView.as_view(), name = 'mentor_token_obtain_pair'),
    path('api/token/admin/',views.AdminTokenObtainPairView.as_view(),name='admin_token_obtain_pair'),
    # mentors
    path('mentors/', views.MentorList.as_view(),name='mentor_list'),
    path('mentor/<int:pk>/', views.MentorDetail.as_view(),name='mentor_details'),
    # users
    path('users/',views.UserList.as_view(), name= 'user_list'),
    path('user/<int:pk>/', views.UserDetail.as_view(),name='user_details'),
    # categories
    path('categories/',views.Categories.as_view(), name= 'categories'),
    path('category/<int:pk>/', views.CategoryList.as_view(),name='categoryList'),
    # courses
    path('courses/',views.CoursesList.as_view(), name= 'coursesList'),
    path('course/<int:pk>/', views.CourseDetail.as_view(),name='courseDetails'),
    # tasks
    path('tasks/',views.TaskList.as_view(), name= 'TaskList'),
]