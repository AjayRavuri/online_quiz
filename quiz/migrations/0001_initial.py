# Generated by Django 3.2.2 on 2021-05-24 06:03

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('mail', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('password', models.CharField(max_length=25)),
                ('marks_secured', models.IntegerField(default=0)),
                ('grade', models.CharField(choices=[('P', 'Pass'), ('F', 'Fail'), ('NA', 'Not_attempted')], default='NA', max_length=2)),
                ('attempts', models.IntegerField(default=3)),
            ],
        ),
    ]
