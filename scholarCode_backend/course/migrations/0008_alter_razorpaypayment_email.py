# Generated by Django 5.0.4 on 2024-05-27 14:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('course', '0007_razorpaypayment_alter_enrolledcourse_curr_module_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='razorpaypayment',
            name='email',
            field=models.EmailField(max_length=254),
        ),
    ]
