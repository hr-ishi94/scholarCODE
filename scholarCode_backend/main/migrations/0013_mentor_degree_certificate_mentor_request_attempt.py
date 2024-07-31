# Generated by Django 5.0.4 on 2024-07-30 11:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0012_task_task_module'),
    ]

    operations = [
        migrations.AddField(
            model_name='mentor',
            name='degree_certificate',
            field=models.FileField(blank=True, null=True, upload_to='mentor/pdfs/'),
        ),
        migrations.AddField(
            model_name='mentor',
            name='request_attempt',
            field=models.IntegerField(blank=True, default=0, null=True),
        ),
    ]