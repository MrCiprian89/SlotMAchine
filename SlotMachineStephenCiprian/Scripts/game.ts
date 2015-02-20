var canvas;
var stage: createjs.Stage;

// Game Objects 
var game: createjs.Container;
var background: createjs.Bitmap;
var spinButton: createjs.Bitmap;
var spinButton_disabled: createjs.Bitmap;
var maxBetButton: createjs.Bitmap;
var betTenButton: createjs.Bitmap;
var betOneButton: createjs.Bitmap;
var powerButton: createjs.Bitmap;
var resetButton: createjs.Bitmap;

var tiles: createjs.Bitmap[] = [];
var tilesContainer: createjs.Container[] = [];
var spinButtonContainer: createjs.Container;

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
var vampire = 0;
var lumpyspace_princess = 0;
var bmo = 0;
var jake = 0;
var finn = 0;
var bubblegum_princess = 0;
var rainbow_unicorn = 0;
var ice_king = 0;
var win;


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
     else if (playerBet <= playerMoney && playerBet != 0) {
        spinResult = Reels();
        determineWinnings();
        showReelOutcome();
        spinEnabled();
    }
    creditsText.text = "" + playerMoney;
   
}
function maxBetButtonClick() {
    playerBet = 100;
    betText.text = "" + playerBet;
    spinEnabled();
}
function betOneButtonClick() {
    playerBet = 1;
    betText.text = "" + playerBet;
    spinEnabled();
}
function betTenButtonClick() {
    playerBet = 10;
    betText.text = "" + playerBet;
    spinEnabled();
}
function powerButtonClick() {
    
    window.open("", "_self").close();
}
function resetButtonClick() {
    resetFruitTally();
    resetAll();
    spinEnabled();
}
//returns the button to a solid colour when not hovered over
function buttonOut(target: createjs.Bitmap) {
    target.alpha = 1.0;
}
//makes the button transparent when hovered over
function buttonOver(target: createjs.Bitmap) {
    target.alpha = 0.5;
}

//UTILITY   METHODS ##########################################################################

/* Utility function to reset all fruit tallies */
function resetFruitTally() {
    vampire = 0;
    lumpyspace_princess = 0;
    bmo = 0;
    jake = 0;
    finn = 0;
    bubblegum_princess = 0;
    rainbow_unicorn = 0;
    ice_king = 0;
}

/* Utility function to reset the player stats */
function resetAll() {
    playerMoney = 1000;
    winnings = 0;
    jackpot = 5000;
    playerBet = 0;
    jackpotText.text = "" +jackpot;
    betText.text = "" +playerBet;
    winText.text = "" +winnings;
    creditsText.text = "" +playerMoney;
}

//utility method to check if the player has won the jackpot
function checkJackPot() {
    /* compare two random values */
    var jackPotTry = Math.floor(Math.random() * 51 + 1);
    var jackPotWin = Math.floor(Math.random() * 51 + 1);
    if (jackPotTry == jackPotWin) {
        alert("You Won the $" + jackpot + " Jackpot!!");
        playerMoney += jackpot;
        jackpot = 1000;
        jackpotText.text = "" + jackpot;
    }
}
//Utility function to disable the spin button if the bet amount is more than the amount the player has to bet
function spinEnabled() {
    if (playerBet < playerMoney && playerBet !=0) {
        spinButton_disabled.visible = false;
    }
    else {
        spinButton_disabled.visible = true;
    }
}
/* Utility function to check if jackpot was won and to increase player money by winnings */
function showWinMessage() {
    playerMoney += winnings;
    resetFruitTally();
    checkJackPot();
    winText.text = "" +winnings;
}
/* Utility function to and reduce player money and reset the tally*/
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

/* When this function is called it determines the betLine results. */
function Reels() {
    var betLine = [" ", " ", " "];
    var outCome = [0, 0, 0];

    for (var spin = 0; spin < 3; spin++) {
        outCome[spin] = Math.floor((Math.random() * 65) + 1);
        switch (outCome[spin]) {
            case checkRange(outCome[spin], 1, 27):  // 41.5% probability
                betLine[spin] = "ice_king";
                ice_king++;
                break;
            case checkRange(outCome[spin], 28, 37): // 15.4% probability
                betLine[spin] = "vampire";
                vampire++;
                break;
            case checkRange(outCome[spin], 38, 46): // 13.8% probability
                betLine[spin] = "lumpyspace_princess";
                lumpyspace_princess++;
                break;
            case checkRange(outCome[spin], 47, 54): // 12.3% probability
                betLine[spin] = "bmo";
                bmo++;
                break;
            case checkRange(outCome[spin], 55, 59): //  7.7% probability
                betLine[spin] = "jake";
                jake++;
                break;
            case checkRange(outCome[spin], 60, 62): //  4.6% probability
                betLine[spin] = "finn";
                finn++;
                break;
            case checkRange(outCome[spin], 63, 64): //  3.1% probability
                betLine[spin] = "bubblegum_princess";
                bubblegum_princess++;
                break;
            case checkRange(outCome[spin], 65, 65): //  1.5% probability
                betLine[spin] = "rainbow_unicorn";
                rainbow_unicorn++;
                break;
        }
    }
    return betLine;
}

