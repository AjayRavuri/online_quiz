from django.shortcuts import render,redirect
from django.http import HttpResponse
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
			return render(request,'instructions.html',{'data':data})
		except:
			messages.info(request,'Invalid Credentials')
			return redirect(login)
	return render(request,'login.html')

def instructions(request):
	return render(request,'instructions.html')

def quiz(request,id):
	c=0
	data,d=[],[]
	while(c!=10):
		j=randint(1,20)
		if j in d:
			continue
		else:
			d.append(j)
			var =Question.objects.get(id=j)
			c+=1
			di = {'question':str(c)+". "+var.question,'choices':[var.op1,var.op2,var.op3,var.op4],'correctAnswer': int(var.correct[-1])-1}
			data.append(di)

	data=dumps(data)
	return render(request,'quiz.html',{'data':data})
