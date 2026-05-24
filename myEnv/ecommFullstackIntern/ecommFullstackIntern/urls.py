
from django.contrib import admin
from django.urls import path,include
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth', include('authLogin.urls')),
    path('ecom', include('ecommApp.urls'))
]
