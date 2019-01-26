from main_app.Team import *

team1 = Team()
team2 = Team()

game_to = input("Game to? ")

serve_order = []
return_order = []

player1 = team1.player1.name
player2 = team1.player2.name
player3 = team2.player1.name
player4 = team2.player2.name

server1 = input("First server? ")

if server1 == player1:
    serve_order = [player1, player3, player2, player4]
    returning = input("Who is returning? ")
    if returning == player3:
        return_order = [player3, player1, player4, player2]
    else:
        return_order = [player4, player2, player3, player1]

elif server1 == player2:
    serve_order = [player2, player3, player1, player4]
    returning = input("Who is returning? ")
    if returning == player3:
        return_order = [player3, player1, player4, player2]
    else:
        return_order = [player4, player2, player3, player1]

elif server1 == player3:
    serve_order = [player3, player1, player4, player2]
    returning = input("Who is returning? ")
    if returning == player1:
        return_order = [player1, player3, player2, player4]
    else:
        return_order = [player2, player4, player1, player3]

else:
    serve_order = [player4, player1, player3, player2]
    returning = input("Who is returning? ")
    if returning == player2:
        return_order = [player2, player3, player1, player4]
    else:
        return_order = [player1, player4, player2, player3]














