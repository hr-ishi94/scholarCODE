# Generated by Django 5.0.4 on 2024-06-19 02:11

import course.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('course', '0013_enrolledcourse_review_date'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='enrolledcourse',
            name='review_date',
        ),
        migrations.AddField(
            model_name='enrolledcourse',
            name='next_review_date',
            field=models.DateField(default=course.models.default_review_date),
        ),
    ]
