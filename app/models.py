from django.db import models


class User(models.Model):
    first_name = models.CharField(max_length=64)
    last_name = models.CharField(max_length=64)

    email = models.EmailField(unique=True)


class UserSession(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    token = models.CharField(max_length=128, null=False)
    expires = models.DateTimeField()
