from django.shortcuts import render
from django.http import HttpResponse, HttpRequest, HttpResponseNotAllowed
from django.views import View

# Create your views here.


def api_sign_in(request: HttpRequest):
    if request.method != "POST":
        return HttpResponseNotAllowed(["POST"])
    print(request.)

    return HttpResponse()
