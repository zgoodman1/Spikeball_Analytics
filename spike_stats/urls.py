from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='spike_stats-home'),
    path('about/', views.about, name='spike_stats-about'),
]
