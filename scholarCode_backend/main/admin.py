from django.contrib import admin
from .models import *
# Register your models here

admin.site.register(Task)
admin.site.register(Module)
admin.site.register(Course)
admin.site.register(Mentor)
admin.site.register(User)
admin.site.register(Category)