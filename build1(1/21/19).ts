import { print, promptNumber, promptString } from "introcs";
class Player {
    denotation: string = "";
    team: string = "";
    firstServesOn: number = 0;
    firstServeTotal: number = 0;
    firstServePercentage: number = 0;
    numberofAces: number = 0;
    numberofPockets:number = 0;
    secondServeTotal: number = 0;
    secondServeMade: number = 0;
    secondServeAces: number = 0;
    secondServePercentage: number = 0;
    numberOfBreaksOnServe:number = 0;
    numberOfTimesAced: number = 0;
    numberOfBreaksWhenReturning: number = 0;
    dTOn1stServe: number = 0;
    dTon2ndServe: number = 0;
    numberOfDefensiveTouches: number = 0;
    numberOfDefensiveTouchesNotReturned: number = 0;
    downOn1: number = 0;
    downOn2: number = 0;
    hitsOn: number = 0;
    kills: number = 0;
    totalHits: number = 0;
    hittingPercentage: number = 0;
    killPercentage: number = 0;

    constructor (name: string) {
        this.denotation = name;
    }

    ace() {
        this.numberofAces += 1;
        this.numberOfBreaksOnServe += 1;
        this.firstServesOn += 1;
        print(this.denotation + " ace");
    }
    sace() {
        this.secondServeAces += 1;
        this.numberOfBreaksOnServe += 1;
        this.secondServeMade += 1;
        print(this.denotation + " sace");
    }
    calc() {
        this.firstServePercentage = (this.firstServesOn / this.firstServeTotal) * 100;
        this.hittingPercentage = (this.hitsOn / this.totalHits ) * 100;
        this.secondServePercentage = (this.secondServeMade / this. secondServeTotal) * 100;
        this.killPercentage = (this.kills / this.totalHits) * 100;
    }



}
class Team {
    name: string = "";
    score: number = 0;
    player1: Player;
    player2: Player;

    constructor (n:string) {
        this.name = n;
    }
}

class Point {
    score: string = "";
    server: string = "";
    returner: string = "";
    ace: boolean = false;
    pocket: boolean = false;
    miss: boolean = false;
    secondServe: boolean = false;
    secondAce: boolean = false;
    secondMiss: boolean = false;
    attacker: string = "";
    attackOnNet: boolean = false;
    defensiveTouch: boolean = false;
    whoDT: string = "";
    dTOn: boolean = false;
    winner: string = "";

}
let isServing: Player;
let servingOrder: Player[];
let returningOrder: Player[];
let isReturning: Player;
let teamServingOrder: Team[];
let teamServing: Team;
let pointWinner: Team;
let serve: number = 1;
let teamAttacking: Team;
let teamDefeding: Team;
let defendingPlayer: Player;
let attackingPlayer: Player;
let ballInPlay: boolean;
let numberOfShotsIP: number = 0;
let numberOfRallies: number = 0;

