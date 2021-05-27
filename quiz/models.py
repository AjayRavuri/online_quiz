from django.db import models
grade_choices = (
    ("P", "Pass"),
    ("F", "Fail"),
    ("NA", "Not_attempted"),
)

question_type_choices=(
    ("MCQ","Single_Correct"),
    ("MSQ","Multiple_Correct"),
)
class User(models.Model):
    mail=models.CharField(max_length=50,primary_key=True)
    password=models.CharField(max_length=25)
    marks_secured=models.IntegerField(default=0)
    grade=models.CharField(max_length=2,choices=grade_choices,default="NA")
    attempts=models.IntegerField(default=3)

class Question(models.Model):
    question=models.CharField(max_length=250)
    op1=models.CharField(max_length=50)
    op2=models.CharField(max_length=50)
    op3=models.CharField(max_length=50)
    op4=models.CharField(max_length=50)
    option_choices=(
        (op1,"option1"),
        (op2,"option2"),
        (op3,"option3"),
        (op4,"option4"),
    )
    correct=models.CharField(max_length=50,choices=option_choices)
    type=models.CharField(max_length=3,choices=question_type_choices,default="MCQ")
    marks=models.IntegerField(default=1)
    explanation=models.CharField(max_length=250,default=None)
