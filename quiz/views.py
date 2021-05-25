from django.shortcuts import render,redirect
from django.http import HttpResponse
from .models import *

# Create your views here.
def login(request):
    return render(request,'login.html')
