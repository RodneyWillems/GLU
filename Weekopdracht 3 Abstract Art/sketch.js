let randomNumber;
let data = [];
let colors = [];

function setup() {
  createCanvas(1495, 715);
  create();
}

// Functie die de circles/rectangles random locatie en grootte geeft
function create() {
  data[0] = [];
  data[1] = [];
  data[2] = [];
  data[3] = [];
  data[4] = [];
  colors = [];
  randomNumber = round(random(20,50));
  for (i = 0; i < randomNumber; i++) {
    data[0].push(round(random(width)));
    data[1].push(round(random(height)));
    data[2].push(round(random(50,500)));
    data[3].push(round(random(2)));
    data[4].push(round(random(360)));
    colors.push([round(random(255)), round(random(255)), round(random(255))]);
  }
}

function draw() {
  background(220);
  // loop die de kunst maakt
  for (let i = 0; i < randomNumber; i++) {
    fill(colors[i],colors[i],colors[i]);
    if (data[3][i] == 1) {
      ellipse(data[0][i],data[1][i],data[2][i]);
    } else if (data[3][i] == 2) {
      rect(data[0][i],data[1][i],data[2][i]);
    } else {
      triangle(data[0][i],data[1][i],data[0][i + 1],data[1][i + 1],data[0][i + 2],data[1][i + 2 ]);
    }
  }
}

// functie dat als je op backspace drukt het nieuwe kunst maakt
function keyPressed() {
  if (keyCode == BACKSPACE) {
   create();
  }
}