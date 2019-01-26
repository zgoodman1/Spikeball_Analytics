from main_app.Team import *

team1 = Team()
team2 = Team()

game_to = input("Game to? ")

server1 = input("First server? ")
server2 = input("Second server? ")
serve_order = []

if server1 == team1.player1.name and server2 == team2.player1.name:

    serve_order = [team1.player1.name, team2.player1.name, team1.player2.name, team2.player2.name]

elif server1 == team1.player1.name and server2 == team2.player2.name:

    serve_order = [team1.player1.name, team2.player2.name, team1.player2.name, team2.player1.name]

elif server1 == team1.player2.name and server2 == team2.player1.name:

    serve_order = [team1.player2.name, team2.player1.name, team1.player1.name, team2.player2.name]

elif server1 == team1.player2.name and server2 == team2.player2.name:

    serve_order = [team1.player2.name, team2.player2.name, team1.player1.name, team2.player1.name]
#######################################
elif server1 == team2.player1.name and server2 == team1.player1.name:

    serve_order = [team2.player1.name, team1.player1.name, team2.player2.name, team1.player2.name]

elif server1 == team2.player1.name and server2 == team1.player2.name:

    serve_order = [team2.player1.name, team1.player2.name, team2.player2.name, team1.player1.name]

elif server1 == team2.player2.name and server2 == team1.player1.name:

    serve_order = [team2.player2.name, team1.player1.name, team2.player1.name, team1.player2.name]

else:

    serve_order = [team2.player2.name, team1.player2.name, team2.player1.name, team1.player1.name]
