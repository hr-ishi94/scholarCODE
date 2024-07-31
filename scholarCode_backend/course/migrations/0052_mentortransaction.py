# Generated by Django 5.0.4 on 2024-07-26 06:56

import django.db.models.deletion
import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('course', '0051_alter_mentor_wallet_amount_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='MentorTransaction',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amount', models.DecimalField(decimal_places=2, max_digits=10)),
                ('transaction_type', models.CharField(default='UPI', max_length=10)),
                ('timestamp', models.DateTimeField(default=django.utils.timezone.now)),
                ('mentor_wallet', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='mentor_transactions', to='course.mentor_wallet')),
            ],
        ),
    ]