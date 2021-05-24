from django.db import models

# Create your models here.
grade_choices = (
    ("P", "Pass"),
    ("F", "Fail"),
    ("NA", "Not_attempted"),
)

class User(models.Model):
    mail=models.CharField(max_length=50,primary_key=True)
    password=models.CharField(max_length=25)
    marks_secured=models.IntegerField(default=0)
    grade=models.CharField(max_length=2,choices=grade_choices,default="NA")
    attempts=models.IntegerField(default=3)
