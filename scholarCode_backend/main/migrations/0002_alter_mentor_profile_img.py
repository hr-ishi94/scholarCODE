# Generated by Django 5.0.4 on 2024-05-05 15:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='mentor',
            name='profile_img',
            field=models.ImageField(upload_to='mentor/uploads/'),
        ),
    ]
