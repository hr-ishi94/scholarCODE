# Generated by Django 5.0.4 on 2024-05-11 06:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0006_alter_customuser_first_name_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='course',
            name='category',
            field=models.CharField(max_length=150),
        ),
    ]
