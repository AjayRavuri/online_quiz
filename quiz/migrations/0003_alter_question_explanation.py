# Generated by Django 3.2.2 on 2021-05-27 05:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('quiz', '0002_question'),
    ]

    operations = [
        migrations.AlterField(
            model_name='question',
            name='explanation',
            field=models.CharField(default=None, max_length=250),
        ),
    ]
