from django.db import models

# Create your models here.

class APIModel(models.Model):
    message = models.TextField()
    