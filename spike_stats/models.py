from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User

class Game(models.Model):
    game = models.CharField(max_length=10)
    score = models.CharField(max_length=10)
    date_played = models.DateField(default=timezone.now)
    creator = models.ForeignKey(User, on_delete=models.CASCADE)
    player1 = models.CharField(max_length=20)
    player2 = models.CharField(max_length=20)
    player3 = models.CharField(max_length=20)
    player4 = models.CharField(max_length=20)

    
    

