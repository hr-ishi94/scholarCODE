# Generated by Django 5.0.4 on 2024-05-05 16:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0002_alter_mentor_profile_img'),
    ]

    operations = [
        migrations.AlterField(
            model_name='mentor',
            name='profile_img',
            field=models.ImageField(null=True, upload_to='mentor/uploads/'),
        ),
    ]