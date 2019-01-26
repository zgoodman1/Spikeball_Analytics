from main_app.player import Player


class Team:
    name = ""
    score = 0
    player1 = Player
    player2 = Player

    def __init__(self):
        self.name = input("Team name? ")
        self.player1 = Player(input("Player 1 name? "))
        self.player2 = Player(input("Player 2 name? "))
