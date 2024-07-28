# Generated by Django 5.0.4 on 2024-07-27 02:01

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('course', '0054_alter_mentortransaction_transaction_type'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='AdminWallet',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('balance', models.DecimalField(decimal_places=2, default=0.0, max_digits=10)),
                ('admin', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='admin_wallet', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
