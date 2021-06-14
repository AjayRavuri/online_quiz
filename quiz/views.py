from django.shortcuts import render,redirect
from django.http import HttpResponse,HttpResponseRedirect
from .models import *
from django.contrib import messages
from random import randint
from json import dumps

# Create your views here.
def login(request):
	if request.method=='POST':
		user=request.POST['email']
		pwd=request.POST['password']
		try:
			data=User.objects.get(mail=user,password=pwd)
			if data.attempts > 0:
				return render(request,'instructions.html',{'data':data})
			else:
				messages.info(request,"You are out of attempts")
				return redirect(login)
		except:
			messages.info(request,'Invalid Credentials')
			return redirect(login)
	return render(request,'login.html')

def instructions(request):
	return render(request,'instructions.html')

def quiz(request,id):
	data1 = User.objects.get(mail=id)
	if data1.attempts > 0:
		data1.attempts-=1
		data1.save()
		c=0
		data,d=[],[]
		while(c!=10):
			j=randint(1,20)
			if j in d:
				continue
			else:
				d.append(j)
				var = Question.objects.get(id=j)
				c+=1
				di = {'question':str(c)+". "+var.question,'choices':[var.op1,var.op2,var.op3,var.op4],'correctAnswer': int(var.correct[-1])-1}
				data.append(di)
		data=dumps(data)
		return render(request,'quiz.html',{'data':data,'data1':data1})
	else:
		return render(request,'thanks.html',{'data1':data1})

def thanks(re,id):
	data = User.objects.get(mail=id)
	return render(re,'thanks.html',{'data1':data})

def update(request,id):
	data = User.objects.get(mail=id)
	if request.method=='GET':
		if 'correctAnswers' in request.GET :
			if int(request.GET['correctAnswers']) == -1:
				data.attempts = 0
				if data.grade == 'NA':
					data.grade = 'F'
			elif data.marks_secured <= int(request.GET['correctAnswers']) :
				data.marks_secured = int(request.GET['correctAnswers'])
				if data.marks_secured > 5:
					data.grade = 'P'
				else:
					data.grade = 'F'
	data.save()
	return HttpResponseRedirect('/')
