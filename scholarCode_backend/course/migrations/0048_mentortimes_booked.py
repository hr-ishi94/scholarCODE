# Generated by Django 5.0.4 on 2024-07-24 02:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('course', '0047_alter_mentortimes_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='mentortimes',
            name='booked',
            field=models.BooleanField(default=False),
        ),
    ]