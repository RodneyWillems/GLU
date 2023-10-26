// Buttons
let button0 = null;
let button5 = null;
let button10 = null;
let button25 = null;
let buttonStart = null;
let buttonStop = null;
let buttonBuy = null;

// Tamagotchi
let playTimer = 0;
let playTimerMinutes = 0;
let playTimerSeconds = 0;
let coins = 0;
let gainedCoins = 0;
let coinTimer = 0;
let happiness = 5;
let playing = false;
let mouseLocked = false;
let speed = 1;
let moodSpeed = 20;
let toySpeed = 0;
let toyActive = false;
let toyTimer = 0;
let toyLocked = false;

// Images
let cyndaquilSad = null;
let cyndaquilNeutral = null;
let cyndaquilHappy = null; 
let cyndaquilSerious = null;

// Preload images
function preload() {
  cyndaquilSad = loadImage("./Assets/CyndaquilSad.png");
  cyndaquilNeutral = loadImage("./Assets/CyndaquilNeutral.png");
  cyndaquilHappy = loadImage("./Assets/CyndaquilHappy.png");
  cyndaquilSerious = loadImage("./Assets/CyndaquilSerious.png");
}

function setup() {
  createCanvas(800, 600);
  loadGame()
  buttons();
}

function draw() {
  background(220);
  // Check if you can buy  a new toy
  if(coins < 10) {
    buttonBuy.style("background-color", "grey");
  } else if(coins > 10) {
    buttonBuy.style("background-color", "white");
  }
  // Set playing to false when the timer is over
  if (floor(playTimer) <= 0 && playing == true) {
    playing = false;
   happiness += 10;
    coins += gainedCoins;
    gainedCoins = 0;
  }
  // Seperate the timer into minutes and seconds
  playTimerMinutes = floor(playTimer / 60);
  playTimerSeconds = floor(playTimer - (playTimerMinutes * 60));
  // Make happiness go up when you have a toy
  if (toyActive == true) {
    toyLocked = true;
    toyTimer += deltaTime / 1000;
    buttonBuy.style("background-color", "grey")
    if (toyTimer >= 30) {
      toyActive = false;
      toyTimer = 0;
      toyLocked = false;
    }
  } else if(toyActive == false && coins >= 10) {
    toyTimer = 0;
    toyLocked = false;
    buttonBuy.style("background-color", "white");
  }
  // Make happiness go down when you're not doing anything
  // And make the timer go down plus the cointimer go up when you're playing 
  if (playing == false && happiness > 0 && toyActive == false) {
    console.log(deltaTime / 1000 / moodSpeed);
    // happiness = happiness - 1;
    happiness -= deltaTime / 1000 / moodSpeed;
    mouseLocked = false;
  } else if(toyActive == true && happiness >= 0 && happiness < 100) {
    happiness += deltaTime / 1000 / toySpeed;
    mouseLocked = false;
  } if (playing == true && floor(playTimer) > 0) {
    coinTimer += deltaTime / 1000 * speed;
    if (ceil(coinTimer) >= 60) {
      gainedCoins++;
      coinTimer -= 60;
    }
    playTimer -= deltaTime / 1000 * speed;
  }
  // Draw all images based on the mood
  if (playing == true) {
    image(cyndaquilSerious, 0, 50, 300, 300);
  } else if (playing == false && happiness < 10) {
    image(cyndaquilSad, 0, 50, 300, 300);
  } else if(playing == false && happiness > 10 && happiness < 75) {
    image(cyndaquilNeutral, 0, 50, 300, 300);
  } else if(playing == false && happiness > 75) {
    image(cyndaquilHappy, 0, 50, 300, 400);
  }
  // Make sure happiness doesn't go over 100 or under 0
  if (happiness > 100) {
    happiness = 100;
  } else if(happiness < 0) {
    happiness = 0;
  }
  // Draw the line, Write the text and save the game
  line(width/2, 0, width/2, height);
  textSize(36);
  text("Mood: " + round(happiness), 50, 450);
  text(playTimerMinutes + ":" + playTimerSeconds, 500, 250);
  text("Coins: " + coins + " (" + gainedCoins + ")", 100, 50);
  saveGame()
}

  // Create all buttons
