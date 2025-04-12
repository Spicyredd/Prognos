from django.urls import path
from .views import APIModelIOView

urlpatterns = [
    path('receive/', APIModelIOView.as_view(), name='get_messages'),
]
