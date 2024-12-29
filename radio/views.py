from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def index(request):
    return render(request, 'radio/index.html')

def play(request):
    return render(request, 'radio/play.html')