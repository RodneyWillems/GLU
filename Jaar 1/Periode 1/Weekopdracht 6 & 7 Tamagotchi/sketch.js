// Buttons
let button0 = null;
let button5 = null;
let button10 = null;
let button25 = null;
let buttonStart = null;
let buttonStop = null;
let buttonEvolve = null;

// Tamagotchi
let playTimer = 0;
let playTimerMinutes = 0;
let playTimerSeconds = 0;
let coins = 0;
let gainedCoins = 0;
let coinTimer = 0;
let level = 0;
let playing = false;
let mouseLocked = false;
let speed = 1;
let moodSpeed = 20;
let pokeBallSpeed = 0;
let pokeBallActive = false;
let pokeBallTimer = 0;
let pokeBallLocked = false;
let evolutionState = 0;

// Images
let backgroundImage = null;
let money = null;
let cyndaquilNeutral = null;
let cyndaquilSerious = null;
let quilavaNeutral = null;
let quilavaSerious = null;
let typhlosionNeutral = null;
let typhlosionSerious = null;
let egg = null;
let eggCracked = null;
let eggShake = null;
let shinySparkle = null;
let pokeball = null;
let greatball = null;
let ultraball = null;
let mysteryball = null;
let unavailable = null;

// Preload images
function preload() {
  backgroundImage = loadImage("./Assets/background.png");
  money = loadImage("./Assets/money.png");
  cyndaquilNeutral = loadImage("./Assets/CyndaquilNeutral.png");
  cyndaquilSerious = loadImage("./Assets/CyndaquilSerious.png");
  quilavaNeutral = loadImage("./Assets/QuilavaNeutral.png");
  quilavaSerious = loadImage("./Assets/ShinyQuilava.png");
  typhlosionNeutral = loadImage("./Assets/Typhlosion.png");
  typhlosionSerious = loadImage("./Assets/ShinyTyphlosion.png");
  egg = loadImage("./Assets/Egg.png");
  eggCracked = loadImage("./Assets/crackedEgg.png");
  eggShake = loadImage("./Assets/hatchEgg.gif");
  shinySparkle = loadImage("./Assets/Shiny.gif");
  pokeball = loadImage("./Assets/PokeBall.png");
  greatball = loadImage("./Assets/GreatBall.png");
  ultraball = loadImage("./Assets/UltraBall.png");
  mysteryball = loadImage("./Assets/mysterPokeBall.png");
  unavailable = loadImage("./Assets/unavailable.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  loadGame()
  buttons();
}

function draw() {
  image(backgroundImage, 0, 0, width, height);
  // Seperate the timer into minutes and seconds
  playTimerMinutes = floor(playTimer / 60);
  playTimerSeconds = floor(playTimer - (playTimerMinutes * 60));
  // Make level go down when you're not doing anything
  // And make the timer go down plus the cointimer go up when you're playing 
  if (playing == false && level > 0 && pokeBallActive == false) {
    level -= deltaTime / 1000 / moodSpeed;
    mouseLocked = false;
  } else if(pokeBallActive == true && level >= 0 && level < 100) {
    level += deltaTime / 1000 * pokeBallSpeed;
  } 
  if (playing == true && floor(playTimer) > 0) {
    coinTimer += deltaTime / 1000 * speed;
    if (ceil(coinTimer) >= 60) {
      gainedCoins++;
      coinTimer -= 60;
    }
    playTimer -= deltaTime / 1000 * speed;
  }
  resetTimer();
  pokeballUsage();
  drawImage();
  showPokeBall();
  // Make sure level doesn't go over 100 or under 0
  if (level > 100) {
    level = 100;
  } else if(level < 0) {
    level = 0;
  }
  // Pokemon devolves when too low level
  if (evolutionState == 0 && round(level) <= 0) {
    evolutionState = -1;
  } else if (evolutionState == 1 && level < 14) {
    evolutionState = 0;
  } else if (evolutionState == 2 && level < 36) {
    evolutionState = 1;
  } 
  evolution();
  // Write the text and save the game
  if (coins < 10 && pokeBallActive == false) {
    text("Buy a pokeball with: " + (10 - coins) + " more pokedollars!", 200, 550);
  } else if (coins >= 10 && pokeBallActive == false) {
    text("Buy a random pokeball!", 300, 550);
  }
  textSize(36);
  text("Level: " + round(level), 300, 400);
  if (playTimerSeconds < 10 && playTimerMinutes >= 10) {
    text(playTimerMinutes + ":0" + playTimerSeconds, width/1.5 + 35, height/1.2 - 150);
  } else if (playTimerMinutes < 10 && playTimerSeconds >= 10) {
    text("0" + playTimerMinutes + ":" + playTimerSeconds, width/1.5 + 35, height/1.2 - 150);
  } else if (playTimerMinutes < 10 && playTimerSeconds < 10) {
    text("0" + playTimerMinutes + ":0" + playTimerSeconds, width/1.5 + 35, height/1.2 - 150);
  }
  else {
    text(playTimerMinutes + ":" + playTimerSeconds, width/1.5 + 35, height/1.2 - 150);
  }
  image(money, 50, 40, 30, 50);
  text(coins + " (" + gainedCoins + ")", 100, 75);
  saveGame();
  console.log(mouseX, mouseY);
}

// Create all buttons
function buttons() {
  button0 = createButton("0");
  button0.position(width/1.5, height/1.2 - 50);
  button0.size(100,50);
  button0.mousePressed(function() {
    if (mouseLocked == false) {
      playTimer = 0;
      coinTimer = 0;
    }
  })
  button5 = createButton("+5");
  button5.position(width/1.5, height/1.2);
  button5.size(100,50);
  button5.mousePressed(function() {
    if (mouseLocked == false) {
      playTimer += 5 * 60;
    }
  })
  button10 = createButton("+10");
  button10.position(width/1.5 + 100, height/1.2);
  button10.size(100,50);
  button10.mousePressed(function() {
    if (mouseLocked == false) {
      playTimer += 10 * 60;
    }
  })
  button25 = createButton("25");
  button25.position(width/1.5 + 100, height/1.2 - 50);
  button25.size(100,50);
  button25.mousePressed(function() {
    if (mouseLocked == false) {
      playTimer = 25 * 60;
      coinTimer = 0;
    }
  })
  buttonStart = createButton("Start");
  buttonStart.position(width/1.5, height/1.2 - 100);
  buttonStart.size(100,50);
  buttonStart.mousePressed(function() {
    if(playTimer > 0) {
      playing = true;
      mouseLocked = true;
    }
  })
  buttonStop = createButton("Stop");
  buttonStop.position(width/1.5 + 100, height/1.2 - 100);
  buttonStop.size(100,50);
  buttonStop.mousePressed(function() {
    if(playTimer > 0) {
      playing = false;
      mouseLocked = false;
      coins += gainedCoins;
      gainedCoins = 0;
    }
  })
  buttonEvolve = createButton("Evolve");
  buttonEvolve.position(width/2.2, height/1.2 - 150);
  buttonEvolve.size(100,50);
  buttonEvolve.mousePressed(function() {
    evolutionState++;
    buttonEvolve.hide();
  })
}

// Set playing to false when the timer is over
function resetTimer() {
  if (floor(playTimer) <= 0 && playing == true) {
    playing = false;
    if (evolutionState >= 0) {
      level += 10;
    }
    coins += gainedCoins;
    gainedCoins = 0;
    playTimer = 0;
  }
}

// Draw all images based on the mood
function drawImage() {
  if (playing == true && evolutionState == 0) {
    image(cyndaquilSerious, width/2.5, 150, 250, 250);
  } else if (playing == false && evolutionState == 0) {
    image(cyndaquilNeutral, width/2.5, 150, 250, 250);
  } else if (playing == true && evolutionState == 1) {
    image(quilavaSerious, width/2.5, 150, 250, 250);
  } else if (playing == false && evolutionState == 1) {
    image(quilavaNeutral, width/2.5, 150, 250, 250);
  } else if (playing == true && evolutionState == 2) {
    image(typhlosionSerious, width/2.5, 150, 250, 250);
  } else if (playing == false && evolutionState == 2) {
    image(typhlosionNeutral, width/2.5, 150, 250, 250);
  } else if (evolutionState == -1 && playing == true) {
    image(eggShake, width/2.5, 150, 250, 250);
  } else if (evolutionState == -1 && coins >= 10) {
    image(eggCracked, width/2.5, 150, 250, 250);
  } else if (evolutionState == -1 && coins < 10) {
    image(egg, width/2.5, 150, 250, 250);
  }
}

// Shows the pokeball you currently have
function showPokeBall() {
  if (pokeBallActive == true && pokeBallSpeed >= 1) {
    switch (pokeBallSpeed) {
      case 2:
        image(pokeball, 400, 560, 150, 150);
        break;
      case 4:
        image(greatball, 400, 560, 150, 150);
        break;
      case 6:
        image(ultraball, 400, 560, 150, 150);
        break;
      default:
        break;
    }
  } else if (pokeBallActive == false && coins < 10) {
    image(mysteryball, 400, 560, 150, 150);
    image(unavailable, 400, 560, 150, 150);
  } else if (pokeBallActive == false && coins >= 10) {
    image(mysteryball, 400, 560, 150, 150);
  }
}

// Make level go up when you have a toy
function pokeballUsage() {
  if (pokeBallActive == true) {
    image(shinySparkle, width/2.5 - 75, 100, 400, 400);
    pokeBallLocked = true;
    pokeBallTimer += deltaTime / 1000;
    if (pokeBallTimer >= 15) {
      pokeBallActive = false;
      pokeBallTimer = 0;
      pokeBallLocked = false;
      pokeBallSpeed = 0;
    }
  } else if(pokeBallActive == false && coins >= 10) {
    pokeBallTimer = 0;
    pokeBallLocked = false;
  }
}

// Shows how many levels until evolution and when evolution is available
function evolution() {
  if (round(level) <= 0 && evolutionState == -1) {
    text("Buy a pokeball to hatch the egg!", 300, 430);
    buttonEvolve.hide();
  } else if (level < 14 && evolutionState < 1 && evolutionState >= 0) {
    text("Evolution available in: " + round(14 - level) + " levels!", 300, 430);
    buttonEvolve.hide();
  } else if (level >= 14 && evolutionState < 1 && evolutionState >= 0) {
    text("Evolution available!", 300, 430);
    buttonEvolve.show();
  } else if (level > 14 && level < 36 && evolutionState < 2) {
    text("Evolution available in: " + round(36 - level) + " levels!", 300, 430);
    buttonEvolve.hide();
  } else if (level >= 36 && level <= 100 && evolutionState < 2) {
    text("Evolution available!", 300, 430);
    buttonEvolve.show();
  } else if (evolutionState >= 2) {
    evolutionState = 2;
    buttonEvolve.hide();
  }
}

// Function to save the game
function saveGame() {
  storeItem("Coins", coins);
  storeItem("playTimer", playTimer);
  storeItem("level", level);
  storeItem("Cointimer", coinTimer);
  storeItem("playing", playing);
  storeItem("GainedCoins", gainedCoins);
  storeItem("pokeBallActive", pokeBallActive);
  storeItem("pokeBallSpeed", pokeBallSpeed);
  storeItem("pokeBallTimer", pokeBallTimer);
  storeItem("evolutionState", evolutionState);
}

// Function to load the game
function loadGame() {
  let tempcoins = getItem("Coins");
  let tempplayTimer = getItem("playTimer");
  let temphappiness = getItem("level");
  let tempcoinTimer = getItem("Cointimer");
  let tempplaying = getItem("playing");
  let tempGainedCoins = getItem("GainedCoins");
  let tempToyActive = getItem("pokeBallActive");
  let tempToySpeed = getItem("pokeBallSpeed");
  let tempToyTimer = getItem("pokeBallTimer");
  let tempEvolutionState = getItem("evolutionState");
  if (tempcoins != null) {
    coins = tempcoins;
  } if (tempplayTimer != null) {
    playTimer = tempplayTimer;
  } if (temphappiness != null) {
    level = temphappiness;
  } if (tempcoinTimer != null) {
    coinTimer = tempcoinTimer;
  } if (tempplaying != null) {
    playing = tempplaying;
  } if (tempGainedCoins != null) {
    gainedCoins = tempGainedCoins;
  } if (tempToyActive != null) {
    pokeBallActive = tempToyActive;
  } if (tempToySpeed != null) {
    pokeBallSpeed = tempToySpeed;
  } if (tempToyTimer != null) {
    pokeBallTimer = tempToyTimer;
  } if (tempEvolutionState != null) {
    evolutionState = tempEvolutionState;
  }
}

// Function to cheat aka dev tools
function keyPressed() {
  if (keyCode == 75) {
    speed = 30;                           // Press K for timer speed up
  } else if(keyCode == 74) {
    speed = 1;                            // Press J for normal timer speed
  }
  if (keyCode == 80) {
    level = 0;                            // Press P for level 0
  } else if(keyCode == 79) {
    level = 100;                          // Press O for level 100
  } else if(keyCode == 73) {
    level = 50;                           // Press I for level 50
  }
  if (keyCode == 12) {
    coins += 10;                          // Press numpad5 for 10 coins (numlock off)
  }
}

// Simulated pokeball as a button
function mousePressed() {
  if (mouseX >= 400 && mouseX <= 550 && mouseY <= 700 && mouseY >= 560) {
    if(coins >= 10) {
      if (pokeBallLocked == false) {
        coins -= 10;
        if (evolutionState == -1) {
          evolutionState = 0;
          level = 1;
        } else {
          pokeBallActive = true;
          pokeBallSpeed = round(random(1,3));
          if (pokeBallSpeed == 1) {
            pokeBallSpeed = 2;
          } else if(pokeBallSpeed == 2) {
            pokeBallSpeed = 4;
          } else if(pokeBallSpeed == 3) {
            pokeBallSpeed = 6;
          }
        }
      }
    }
  }
}