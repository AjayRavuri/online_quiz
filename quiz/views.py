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
			l="<html><head><title>Success</title></head><body><h1 style='color:#fa5432; text-align:center'>Success</h1></body></html>"
			return HttpResponse(l)
		except:
			messages.info(request,'Invalid Credentials')
			return redirect(login)
	return render(request,'login.html')
