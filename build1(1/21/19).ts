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
    dTOn1stServe: number = 0;
    dTon2ndServe: number = 0;
    numberOfDefensiveTouches: number = 0;
    numberOfDefensiveTouchesNotReturned: number = 0;
    downOn2: number = 0;
    hitsOn: number = 0;
    totalHits: number = 0;
    hittingPercentage: number = 0;

    constructor (name: string) {
        this.denotation = name;
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
export let main = async () => {   
let player1 = new Player(await promptString("Player 1 name?"));
let player2 = new Player(await promptString("Player 2 name?"));
let player3 = new Player(await promptString("Player 3 name?"));
let player4 = new Player(await promptString("Player 4 name?"));

let gameTo = await promptNumber("Game to?");
let servingOrder: Player[];
let returningOrder: Player[];
let isReturning: Player;
let isServing: Player;
let whoIsServing = await promptNumber("Who is serving? Player 1 or 2");
if (whoIsServing === 1) {
    // isServing = player1;
    servingOrder = [player1, player3, player2, player4];
} else {
    // isServing = player2;
    servingOrder = [player2, player3, player1, player4];
}
let whoIsReturning = await promptNumber("who is returning? player 3 or 4");
if (whoIsReturning === 3) {
    // isReturning = player3;
    returningOrder = [player3, player1, player4, player2];
} else {
    // isReturning = player4;
    returningOrder =  [player4, player1, player3, player2];

}
isReturning = returningOrder[0];
isServing = servingOrder[0];
let intialServer = isServing;
let team1Score = 0;
let team2Score = 0;

while (isServing === intialServer && team1Score < gameTo) {
    let pointWinner = await promptNumber("Who won the point? team 1 or 2");
    if (pointWinner === 1) {
        team1Score += 1;
        isReturning = swapReturnerBreak(returningOrder);
        print ("Team 1 " + team1Score + " Team 2 " + team2Score);
        print ("Serving: " + isServing.denotation + " Returing:" + isReturning. denotation);
    } else {
        team2Score += 1;
        whoIsServing = await promptNumber("Who is serving player 3 or 4?");
        if (whoIsServing === 3) {
            isServing = swapServer(servingOrder);

        } else {
            establishServingOrder(servingOrder);
            isServing = swapServer(servingOrder);
        }
        
        if (isServing === isReturning) {
            isReturning = swapReturner(returningOrder);
        } else {
            establishReturningOrder(returningOrder);
            isReturning = swapReturner(returningOrder);
        }
        print ("Team 1 " + team1Score + " Team 2 " + team2Score);
        print ("Serving: " + isServing.denotation + " Returing:" + isReturning. denotation);
    }

}


    
};
main();


export let establishServingOrder = (sO: Player[]): void => {
    let temp = sO[0];
    sO[0] = sO[2];
    sO[2] = temp;
};
export let establishReturningOrder = (rO: Player[]): void => {
    let temp = rO[0];
    rO[0] = rO[2];
    rO[2] = temp;
};

export let swapReturnerBreak = (rO: Player[]):Player => {
    let temp = rO[0];
    rO[0] = rO[2];
    rO[2] = temp;
    return rO[0];
};

export let swapReturner = (rO: Player[]):Player => {
    let temp: Player[];
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
    let temp: Player[];
    for (let i = 0; i < 4; i++) {
        temp[i] = sO[i];
    }
    sO[3] = temp[0];
    for (let i = 0; i < 3; i++) {
        sO[i] = temp[i + 1];
    }
    return sO[0];
};