from django.contrib import admin
from .models import *
# Register your models here.
admin.site.register(MentorCourses)
admin.site.register(EnrolledCourse)
admin.site.register(RazorpayPayment)
admin.site.register(MentorTimes)
admin.site.register(ReviewMarks)
admin.site.register(Transaction)
admin.site.register(Mentor_wallet)
admin.site.register(AdminWallet)
admin.site.register(MentorTransaction)
admin.site.register(UserFeedback)

