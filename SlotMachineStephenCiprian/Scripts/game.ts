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

// Event handlers
function spinButtonClick() {
    console.log("a button was clicked");
}
function maxBetButtonClick() {
    console.log("a button was clicked");
}
function betOneButtonClick() {
    console.log("a button was clicked");
}
function betTenButtonClick() {
    console.log("a button was clicked");
}
function powerButtonClick() {
    console.log("a button was clicked");
}
function resetButtonClick() {
    console.log("a button was clicked");
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
    spinButton.addEventListener("click", buttonclick);
    //create max bet button;
    maxBetButton = new createjs.Bitmap("assets/images/bet_max_button.png");
    game.addChild(maxBetButton);
    maxBetButton.x = 160.3;
    maxBetButton.y = 350.5;
    //create bet one button
    betOneButton = new createjs.Bitmap("assets/images/bet_one_button.png");
    game.addChild(betOneButton);
    betOneButton.x = 118.5;
    betOneButton.y = 338;
    //create bet ten button
    betTenButton = new createjs.Bitmap("assets/images/bet_ten_button.png");
    game.addChild(betTenButton);
    betTenButton.x = 118.4;
    betTenButton.y = 373.8;
    //create power button
    powerButton = new createjs.Bitmap("assets/images/power_button.png");
    game.addChild(powerButton);
    powerButton.x = 36.5;
    powerButton.y = 338.5;
    //create reset button
    resetButton = new createjs.Bitmap("assets/images/reset_button.png");
    game.addChild(resetButton);
    resetButton.x = 76.5;
    resetButton.y = 338.5;
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

