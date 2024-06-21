# Generated by Django 5.0.4 on 2024-06-21 01:10

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('course', '0021_enrolledcourse_vcall_link'),
    ]

    operations = [
        migrations.AlterField(
            model_name='reviewmarks',
            name='mark',
            field=models.IntegerField(validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(50)]),
        ),
    ]
