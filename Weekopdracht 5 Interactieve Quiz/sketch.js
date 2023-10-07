// Variabelen voor de fotos
let Who;
let Bulbasaur;
let Popularity;
let Gen5;
let Shiny;
let Encumbered;
let Rayquaza;
let Badges;
let Furret;
let Pokedex;
let endPokemon;
let Trio;
let Tyranitar;

// Variabelen voor de coordinaten, huidige vraag en knoppen
let x = 0;
let y = 0;
let mouseLocked = false;
let nextQuestion = false;
let questionAnswered = false;
let punten = 0;
let timer = 0;
let currentQuestion = 0;
let givenAnswer;
let answer = [];
answer[0] = [];
answer[1] = [];
answer[2] = [];
answer[3] = [];
let startButton;
let answerButtons = {
  1: { x: 0, y: 0 },
  2: { x: 0, y: 0 },
  3: { x: 0, y: 0 },
  4: { x: 0, y: 0 },
};

let color = [];

// Array met de vragen
let questions = [
  "Who's the first Pokemon made?",
  "Name the most popular voted Pokemon of 2020",
  "At what level do the gen 5 starters evolve?",
  "Which Pokemon is guaranteed a shiny in any main-line game",
  "Which Pokemon is the heaviest?",
  "Which Pokemon has the highest Base Stat Total?",
  "Which town is Furret walking in?",
  "How many different typings are there?",
  "Which region added the most new pokemon?",
  "Which Gen was supposed to be the last",
  "How many Legendary trios are there?",
  "Which Pokemon evolves at the highest level?",
];

// Array met alle mogelijke antwoorden
let potentialAnswers = [
  ["Rhydon", "Bulbasaur", "Arceus", "Mew"],
  ["Pikachu", "Charizard", "Greninja", "Lucario"],
  ["15", "16", "17", "18"],
  ["Haxorus", "Horsea", "Hoothoot", "Hatterene"],
  ["Groudon", "Cosmoem", "Wailord", "Eternatus"],
  ["Arceus", "Zygarde", "Eternatus", "Mewtwo"],
  ["Accumula Town", "Azalea Town", "Mahogany Town", "Littleroot Town"],
  ["19", "20", "18", "17"],
  ["Kanto", "Unova", "Kalos", "Paldea"],
  ["Gen 2", "Gen 1", "Gen 5", "Gen 4"],
  ["13", "11", "9", "7"],
  ["Dragonite", "Dragapult", "Volcarona", "Hydreigon"],
]
// Array met alle goeie antwoorden gebasseerd op de value van de knop
let answers = [0, 2, 2, 0, 1, 0, 0, 0, 1, 0, 2, 3];

let images = [];
let imageSize = 400;

// preload alle images voordat je in de pagina zit
function preload() {
  images[0] = loadImage("./Assets/Who.png");
  images[1] = loadImage("./Assets/Bulbasaur.png");
  images[2] = loadImage("./Assets/popularityjpg.jpg");
  images[3] = loadImage("./Assets/gen-5-starters.jpg");
  images[4] = loadImage("./Assets/Shiny.png");
  images[5] = loadImage("./Assets/encumbered.jpg");
  images[6] = loadImage("./Assets/Rayquaza.png");
  images[7] = loadImage("./Assets/furret_walkpng.png");
  images[8] = loadImage("./Assets/Kanto_badges.png");
  images[9] = loadImage("./Assets/pokedex.png");
  images[10] = loadImage("./Assets/End_Pokemon.png");
  images[11] = loadImage("./Assets/Weather-Trio.png");
  images[12] = loadImage("./Assets/Tyranitar.png");
  images[13] = loadImage("./Assets/hallOfFamejpg.jpg");
}


// In de setup krijgen de knoppen posities en word de eerste knop aangemaakt
function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(60);
  answerButtons[1] = { x: width / 3.5, y: height - 300 };
  answerButtons[2] = { x: width / 2, y: height - 300 };
  answerButtons[3] = { x: width / 3.5, y: height - 200};
  answerButtons[4] = { x: width / 2, y: height - 200};
  startButton = createButton("Begin");
  startButton.position(width / 2.5, 120);
  startButton.size(200, 50);
  buttonAnswers()
}