export let main = async () => {   
let team1 = new Team(await promptString("Team 1 name?"));
let player1 = new Player(await promptString("Player 1 name?"));
let player2 = new Player(await promptString("Player 2 name?"));
team1.player1 = player1;
team1.player2 = player2;

let team2 = new Team(await promptString("Team 2 name?"));
let player3 = new Player(await promptString("Player 3 name?"));
let player4 = new Player(await promptString("Player 4 name?"));
team2.player1 = player3;
team2.player2 = player4;

let gameTo = await promptNumber("Game to?");

let whoIsServing = await promptNumber("Who is serving? Player 1 or 2");
if (whoIsServing === 1) {

    servingOrder = [player1, player3, player2, player4];
    let whoIsReturning = await promptNumber("who is returning? player 3 or 4");
    if (whoIsReturning === 3) {
    returningOrder = [player3, player1, player4, player2];
}   else {
    returningOrder =  [player4, player1, player3, player2];
    }
} else {
    servingOrder = [player2, player3, player1, player4];
    let whoIsReturning = await promptNumber("who is returning? player 3 or 4");
    if (whoIsReturning === 3) {
    returningOrder = [player3, player2, player4, player1];
}   else {
    returningOrder =  [player4, player2, player3, player1];
    }
}
isReturning = returningOrder[0];
isServing = servingOrder[0];
let intialServer = isServing;
teamServingOrder = [team1, team2];
teamServing = team1;

while (isServing === intialServer && team1.score < gameTo) {
    serve = 1;
    isServing.firstServeTotal += 1;
    let firstServeResult = await promptString("P, M, A, IP?");
    if ( firstServeResult === "P") {
        pocket();
        let secondServeResult = await promptString("P, M, A, IP?");
        if (secondServeResult === "P") {
            pocket();
        } else if ( secondServeResult === "M") {
            miss();
        } else if ( secondServeResult === "A") {
            ace();
        }
    } else if ( firstServeResult === "M") {
        miss();
    } else if ( firstServeResult === "A") {
        ace();
    } else {
        inPlay();
        while (ballInPlay === true) {
            let returnResult = await promptString("D1, D2, D3, NH?");
            if (returnResult === "D1") {
                downOn1();
                let hitResult = await promptString("K, M, DT?");
                if (hitResult === "K") {kill(); } else 
                if (hitResult === "M") {missedHit(); } else  
                if (hitResult === "DT1" || "1" || teamDefeding.player1.denotation) {  player1DT();
                    } else {player2DT(); }
            } else if (returnResult === "D2") {
                downOn2();
                let hitResult = await promptString("K, M, DT?");
                if (hitResult === "K") {kill(); } else 
                if (hitResult === "M") {missedHit(); } else {
                    if (hitResult === "DT1" || "1" || teamDefeding.player1.denotation) {  player1DT();
                    } else {player2DT(); }
                        } 
            } else if (returnResult === "D3") {
                downOn3();
                let hitResult = await promptString("K, M, DT1 0r DT2 ?");
                if (hitResult === "K") {kill(); } else 
                if (hitResult === "M") {missedHit(); } else {
                if (hitResult === "DT1" || "1" || teamDefeding.player1.denotation) {  player1DT();
                } else {
                    player2DT();
                }
                } 
            } else { notReturned(); }
        }

    }
    if (pointWinner === team1) {
        team1.score += 1;
        isReturning = swapReturnerBreak(returningOrder);
        print (team1.name + " " + team1.score + " " + team2.name + " " + team2.score);
        print ("Serving: " + isServing.denotation + " Returning:" + isReturning. denotation);
    } else {
        team2.score += 1;
        whoIsServing = await promptNumber("Who is serving player 3 or 4?");
        
        if (whoIsServing === 3) {
            isServing = swapServer(servingOrder);
        } else {
            establishServingOrder(servingOrder);
            isServing = swapServer(servingOrder);
        }
        isReturning = swapReturner(returningOrder);
        print (team1.name + " " + team1.score + " " + team2.name + " " + team2.score);
        print ("Serving: " + isServing.denotation + " Returning:" + isReturning. denotation);
        teamServing = swapServingTeam(teamServingOrder);
    }

}
while ((team1.score < gameTo && team2.score < gameTo) || ((team1.score - team2.score) < 2 && (
    (team1.score - team2.score) > 0) || ((team2.score - team1.score) < 2 && (
        (team2.score - team1.score) > 0)  ))) {
    serve = 1;
    numberOfShotsIP = 0;
    isServing.firstServeTotal += 1;
    let firstServeResult = await promptString("P, M, A, IP?");
    if ( firstServeResult === "P") {
        pocket();
        let secondServeResult = await promptString("P, M, A, IP?");
        if (secondServeResult === "P") {
            pocket();
        } else if ( secondServeResult === "M") {
            miss();
        } else if ( secondServeResult === "A") {
            ace();
        }
    } else if ( firstServeResult === "M") {
        miss();
    } else if ( firstServeResult === "A") {
        ace();
    } else {
        inPlay();
        while (ballInPlay === true) {
            let returnResult = await promptString("D1, D2, D3, NH?");
            if (returnResult === "D1") {
                downOn1();
                let hitResult = await promptString("K, M, DT?");
                if (hitResult === "K") {kill(); } else 
                if (hitResult === "M") {missedHit(); } else  
                if (hitResult === "DT1" || "1" || teamDefeding.player1.denotation) {  player1DT();
                    } else {player2DT(); }
            } else if (returnResult === "D2") {
                downOn2();
                let hitResult = await promptString("K, M, DT?");
                if (hitResult === "K") {kill(); } else 
                if (hitResult === "M") {missedHit(); } else {
                    if (hitResult === "DT1" || "1" || teamDefeding.player1.denotation) {  player1DT();
                    } else {player2DT(); }
                        } 
            } else if (returnResult === "D3") {
                downOn3();
                let hitResult = await promptString("K, M, DT1 0r DT2 ?");
                if (hitResult === "K") {kill(); } else 
                if (hitResult === "M") {missedHit(); } else {
                if (hitResult === "DT1" || "1" || teamDefeding.player1.denotation) {  player1DT();
                } else {
                    player2DT();
                }
                } 
            } else { notReturned(); }
        }

    }
    if (pointWinner === team1 && teamServing === team1) {
        team1.score += 1;
        isReturning = swapReturnerBreak(returningOrder);
        print (team1.name + " " + team1.score + " " + team2.name + " " + team2.score);
        print ("Serving: " + isServing.denotation + " Returning:" + isReturning. denotation);
    } else if (pointWinner === team1 && teamServing === team2) {
        team1.score += 1;
        isServing = swapServer(servingOrder);
        if (isServing === isReturning) {
            isReturning = swapReturner(returningOrder);
            print (team1.name + " " + team1.score + " " + team2.name + " " + team2.score);
            print ("Serving: " + isServing.denotation + " Returning:" + isReturning. denotation);
            teamServing = swapServingTeam(teamServingOrder);
        } else {
            isReturning = swapReturner(returningOrder);
            print (team1.name + " " + team1.score + " " + team2.name + " " + team2.score);
            print ("Serving: " + isServing.denotation + " Returning:" + isReturning. denotation);
            teamServing = swapServingTeam(teamServingOrder);
        }
    } 
    if (pointWinner === team2 && teamServing === team2) {
        team2.score += 1;
        isReturning = swapReturnerBreak(returningOrder);
        print (team1.name + " " + team1.score + " " + team2.name + " " + team2.score);
        print ("Serving: " + isServing.denotation + " Returning:" + isReturning. denotation);
    } else if (pointWinner === team2 && teamServing === team1) {
        team2.score += 1;
        isServing = swapServer(servingOrder);
        if (isServing === isReturning) {
            isReturning = swapReturner(returningOrder);
            print (team1.name + " " + team1.score + " " + team2.name + " " + team2.score);
            print ("Serving: " + isServing.denotation + " Returning:" + isReturning. denotation);
            teamServing = swapServingTeam(teamServingOrder);
        } else {
            isReturning = swapReturner(returningOrder);
            print (team1.name + " " + team1.score + " " + team2.name + " " + team2.score);
            print ("Serving: " + isServing.denotation + " Returning:" + isReturning. denotation);
            teamServing = swapServingTeam(teamServingOrder);
        }
    }   
    if (numberOfShotsIP > 2) {
        numberOfRallies += 1;
    }
}

for (let i = 0; i < 4; i++) {
    servingOrder[i].calc();
    print(servingOrder[i]);
}
print("Number of Rallies " + numberOfRallies);
print("Number of Aces " + getNumberOfAces(servingOrder));
};
main();



