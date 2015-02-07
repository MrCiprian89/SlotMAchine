var canvas;
var stage: createjs.Stage;

// Game Objects 
var game: createjs.Container;
var background: createjs.Bitmap;
var spinButton: createjs.Bitmap;
var maxBetButton: createjs.Bitmap;
var betTenButton: createjs.Bitmap;
var betOneButton: createjs.Bitmap;
var powerButton: createjs.Bitmap;
var resetButton: createjs.Bitmap;

var creditsText: createjs.Text;
var betText: createjs.Text;
var winText: createjs.Text;
var jackpotText: createjs.Text;


//Game Variables
var playerMoney = 1000;
var winnings = 0;
var jackpot = 5000;
var playerBet = 0;
var spinResult;
var fruits = "";
var grapes = 0;
var bananas = 0;
var oranges = 0;
var cherries = 0;
var bars = 0;
var bells = 0;
var sevens = 0;
var blanks = 0;


function init() {
    canvas = document.getElementById("canvas");
    stage = new createjs.Stage(canvas);
    stage.enableMouseOver(20); // Enable mouse events
    createjs.Ticker.setFPS(60); // 60 frames per second
    createjs.Ticker.addEventListener("tick", gameLoop);
    main();
}

function gameLoop() {
    stage.update(); // Refreshes our stage
}


// Event handlers ###################################################3
function spinButtonClick() {
     if (playerMoney == 0) {
        if (confirm("You ran out of Money! \nDo you want to play again?")) {
            resetAll();
        }
    }
    else if (playerBet <= playerMoney) {
        spinResult = Reels();
        fruits = spinResult[0] + " - " + spinResult[1] + " - " + spinResult[2];
        determineWinnings();
    }
    creditsText.text = playerMoney;
}
function maxBetButtonClick() {
    playerBet = 100;
    betText.text = playerBet;
}
function betOneButtonClick() {
    playerBet = 1;
    betText.text = playerBet;
}
function betTenButtonClick() {
    playerBet = 10;
    betText.text = playerBet;
}
function powerButtonClick() {
}
function resetButtonClick() {
    resetFruitTally();
    resetAll();
}
//UTILITY##########################################################################

/* Utility function to reset all fruit tallies */
function resetFruitTally() {
    grapes = 0;
    bananas = 0;
    oranges = 0;
    cherries = 0;
    bars = 0;
    bells = 0;
    sevens = 0;
    blanks = 0;
}

/* Utility function to reset the player stats */
function resetAll() {
    playerMoney = 1000;
    winnings = 0;
    jackpot = 5000;
    playerBet = 0;
    jackpotText.text = jackpot;
    betText.text = playerBet;
    winText.text = winnings;
    creditsText.text = playerMoney;
}
function checkJackPot() {
    /* compare two random values */
    var jackPotTry = Math.floor(Math.random() * 51 + 1);
    var jackPotWin = Math.floor(Math.random() * 51 + 1);
    if (jackPotTry == jackPotWin) {
        alert("You Won the $" + jackpot + " Jackpot!!");
        playerMoney += jackpot;
        jackpot = 1000;
    }
}
/* Utility function to show a win message and increase player money */
function showWinMessage() {
    playerMoney += winnings;
    resetFruitTally();
    checkJackPot();
    winText.text = winnings;
}
/* Utility function to show a loss message and reduce player money */
function showLossMessage() {
    playerMoney -= playerBet;
    resetFruitTally();
}
/* Utility function to check if a value falls within a range of bounds */
function checkRange(value, lowerBounds, upperBounds) {
    if (value >= lowerBounds && value <= upperBounds) {
        return value;
    }
    else {
        return !value;
    }
}

/* When this function is called it determines the betLine results.
e.g. Bar - Orange - Banana */
function Reels() {
    var betLine = [" ", " ", " "];
    var outCome = [0, 0, 0];

    for (var spin = 0; spin < 3; spin++) {
        outCome[spin] = Math.floor((Math.random() * 65) + 1);
        switch (outCome[spin]) {
            case checkRange(outCome[spin], 1, 27):  // 41.5% probability
                betLine[spin] = "blank";
                blanks++;
                break;
            case checkRange(outCome[spin], 28, 37): // 15.4% probability
                betLine[spin] = "Grapes";
                grapes++;
                break;
            case checkRange(outCome[spin], 38, 46): // 13.8% probability
                betLine[spin] = "Banana";
                bananas++;
                break;
            case checkRange(outCome[spin], 47, 54): // 12.3% probability
                betLine[spin] = "Orange";
                oranges++;
                break;
            case checkRange(outCome[spin], 55, 59): //  7.7% probability
                betLine[spin] = "Cherry";
                cherries++;
                break;
            case checkRange(outCome[spin], 60, 62): //  4.6% probability
                betLine[spin] = "Bar";
                bars++;
                break;
            case checkRange(outCome[spin], 63, 64): //  3.1% probability
                betLine[spin] = "Bell";
                bells++;
                break;
            case checkRange(outCome[spin], 65, 65): //  1.5% probability
                betLine[spin] = "Seven";
                sevens++;
                break;
        }
    }
    return betLine;
}

