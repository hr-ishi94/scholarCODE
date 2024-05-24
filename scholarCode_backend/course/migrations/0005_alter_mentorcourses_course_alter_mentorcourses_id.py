# Generated by Django 5.0.4 on 2024-05-24 14:47

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('course', '0004_rename_mentor_enrolledcourse_course_and_more'),
        ('main', '0011_remove_mentor_isactive_remove_user_isactive_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='mentorcourses',
            name='course',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='main.course'),
        ),
        migrations.AlterField(
            model_name='mentorcourses',
            name='id',
            field=models.IntegerField(primary_key=True, serialize=False),
        ),
    ]
