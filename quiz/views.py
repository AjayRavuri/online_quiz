from django.shortcuts import render,redirect
from django.http import HttpResponse
from .models import *
from django.contrib import messages

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
