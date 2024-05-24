# Generated by Django 5.0.4 on 2024-05-23 05:00

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('course', '0002_rename_enrolled_course_enrolledcourse'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='enrolledcourse',
            name='course',
        ),
        migrations.AlterField(
            model_name='enrolledcourse',
            name='mentor',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='course.mentorcourses'),
        ),
    ]
