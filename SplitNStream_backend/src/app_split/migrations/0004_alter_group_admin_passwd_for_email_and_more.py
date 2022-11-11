# Generated by Django 4.1.1 on 2022-11-11 07:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("app_split", "0003_remove_user_rating_alter_group_stage"),
    ]

    operations = [
        migrations.AlterField(
            model_name="group",
            name="admin_passwd_for_email",
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name="group",
            name="subscription_email",
            field=models.EmailField(blank=True, max_length=254, null=True),
        ),
        migrations.AlterField(
            model_name="group",
            name="subscription_password",
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
    ]
