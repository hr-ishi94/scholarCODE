# Generated by Django 5.0.4 on 2024-06-21 08:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('course', '0025_alter_enrolledcourse_unique_together_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='mentortimes',
            name='time',
            field=models.TimeField(),
        ),
    ]