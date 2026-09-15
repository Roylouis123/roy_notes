from django.http import HttpResponse
from django.shortcuts import render

def aboutUS(request):
    return HttpResponse("Welcome to royworld")

def home(request):
    data={
        'title':'royston'
    }
    return render(request, 'index.html',data)