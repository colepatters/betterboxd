from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader

# Create your views here.


def index(request):
    # return HttpResponse("Hello, World! You're at the app index.")
    template = loader.get_template('app/index.html')
    context = {
        "test": "This is some data!"
    }
    return HttpResponse(template.render(context, request))

# def test_view(request):


def sign_in(request):
    template = loader.get_template('app/sign_in.html')
    context = {}
    return HttpResponse(template.render(context, request))