// Functie die de knoppen aanmaakt met de goeie antwoorden en de kleur
function buttonAnswers() {
  for (let i = 0; i < questions.length; i++) {
    answer[0][i] = createButton(potentialAnswers[i][0]);
    answer[0][i].position(answerButtons[1].x, answerButtons[1].y);
    answer[0][i].size(200, 50);
    answer[0][i].style("background-color", "white");
    answer[0][i].mousePressed(function () {
      if(mouseLocked == false) {
        background(220);
        timer = 0;
        loadTimer()
        mouseLocked = true;
        questionAnswered = true;
        checkAnswer(0);
      }
    });
    answer[1][i] = createButton(potentialAnswers[i][1]);
    answer[1][i].position(answerButtons[2].x, answerButtons[2].y);
    answer[1][i].size(200, 50);
    answer[1][i].style("background-color", "white");
    answer[1][i].mousePressed(function () {
      if(mouseLocked == false) {
        background(220);
        timer = 0;
        loadTimer()
        mouseLocked = true;
        questionAnswered = true;
        checkAnswer(1);}
    });
    answer[2][i] = createButton(potentialAnswers[i][2]);
    answer[2][i].position(answerButtons[3].x, answerButtons[3].y);
    answer[2][i].size(200, 50);
    answer[2][i].style("background-color", "white");
    answer[2][i].mousePressed(function () {
      if(mouseLocked == false) {
        background(220);
        timer = 0;
        loadTimer()
        mouseLocked = true;
        questionAnswered = true;
        checkAnswer(2);}
    });
    answer[3][i] = createButton(potentialAnswers[i][3]);
    answer[3][i].position(answerButtons[4].x, answerButtons[4].y);
    answer[3][i].size(200, 50);
    answer[3][i].style("background-color", "white");
    answer[3][i].mousePressed(function () {
      if(mouseLocked == false) {
        background(220);
        timer = 0;
        loadTimer()
        mouseLocked = true;
        questionAnswered = true;
        checkAnswer(3);}
    });
    answer[0][i].hide();
    answer[1][i].hide();
    answer[2][i].hide();
    answer[3][i].hide();
  }
}

function draw() {
  textSize(40);
  // If statement die de eerste pagina laat zien en anders de andere paginas
  if (currentQuestion == 0) {
    image(images[0], x, y, width, height);
    fill(255);
    text("Welkom bij deze quiz! Het gaat over Pokemon dus bereid je voor!", width / 10, 50);
    text("Druk op de knop beneden om te beginnen!", width / 5, 90);
    startButton.mousePressed(function () {
      background(220);
      currentQuestion = 1;
      startButton.remove();
    });
  } else if (currentQuestion >= 1) {
      nextQuestion = true;
      showQuestion();
  }
  if (currentQuestion >= 1 && currentQuestion <= 12 && questionAnswered == true) {
    loadTimer();
  } 
  if(currentQuestion >= 13) {
    clear();
    image(images[13], x, y, width, height);
    text("De quiz is voorbij!", width / 10, 100);
    text("Jouw eind score was: " + punten, width / 10, 150);
  }
}


// Functie die de vragen en fotos laten zien
function showQuestion() {
  if (currentQuestion >= 1 && currentQuestion <= 12) {
    if (nextQuestion == true) {
      image(images[currentQuestion], x + width / 3, y - 50, imageSize, imageSize);
      fill(0);
      text("Score: " + punten, 50, 400);
      text(questions[currentQuestion - 1], x + width / 5, y + 350);
      nextQuestion = false;
      answer[0][currentQuestion - 1].show();
      answer[1][currentQuestion - 1].show();
      answer[2][currentQuestion - 1].show();
      answer[3][currentQuestion - 1].show();
    }
  }
}

// Functie die de timer maakt en gebruikt
function loadTimer() {
  timer += deltaTime / 1000;
  console.log(timer);
    if (timer >= 3) {
    answer[0][currentQuestion - 1].remove();
    answer[1][currentQuestion - 1].remove();
    answer[2][currentQuestion - 1].remove();
    answer[3][currentQuestion - 1].remove();
      if (currentQuestion >= 1 && currentQuestion <= 12) {
        clear();
        background(220);
        currentQuestion++;
        color = [];
        if (currentQuestion <= 12) {
          answer[0][currentQuestion - 1].style("background-color", "white");
          answer[1][currentQuestion - 1].style("background-color", "white");
          answer[2][currentQuestion - 1].style("background-color", "white");
          answer[3][currentQuestion - 1].style("background-color", "white");
        }
        timer = 0;
        mouseLocked = false;
        questionAnswered = false;
        showQuestion();
        console.log(currentQuestion);
      }
    }
}


