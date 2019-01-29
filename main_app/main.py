from main_app.Team import *

isServing = Player
isReturning = Player
teamServingOrder = []
teamServing = Team
pointWinner: Team
serve = 1
teamAttacking = Team
teamDefeding = Team
defendingPlayer = Player
attackingPlayer = Player
ballInPlay = False
numberOfShotsIP = 0
numberOfRallies  = 0
hitResult = ""
returnResult = ""
firstServeResult = ""
secondServeResult = ""

team1 = Team()
team2 = Team()

game_to = input("Game to? ")

serve_order = []
return_order = []

player1 = team1.player1
player2 = team1.player2
player3 = team2.player1
player4 = team2.player2

server1 = input("First server? ")

if server1 == player1.name:
    serve_order = [player1, player3, player2, player4]
    returning = input("Who is returning? ")
    if returning == player3.name:
        return_order = [player3, player1, player4, player2]
    else:
        return_order = [player4, player2, player3, player1]

elif server1 == player2.name:
    serve_order = [player2, player3, player1, player4]
    returning = input("Who is returning? ")
    if returning == player3.name:
        return_order = [player3, player1, player4, player2]
    else:
        return_order = [player4, player2, player3, player1]

elif server1 == player3.name:
    serve_order = [player3, player1, player4, player2]
    returning = input("Who is returning? ")
    if returning == player1.name:
        return_order = [player1, player3, player2, player4]
    else:
        return_order = [player2, player4, player1, player3]

else:
    serve_order = [player4, player1, player3, player2]
    returning = input("Who is returning? ")
    if returning == player2.name:
        return_order = [player2, player3, player1, player4]
    else:
        return_order = [player1, player4, player2, player3]

isReturning = return_order[0]
isServing = serve_order[0]
intialServer = isServing
teamServingOrder = [team1, team2]
teamServing = team1

while isServing == intialServer & team1.score < game_to:
    server = 1
    isServing.Offensive.FirstServe.total += 1
    firstServeResult = input("P, M, A, IP?")
    if firstServeResult == "P":
        pocket()
        secondServeResult == input("P, M, A, IP?")
        if secondServeResult == "P": pocket()
        elif secondServeResult == "M": miss()
        elif secondServeResult == "A": ace()
        else: inPlay()
    elif firstServeResult == "M":
        miss()
    elif firstServeResult == "A":
        ace()
    else: inPlay()
    
def establishServingOrder ():
    temp = serve_order[1]
    serve_order[1] = serve_order[3]
    serve_order[3] = temp

def establishReturningOrder ():
    temp = return_order[1]
    return_order[1] = return_order[3]
    return_order[3] = temp

def swapReturnerBreak ():
    temp = return_order[0]
    return_order[0] = return_order[2]
    return_order[2] = temp
    temp = return_order[1]
    return_order[1] = return_order[3]
    return_order[3] = temp

    #return rO[0];

def swapServingTeam ():
    temp = serve_order[0]
    serve_order[0] = serve_order[1]
    serve_order[1] = temp
    #return sO[0]

def swapReturner  ():
    temp = return_order.copy()
    return_order[3] = temp[0]
    for i in range(3):
        return_order[i] = temp[i + 1]
    #return rO[0]

def swapServer  ():
    temp = serve_order.copy()
    serve_order[3] = temp[0]
    for i in range(3):
        serve_order[i] = temp[i + 1]
    #return sO[0]

# Called on pocket serve
def pocket ():
    if serve == 1: 
        isServing.Offense.SecondServe.total += 1
        isServing.Offense.FirstServe.pockets += 1
        serve += 1
    else:
        miss()

    print(isServing.name + " pocket")

# Called on missed serve
def miss ():
    pointWinner = teamServingOrder[1]

# Called on Ace
def ace (): 
    if serve == 1:
        isServing.ace()
    else: 
        isServing.sace()
    isReturning.numberOfTimesAced += 1
    isReturning.numberOfBreaksWhenReturning += 1
    pointWinner = teamServing

# Start ball in play
def inPlay (): 
    if serve == 1:
        isServing.firstServesOn += 1
    else :
        isServing.secondServeMade += 1
    teamAttacking = teamServingOrder[1]
    teamDefeding = teamServing
    defendingPlayer = isReturning
    ballInPlay = True

def downOn1  ():
    attackingPlayer = defendingPlayer
    attackingPlayer.Offense.down_on1+= 1
    attackingPlayer.Offense.hits_total += 1 
    print(attackingPlayer.name + " down on 1")

def downOn2 ():
    attackingPlayer = swapAttacker(defendingPlayer)
    attackingPlayer.Offense.down_on2 += 1
    attackingPlayer.Offense.hits_total += 1;    
    print(attackingPlayer.name + " down on 2")

def downOn3 ():
    attackingPlayer = defendingPlayer
    attackingPlayer.Offense.hits_total += 1  
    print(attackingPlayer.name + " down on 3")

def kill ():
    attackingPlayer.Offense.hits_on += 1
    attackingPlayer.Offense.kills += 1
    if teamAttacking == teamServing:
        isServing.Offense.num_breaks_on_serve += 1
        isReturning.Defense.num_break_w_returning += 1
    pointWinner = teamAttacking
    ballInPlay = False
    print(attackingPlayer.name + " kill")

def missedHit ():
    if teamDefeding == teamServing: 
        isServing.Offense.num_breaks_on_serve += 1
        isReturning.Defense.num_break_w_returning += 1;
    pointWinner = teamDefeding
    ballInPlay = False

def player1DT ():
    attackingPlayer.Offense.hits_on += 1
    numberOfShotsIP += 1
    temp = teamAttacking
    teamAttacking = teamDefeding
    teamDefeding = temp
    defendingPlayer = teamAttacking.player1
    defendingPlayer.Defense.def_ts += 1
    if serve == 1 & teamAttacking == teamServing & numberOfShotsIP == 1:
        isServing.Defense.t_on_first += 1
    elif serve == 2 & teamAttacking == teamServing & numberOfShotsIP == 1:
        isServing.Defense.t_on_second += 1
    print( defendingPlayer.name + " DT")

def player2DT ():
    attackingPlayer.Offense.hits_on += 1
    numberOfShotsIP += 1
    temp = teamAttacking
    teamAttacking = teamDefeding
    teamDefeding = temp
    defendingPlayer = teamAttacking.player2
    defendingPlayer.Defense.def_ts += 1
    if serve == 1 & teamAttacking == teamServing & numberOfShotsIP == 1:
        isServing.Defense.t_on_first += 1
    elif serve == 2 & teamAttacking == teamServing & numberOfShotsIP == 1:
        isServing.Defense.t_on_second += 1
    print( defendingPlayer.name + " DT")

def swapAttacker (rp: Player):
    if defendingPlayer == teamDefeding.player1:
        return teamDefeding.player2
    elif defendingPlayer == teamDefeding.player2:
        return teamDefeding.player1
    else:
        return teamAttacking.player1

def notReturned ():
    if teamAttacking != teamServing :
        isServing.numberOfBreaksOnServe += 1
        isReturning.numberOfBreaksWhenReturning += 1
    pointWinner = teamDefeding
    ballInPlay = False

def getNumberOfAces (data):
    result = 0
    for i in range (4):
       result += data[i].Offense.FirstServe.aces
       result += data[i].Offense.SecondServe.aces
    return result














