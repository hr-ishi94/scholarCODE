# Generated by Django 5.0.4 on 2024-05-29 08:54

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('course', '0010_mentorcourses_status'),
    ]

    operations = [
        migrations.RenameField(
            model_name='mentorcourses',
            old_name='status',
            new_name='courseStatus',
        ),
    ]