// Functie die een switch statment gebruikt om de kleuren goed te zetten
function swapColors() {
  for (i = 0; i < questions.length; i++) {
    switch(currentQuestion) {
      case 1:
        color = [];
        color.push(["green"], ["red"], ["red"], ["red"]);
        answer[0][i].style("background-color", color[0]);
        answer[1][i].style("background-color", color[1]);
        answer[2][i].style("background-color", color[2]);
        answer[3][i].style("background-color", color[3]);
        break;
      case 2:
        color = [];
        color.push(["red"], ["red"], ["green"], ["red"]);
        answer[0][i].style("background-color", color[0]);
        answer[1][i].style("background-color", color[1]);
        answer[2][i].style("background-color", color[2]);
        answer[3][i].style("background-color", color[3]);
        break;
      case 3:
        color = [];
        color.push(["red"], ["red"], ["green"], ["red"]);
        answer[0][i].style("background-color", color[0]);
        answer[1][i].style("background-color", color[1]);
        answer[2][i].style("background-color", color[2]);
        answer[3][i].style("background-color", color[3]);
        break;
      case 4:
        color = [];
        color.push(["green"], ["red"], ["red"], ["red"]);
        answer[0][i].style("background-color", color[0]);
        answer[1][i].style("background-color", color[1]);
        answer[2][i].style("background-color", color[2]);
        answer[3][i].style("background-color", color[3]);
        break;
      case 5:
        color = [];
        color.push(["red"], ["green"], ["red"], ["red"]);
        answer[0][i].style("background-color", color[0]);
        answer[1][i].style("background-color", color[1]);
        answer[2][i].style("background-color", color[2]);
        answer[3][i].style("background-color", color[3]);
        break;
      case 6:
        color = [];
        color.push(["green"], ["red"], ["red"], ["red"]);
        answer[0][i].style("background-color", color[0]);
        answer[1][i].style("background-color", color[1]);
        answer[2][i].style("background-color", color[2]);
        answer[3][i].style("background-color", color[3]);
        break;
      case 7:
        color = [];
        color.push(["green"], ["red"], ["red"], ["red"]);
        answer[0][i].style("background-color", color[0]);
        answer[1][i].style("background-color", color[1]);
        answer[2][i].style("background-color", color[2]);
        answer[3][i].style("background-color", color[3]);
        break;
      case 8:
        color = [];
        color.push(["green"], ["red"], ["red"], ["red"]);
        answer[0][i].style("background-color", color[0]);
        answer[1][i].style("background-color", color[1]);
        answer[2][i].style("background-color", color[2]);
        answer[3][i].style("background-color", color[3]);
        break;
      case 9:
        color = [];
        color.push(["red"], ["green"], ["red"], ["red"]);
        answer[0][i].style("background-color", color[0]);
        answer[1][i].style("background-color", color[1]);
        answer[2][i].style("background-color", color[2]);
        answer[3][i].style("background-color", color[3]);
        break;
      case 10:
        color = [];
        color.push(["green"], ["red"], ["red"], ["red"]);
        answer[0][i].style("background-color", color[0]);
        answer[1][i].style("background-color", color[1]);
        answer[2][i].style("background-color", color[2]);
        answer[3][i].style("background-color", color[3]);
        break;
      case 11:
        color = [];
        color.push(["red"], ["red"], ["green"], ["red"]);
        answer[0][i].style("background-color", color[0]);
        answer[1][i].style("background-color", color[1]);
        answer[2][i].style("background-color", color[2]);
        answer[3][i].style("background-color", color[3]);
        break;
      case 12:
        color = [];
        color.push(["red"], ["red"], ["red"], ["green"]);
        answer[0][i].style("background-color", color[0]);
        answer[1][i].style("background-color", color[1]);
        answer[2][i].style("background-color", color[2]);
        answer[3][i].style("background-color", color[3]);
        break;
      default:
        color = [];
        break;
    }
  }
}


// FUnctie die de antwoorden controleert en punten toevoegd of afneemt
function checkAnswer(givenAnswer) {
  if (givenAnswer == answers[currentQuestion - 1]) {
    punten += 100;
    nextQuestion = true;
  } else if (givenAnswer != answers[currentQuestion - 1]) {
    punten -= 50;
    nextQuestion = true;
  }
  swapColors()
}