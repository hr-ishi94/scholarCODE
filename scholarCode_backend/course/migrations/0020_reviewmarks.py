# Generated by Django 5.0.4 on 2024-06-19 10:40

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('course', '0019_alter_enrolledcourse_next_review_time'),
        ('main', '0011_remove_mentor_isactive_remove_user_isactive_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='ReviewMarks',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('module', models.CharField(max_length=100)),
                ('mark', models.IntegerField()),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='course.enrolledcourse')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.user')),
            ],
        ),
    ]
