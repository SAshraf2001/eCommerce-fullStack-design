from django.urls import path
from authLogin import views

urlpatterns = [
     path('', views.homeView, name='homeView')
]
