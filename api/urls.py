from django.urls import path


from . import views

app_name = "api"
urlpatterns = [
    path("signin/", views.api_sign_in, name="signin")
]