//function that displays pictures on reels based on the betline results
function showReelOutcome() {
    var tileX: number = 65;
    for (var reel = 0; reel < 3; reel++) {
        tiles[reel] = new createjs.Bitmap("assets/images/" + spinResult[reel] + ".png");
        console.log(tiles[reel]);
        tiles[reel].x = tileX + (105 * reel);
        tiles[reel].y = 155;
        game.addChild(tiles[reel]);
    }
}


/* This function calculates the player's winnings, if any */
function determineWinnings() {
    if (ice_king == 0) {
        if (vampire == 3) {
            winnings = playerBet * 10;
        }
        else if (lumpyspace_princess == 3) {
            winnings = playerBet * 20;
        }
        else if (bmo == 3) {
            winnings = playerBet * 30;
        }
        else if (jake == 3) {
            winnings = playerBet * 40;
        }
        else if (finn == 3) {
            winnings = playerBet * 50;
        }
        else if (bubblegum_princess == 3) {
            winnings = playerBet * 75;
        }
        else if (rainbow_unicorn == 3) {
            winnings = playerBet * 100;
        }
        else if (vampire == 2) {
            winnings = playerBet * 2;
        }
        else if (lumpyspace_princess == 2) {
            winnings = playerBet * 2;
        }
        else if (bmo == 2) {
            winnings = playerBet * 3;
        }
        else if (jake == 2) {
            winnings = playerBet * 4;
        }
        else if (finn == 2) {
            winnings = playerBet * 5;
        }
        else if (bubblegum_princess == 2) {
            winnings = playerBet * 10;
        }
        else if (rainbow_unicorn == 2) {
            winnings = playerBet * 20;
        }
        else if (rainbow_unicorn == 1) {
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
    spinButton_disabled = new createjs.Bitmap("assets/images/spin_button_disabled.png");
    spinButtonContainer.addChild(spinButton, spinButton_disabled);
    spinButtonContainer.x = 308.7;
    spinButtonContainer.y = 346.8;
    spinButton.addEventListener("click", spinButtonClick);
    spinButton.on("mouseover", function () { this.alpha = 0.5 });
    spinButton.on("mouseout", function () { this.alpha = 1.0 });
    //create max bet button;
    maxBetButton = new createjs.Bitmap("assets/images/bet_max_button.png");
    game.addChild(maxBetButton);
    maxBetButton.x = 160.3;
    maxBetButton.y = 350.5;
    maxBetButton.addEventListener("click", maxBetButtonClick);
    maxBetButton.on("mouseover", function () { this.alpha = 0.5 });
    maxBetButton.on("mouseout", function () { this.alpha = 1.0 });
    //create bet one button
    betOneButton = new createjs.Bitmap("assets/images/bet_one_button.png");
    game.addChild(betOneButton);
    betOneButton.x = 118.5;
    betOneButton.y = 338;
    betOneButton.addEventListener("click", betOneButtonClick);
    betOneButton.on("mouseover", function () {this.alpha = 0.5 });
    betOneButton.on("mouseout", function () { this.alpha = 1.0 });
    //create bet ten button
    betTenButton = new createjs.Bitmap("assets/images/bet_ten_button.png");
    game.addChild(betTenButton);
    betTenButton.x = 118.4;
    betTenButton.y = 373.8;
    betTenButton.addEventListener("click", betTenButtonClick);
    betTenButton.on("mouseover", function () { this.alpha = 0.5 });
    betTenButton.on("mouseout", function () { this.alpha = 1.0 });
    //create power button
    powerButton = new createjs.Bitmap("assets/images/power_button.png");
    game.addChild(powerButton);
    powerButton.x = 36.5;
    powerButton.y = 338.5;
    powerButton.addEventListener("click", powerButtonClick);
    powerButton.on("mouseover", function () { this.alpha = 0.5 });
    powerButton.on("mouseout", function () { this.alpha = 1.0 });
    //create reset button
    resetButton = new createjs.Bitmap("assets/images/reset_button.png");
    game.addChild(resetButton);
    resetButton.x = 76.5;
    resetButton.y = 338.5;
    resetButton.addEventListener("click", resetButtonClick);
    resetButton.on("mouseover", function () { this.alpha = 0.5 });
    resetButton.on("mouseout", function () { this.alpha = 1.0 });
    //create winnings paid label
    winText = new createjs.Text("" +winnings, "20px Arial", "#ff7700");
    game.addChild(winText);
    winText.x = 229;
    winText.y = 275.5;
    winText.textBaseline = "alphabetic";
    //create bet amount label
    betText = new createjs.Text("" +playerBet, "20px Arial", "#ff7700");
    game.addChild(betText);
    betText.x = 177;
    betText.y = 275.5;
    betText.textBaseline = "alphabetic";
    //create credit balance label
    creditsText = new createjs.Text("" +playerMoney, "20px Arial", "#ff7700");
    game.addChild(creditsText);
    creditsText.x = 47;
    creditsText.y = 275.5;
    creditsText.textBaseline = "alphabetic";
    //create jackpot amount label
    jackpotText = new createjs.Text("" +jackpot, "20px Arial", "#ff7700");
    game.addChild(jackpotText);
    jackpotText.x = 147.5;
    jackpotText.y = 75;
    jackpotText.textBaseline = "alphabetic";
}

// Function that initializes the game
function main() {
    //Instantiate game container
    game = new createjs.Container();
    //Instantiate spinButton Container
    spinButtonContainer = new createjs.Container();
    //Create User interface
    createUI();
    game.addChild(spinButtonContainer);
    //Add the game container to the stage
    stage.addChild(game);
}

