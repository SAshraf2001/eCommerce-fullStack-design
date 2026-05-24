from django.urls import path
from ecommApp import views
urlpatterns = [
    path('', views.ecView, name='ecView')
]
