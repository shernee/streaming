# Generated by Django 4.1.1 on 2022-12-02 00:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("app_split", "0009_group_end_date_alter_payment_amount_paid"),
    ]

    operations = [
        migrations.RenameField(
            model_name="group",
            old_name="end_date",
            new_name="subscription_end_date",
        ),
        migrations.AddField(
            model_name="group",
            name="subscription_start_date",
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]