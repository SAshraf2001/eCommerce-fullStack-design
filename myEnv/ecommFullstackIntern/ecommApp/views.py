from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.

def ecView(request):
    return HttpResponse('Testing EcomApp views.py')