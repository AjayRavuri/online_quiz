# Generated by Django 3.2.2 on 2021-05-27 05:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('quiz', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Question',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('question', models.CharField(max_length=250)),
                ('op1', models.CharField(max_length=50)),
                ('op2', models.CharField(max_length=50)),
                ('op3', models.CharField(max_length=50)),
                ('op4', models.CharField(max_length=50)),
                ('correct', models.CharField(choices=[(models.CharField(max_length=50), 'option1'), (models.CharField(max_length=50), 'option2'), (models.CharField(max_length=50), 'option3'), (models.CharField(max_length=50), 'option4')], max_length=50)),
                ('type', models.CharField(choices=[('MCQ', 'Single_Correct'), ('MSQ', 'Multiple_Correct')], default='MCQ', max_length=3)),
                ('marks', models.IntegerField(default=1)),
                ('explanation', models.CharField(max_length=250)),
            ],
        ),
    ]