export let establishServingOrder = (sO: Player[]): void => {
    let temp = sO[1];
    sO[1] = sO[3];
    sO[3] = temp;
};
export let establishReturningOrder = (rO: Player[]): void => {
    let temp = rO[1];
    rO[1] = rO[3];
    rO[3] = temp;
};

export let swapReturnerBreak = (rO: Player[]):Player => {
    let temp = rO[0];
    rO[0] = rO[2];
    rO[2] = temp;
    temp = rO[1];
    rO[1] = rO[3];
    rO[3] = temp;

    return rO[0];
};

export let swapServingTeam = (sO: Team[]):Team => {
    let temp = sO[0];
    sO[0] = sO[1];
    sO[1] = temp;
    return sO[0];
};

export let swapReturner = (rO: Player[]):Player => {
    let temp: Player[] = [];
    for (let i = 0; i < 4; i++) {
        temp[i] = rO[i];
    }
    rO[3] = temp[0];
    for (let i = 0; i < 3; i++) {
        rO[i] = temp[i + 1];
    }
    return rO[0];
};

export let swapServer = (sO: Player[]): Player => {
    let temp: Player[] = [];
    for (let i = 0; i < 4; i++) {
        temp[i] = sO[i];
    }
    sO[3] = temp[0];
    for (let i = 0; i < 3; i++) {
        sO[i] = temp[i + 1];
    }
    return sO[0];
};
// Called on pocket serve
export let pocket = ():void => {
    if (serve === 1) {
    isServing.secondServeTotal += 1;
    isServing.numberofPockets += 1;
    serve += 1;
    } else {
        miss();
    }
    print(isServing.denotation + " pocket");
};

