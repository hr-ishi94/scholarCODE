# Generated by Django 5.0.4 on 2024-06-28 09:27

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('course', '0032_alter_enrolledcourse_unique_together_and_more'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='enrolledcourse',
            unique_together={('next_review_date', 'review_time')},
        ),
    ]