function buttons() {
  button0 = createButton("0");
  button0.position(width/1.6, height/1.7);
  button0.size(100,50);
  button0.mousePressed(function() {
    if (mouseLocked == false) {
      playTimer = 0;
      coinTimer = 0;
    }
  })
  button5 = createButton("+5");
  button5.position(width/1.6, height/1.5);
  button5.size(100,50);
  button5.mousePressed(function() {
    if (mouseLocked == false) {
      playTimer += 5 * 60;
    }
  })
  button10 = createButton("+10");
  button10.position(width/1.6 + 100, height/1.5);
  button10.size(100,50);
  button10.mousePressed(function() {
    if (mouseLocked == false) {
      playTimer += 10 * 60;
    }
  })
  button25 = createButton("25");
  button25.position(width/1.6 + 100, height/1.7);
  button25.size(100,50);
  button25.mousePressed(function() {
    if (mouseLocked == false) {
      playTimer = 25 * 60;
      coinTimer = 0;
    }
  })
  buttonStart = createButton("Start");
  buttonStart.position(width/1.6, height/2);
  buttonStart.size(100,50);
  buttonStart.mousePressed(function() {
    if(playTimer > 0) {
      playing = true;
      mouseLocked = true;
    }
  })
  buttonStop = createButton("Stop");
  buttonStop.position(width/1.6 + 100, height/2);
  buttonStop.size(100,50);
  buttonStop.mousePressed(function() {
    if(playTimer > 0) {
      playing = false;
      mouseLocked = false;
      coins += gainedCoins;
      gainedCoins = 0;
    }
  })
  buttonBuy = createButton("Buy a toy!");
  buttonBuy.position(150,500);
  buttonBuy.size(100,50);
  buttonBuy.mousePressed(function() {
    if(coins >= 10) {
      if (toyLocked == false) {
        coins -= 10;
        toyActive = true;
        toySpeed = 2;
      }
    }
  })
}

// Function to save the game
function saveGame() {
  storeItem("Coins", coins);
  storeItem("playTimer", playTimer);
  storeItem("Happiness", happiness);
  storeItem("Cointimer", coinTimer);
  storeItem("playing", playing);
  storeItem("GainedCoins", gainedCoins);
  storeItem("ToyActive", toyActive);
}

// Function to load the game
function loadGame() {
  let tempcoins = getItem("Coins");
  let tempplayTimer = getItem("playTimer");
  let temphappiness = getItem("Happiness");
  let tempcoinTimer = getItem("Cointimer");
  let tempplaying = getItem("playing");
  let tempGainedCoins = getItem("GainedCoins");
  let tempToyActive = getItem("ToyActive");
  if (tempcoins != null) {
    coins = tempcoins;
  } if (tempplayTimer != null) {
    playTimer = tempplayTimer;
  } if (temphappiness != null) {
    happiness = temphappiness;
  } if (tempcoinTimer != null) {
    coinTimer = tempcoinTimer;
  } if (tempplaying != null) {
    playing = tempplaying;
  } if (tempGainedCoins != null) {
    gainedCoins = tempGainedCoins;
  } if (tempToyActive != null) {
    toyActive = tempToyActive;
  }
}

// Function to cheat aka dev tools
function keyPressed() {
  if (keyCode == 75) {
    speed = 30;
  } else if(keyCode == 74) {
    speed = 1;
  }
  if (keyCode == 80) {
    console.log(happiness);
    happiness = 5;
    console.log(happiness);
  } else if(keyCode == 79) {
    console.log(happiness);
    happiness = 100;
    console.log(happiness);
  } else if(keyCode == 73) {
    console.log(happiness);
    happiness = 50;
    console.log(happiness);
  }
  if (keyCode == 12) {
    coins += 10;
  }
}