/* This function calculates the player's winnings, if any */
function determineWinnings() {
    if (blanks == 0) {
        if (grapes == 3) {
            winnings = playerBet * 10;
        }
        else if (bananas == 3) {
            winnings = playerBet * 20;
        }
        else if (oranges == 3) {
            winnings = playerBet * 30;
        }
        else if (cherries == 3) {
            winnings = playerBet * 40;
        }
        else if (bars == 3) {
            winnings = playerBet * 50;
        }
        else if (bells == 3) {
            winnings = playerBet * 75;
        }
        else if (sevens == 3) {
            winnings = playerBet * 100;
        }
        else if (grapes == 2) {
            winnings = playerBet * 2;
        }
        else if (bananas == 2) {
            winnings = playerBet * 2;
        }
        else if (oranges == 2) {
            winnings = playerBet * 3;
        }
        else if (cherries == 2) {
            winnings = playerBet * 4;
        }
        else if (bars == 2) {
            winnings = playerBet * 5;
        }
        else if (bells == 2) {
            winnings = playerBet * 10;
        }
        else if (sevens == 2) {
            winnings = playerBet * 20;
        }
        else if (sevens == 1) {
            winnings = playerBet * 5;
        }
        else {
            winnings = playerBet * 1;
        }
        showWinMessage();
    }
    else {
        showLossMessage();
    }

}

//function to instantiate all game controls for UI
function createUI() {
    //create background
    background = new createjs.Bitmap("assets/images/background.png");
    game.addChild(background);
    //create spin button
    spinButton = new createjs.Bitmap("assets/images/spin_button.png");
    game.addChild(spinButton);
    spinButton.x = 308.7;
    spinButton.y = 346.8;
    spinButton.addEventListener("click", spinButtonClick);
    //create max bet button;
    maxBetButton = new createjs.Bitmap("assets/images/bet_max_button.png");
    game.addChild(maxBetButton);
    maxBetButton.x = 160.3;
    maxBetButton.y = 350.5;
    maxBetButton.addEventListener("click", maxBetButtonClick);
    //create bet one button
    betOneButton = new createjs.Bitmap("assets/images/bet_one_button.png");
    game.addChild(betOneButton);
    betOneButton.x = 118.5;
    betOneButton.y = 338;
    betOneButton.addEventListener("click", betOneButtonClick);
    //create bet ten button
    betTenButton = new createjs.Bitmap("assets/images/bet_ten_button.png");
    game.addChild(betTenButton);
    betTenButton.x = 118.4;
    betTenButton.y = 373.8;
    betTenButton.addEventListener("click", betTenButtonClick);
    //create power button
    powerButton = new createjs.Bitmap("assets/images/power_button.png");
    game.addChild(powerButton);
    powerButton.x = 36.5;
    powerButton.y = 338.5;
    powerButton.addEventListener("click", powerButtonClick);
    //create reset button
    resetButton = new createjs.Bitmap("assets/images/reset_button.png");
    game.addChild(resetButton);
    resetButton.x = 76.5;
    resetButton.y = 338.5;
    resetButton.addEventListener("click", resetButtonClick);
    //create winnings paid label
    winText = new createjs.Text(winnings, "20px Arial", "#ff7700");
    game.addChild(winText);
    winText.x = 229;
    winText.y = 275.5;
    winText.textBaseline = "alphabetic";
    //create bet amount label
    betText = new createjs.Text(playerBet, "20px Arial", "#ff7700");
    game.addChild(betText);
    betText.x = 177;
    betText.y = 275.5;
    betText.textBaseline = "alphabetic";
    //create credit balance label
    creditsText = new createjs.Text(playerMoney, "20px Arial", "#ff7700");
    game.addChild(creditsText);
    creditsText.x = 47;
    creditsText.y = 275.5;
    creditsText.textBaseline = "alphabetic";
    //create jackpot amount label
    jackpotText = new createjs.Text(jackpot, "20px Arial", "#ff7700");
    game.addChild(jackpotText);
    jackpotText.x = 147.5;
    jackpotText.y = 75;
    jackpotText.textBaseline = "alphabetic";
}

// Our Game Kicks off in here
function main() {
    //Instantiate game container
    game = new createjs.Container();
    //Create User interface
    createUI();
    //Add the game container to the stage1
    stage.addChild(game);
}