// Called on missed serve
export let miss = ():void => {
    pointWinner = teamServingOrder[1];
};

// Called on Ace
export let ace = (): void => {
    if (serve === 1) {
        isServing.ace();
    } else {
        isServing.sace();
    }
    isReturning.numberOfTimesAced += 1;
    isReturning.numberOfBreaksWhenReturning += 1;
    pointWinner = teamServing;
};

// Start ball in play
export let inPlay = (): void => {
    if (serve === 1) {
        isServing.firstServesOn += 1;
    } else { 
        isServing.secondServeMade += 1;
    }
    teamAttacking = teamServingOrder[1];
    teamDefeding = teamServing;
    defendingPlayer = isReturning;
    ballInPlay = true;
};

export let downOn1 = ():void => {
    attackingPlayer = defendingPlayer;
    attackingPlayer.downOn1 += 1;
    attackingPlayer.totalHits += 1;    
    print(attackingPlayer.denotation + " down on 1");
};
export let downOn2 = ():void => {
    attackingPlayer = swapAttacker(defendingPlayer);
    attackingPlayer.downOn2 += 1;
    attackingPlayer.totalHits += 1;    
    print(attackingPlayer.denotation + " down on 2");
};
export let downOn3 = ():void => {
    attackingPlayer = defendingPlayer;
    attackingPlayer.totalHits += 1;    
    print(attackingPlayer.denotation + " down on 3");
};
export let kill = (): void => {
    attackingPlayer.hitsOn += 1;
    attackingPlayer.kills += 1;
    if (teamAttacking === teamServing) {
        isServing.numberOfBreaksOnServe += 1;
        isReturning.numberOfBreaksWhenReturning += 1;
    }
    pointWinner = teamAttacking;
    ballInPlay = false;
    print(attackingPlayer.denotation + " kill");
};

export let missedHit = (): void => {
    if (teamDefeding === teamServing) {
        isServing.numberOfBreaksOnServe += 1;
        isReturning.numberOfBreaksWhenReturning += 1;
    }
    pointWinner = teamDefeding;
    ballInPlay = false;
};
export let player1DT = ():void => {
    attackingPlayer.hitsOn += 1;
    numberOfShotsIP += 1;
    let temp: Team;
    temp = teamAttacking;
    teamAttacking = teamDefeding;
    teamDefeding = temp;
    defendingPlayer = teamAttacking.player1;
    defendingPlayer.numberOfDefensiveTouches += 1;
    if (serve === 1 && teamAttacking === teamServing && numberOfShotsIP === 1) {
        isServing.dTOn1stServe += 1;
    } else  if (serve === 2 && teamAttacking === teamServing && numberOfShotsIP === 1) {
        isServing.dTon2ndServe += 1;
    }
    print( defendingPlayer.denotation + " DT");
};

export let player2DT = ():void => {
    attackingPlayer.hitsOn += 1;
    numberOfShotsIP += 1;
    let temp: Team;
    temp = teamAttacking;
    teamAttacking = teamDefeding;
    teamDefeding = temp;
    defendingPlayer = teamAttacking.player2;
    defendingPlayer.numberOfDefensiveTouches += 1;
    if (serve === 1 && teamAttacking === teamServing && numberOfShotsIP === 1) {
        isServing.dTOn1stServe += 1;
    } else  if (serve === 2 && teamAttacking === teamServing && numberOfShotsIP === 1) {
        isServing.dTon2ndServe += 1;
    }
    print( defendingPlayer.denotation + " DT");
};

export let swapAttacker = (rp: Player): Player => {
    if (defendingPlayer === teamDefeding.player1) {
        return teamDefeding.player2;
    } else if (defendingPlayer === teamDefeding.player2) {
        return teamDefeding.player1;
    } else {
        return teamAttacking.player1;
    }
};

export let notReturned = ():void => {
    if (teamAttacking !== teamServing) {
        isServing.numberOfBreaksOnServe += 1;
        isReturning.numberOfBreaksWhenReturning += 1;
    }
    pointWinner = teamDefeding;
    ballInPlay = false;
};

export let getNumberOfAces = (data: Player[]): number => {
    let result = 0;
    for (let i = 0; i < 4; i++) {
       result += data[i].numberofAces;
       result += data[i].secondServeAces;
    }
    return result;
};
