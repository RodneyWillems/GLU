// alle variabelen die nodig zijn voor coordinaten en knopjes
let pixelSize = 20;
let startPosX = 10;
let startPosY = 10;
let AmogusKnop;
let CyndaquilKnop;
let LuigiKnop;
let RaymanKnop;
let counter;
let pixelArt = [[], []];
// 0 == white
// 1 == black
// 2 == red
// 3 == light blue
// 4 == dark red
// 5 == light grey
// 6 == dark Cyan
// 7 == skin color
// 8 == yellow
// 9 == green
// 10 == brown
// 11 == blue
// 12 == orange
// 13 == dark grey
// 14 == background
// 15 == purple
// de 2D array die Amogus maakt
let pixelArtAmogus = [
  [14, 14, 14, 14, 14, 1, 1, 1, 14, 14, 14, 14, 14, 14, 14],
  [14, 14, 14, 1, 1, 2, 2, 2, 1, 1, 14, 14, 14, 14, 14],
  [14, 14, 1, 2, 2, 2, 2, 2, 2, 2, 1, 14, 14, 14, 14],
  [14, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 14, 14, 14, 14],
  [14, 1, 3, 0, 0, 3, 3, 1, 2, 2, 2, 1, 14, 14, 14],
  [1, 3, 0, 0, 0, 3, 3, 5, 1, 2, 2, 1, 1, 1, 14],
  [1, 3, 3, 3, 3, 3, 5, 5, 1, 2, 2, 1, 2, 2, 1],
  [14, 1, 5, 5, 5, 5, 5, 1, 2, 2, 4, 1, 2, 2, 1],
  [14, 1, 1, 1, 1, 1, 1, 2, 2, 2, 4, 1, 4, 4, 1],
  [14, 1, 2, 2, 2, 2, 2, 2, 2, 4, 4, 1, 4, 4, 1],
  [14, 1, 4, 2, 2, 2, 2, 2, 4, 4, 4, 1, 4, 4, 1],
  [14, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 14],
  [14, 1, 4, 4, 1, 1, 1, 1, 4, 4, 4, 1, 14, 14, 14],
  [14, 1, 4, 4, 1, 14, 14, 14, 1, 4, 4, 1, 14, 14, 14],
  [14, 14, 1, 1, 14, 14, 14, 14, 14, 1, 1, 14, 14, 14, 14],
];

// de 2D array die Cyndaquil maakt
let pixelArtCyndaquil = [
  [14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 1, 1, 14, 14, 1, 1],
  [14, 14, 14, 14, 14, 14, 14, 14, 14, 1, 1, 14, 14, 1, 2, 1, 14, 1, 2, 1],
  [14, 14, 14, 14, 1, 1, 1, 1, 14, 1, 2, 1, 1, 2, 2, 1, 1, 2, 2, 1],
  [14, 14, 14, 1, 6, 6, 6, 6, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 14],
  [14, 14, 1, 6, 6, 6, 6, 6, 6, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 14],
  [14, 14, 1, 6, 6, 7, 7, 7, 7, 6, 1, 2, 2, 8, 2, 2, 2, 2, 1, 14],
  [14, 1, 6, 6, 6, 7, 7, 7, 7, 7, 1, 8, 2, 8, 8, 2, 2, 1, 1, 1],
  [14, 1, 6, 6, 7, 7, 1, 1, 7, 7, 1, 8, 8, 8, 2, 8, 2, 2, 2, 1],
  [1, 6, 6, 7, 7, 1, 7, 7, 7, 7, 1, 8, 8, 8, 8, 8, 2, 2, 1, 14],
  [1, 6, 7, 7, 7, 7, 7, 7, 7, 1, 6, 6, 6, 8, 8, 2, 2, 2, 1, 14],
  [1, 6, 7, 1, 1, 1, 7, 7, 1, 1, 7, 6, 6, 6, 8, 8, 8, 2, 2, 1],
  [14, 1, 1, 14, 14, 1, 1, 7, 1, 7, 7, 1, 6, 6, 6, 1, 1, 1, 1, 14],
  [14, 14, 14, 14, 14, 14, 1, 7, 1, 1, 1, 7, 7, 7, 1, 14, 14, 14, 14, 14],
  [14, 14, 14, 14, 14, 14, 1, 1, 7, 7, 7, 7, 7, 7, 1, 14, 14, 14, 14, 14],
  [14, 14, 14, 14, 14, 1, 7, 7, 1, 7, 1, 7, 7, 1, 14, 14, 14, 14, 14, 14],
  [14, 14, 14, 14, 14, 1, 1, 1, 1, 1, 1, 1, 1, 1, 14, 14, 14, 14, 14, 14],
  [14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 1, 7, 7, 1, 14, 14, 14, 14, 14, 14],
  [14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 1, 1, 14, 14, 14, 14, 14, 14,14],
];

// de 2D array die Luigi maakt
let pixelArtLuigi = [
  [14, 14, 14, 9, 9, 9, 9, 9, 14, 14, 14, 14],
  [14, 14, 9, 9, 9, 9, 9, 9, 9, 9, 9, 14],
  [14, 14, 10, 10, 10, 7, 7, 1, 7, 14, 14, 14],
  [14, 10, 7, 10, 7, 7, 7, 1, 7, 7, 14, 14],
  [14, 10, 7, 10, 10, 7, 7, 7, 1, 7, 7, 7],
  [14, 14, 10, 7, 7, 7, 7, 1, 1, 1, 1, 14],
  [14, 14, 14, 7, 7, 7, 7, 7, 7, 14, 14, 14],
  [14, 14, 9, 9, 11, 9, 9, 11, 9, 9, 14, 14],
  [14, 9, 9, 9, 11, 9, 9, 11, 9, 9, 9, 14],
  [9, 9, 9, 9, 11, 11, 11, 11, 9, 9, 9, 9],
  [7, 7, 9, 11, 8, 11, 11, 8, 11, 9, 7, 7],
  [7, 7, 7, 11, 11, 11, 11, 11, 11, 7, 7, 7],
  [7, 7, 11, 11, 11, 11, 11, 11, 11, 11, 7, 7],
  [14, 14, 11, 11, 11, 14, 14, 11, 11, 11, 14, 14],
  [14, 10, 10, 10, 14, 14, 14, 14, 10, 10, 10, 14],
  [10, 10, 10, 10, 14, 14, 14, 14, 10, 10, 10, 10],
];

// de 2D array die Rayman maakt
let pixelArtRayman = [
  [14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 1, 8, 7, 14, 14, 14, 14],
  [14, 14, 14, 14, 14, 14, 14, 8, 8, 8, 14, 1, 7, 8, 8, 8, 7, 14, 14],
  [14, 14, 14, 14, 14, 14, 8, 8, 7, 7, 8, 7, 7, 7, 8, 8, 8, 7, 14],
  [14, 14, 14, 14, 14, 14, 8, 8, 7, 7, 1, 7, 7, 1, 8, 7, 8, 8, 14],
  [14, 14, 0, 0, 1, 14, 12, 7, 7, 0, 0, 0, 7, 0, 7, 8, 8, 8, 14],
  [14, 14, 0, 0, 13, 1, 14, 14, 7, 0, 1, 0, 0, 1, 0, 8, 14, 14, 14],
  [0, 13, 13, 13, 0, 0, 1, 14, 1, 0, 7, 7, 7, 7, 7, 14, 14, 14, 14],
  [13, 13, 1, 13, 0, 0, 13, 1, 1, 7, 7, 7, 7, 7, 7, 7, 14, 14, 14],
  [1, 1, 13, 13, 13, 1, 13, 1, 1, 7, 7, 7, 7, 7, 7, 7, 14, 14, 14],
  [14, 14, 1, 13, 0, 0, 1, 14, 1, 0, 7, 7, 7, 7, 7, 1, 14, 14, 14],
  [14, 14, 14, 1, 13, 0, 1, 14, 14, 1, 0, 0, 0, 1, 1, 14, 14, 14, 14],
  [14, 14, 14, 14, 1, 1, 14, 14, 14, 14, 1, 1, 1, 14, 14, 14, 14, 14, 14],
  [14, 14, 14, 14, 14, 14, 14, 14, 2, 2, 2, 2, 14, 14, 14, 14, 14, 14, 14],
  [14, 14, 14, 14, 14, 14, 14, 2, 2, 15, 0, 0, 15, 14, 14, 14, 14, 14, 14],
  [14, 14, 14, 14, 14, 14, 14, 15, 15, 0, 15, 15, 0, 15, 14, 14, 14, 14, 14],
  [14, 14, 14, 14, 14, 14, 14, 15, 15, 0, 15, 15, 0, 15, 14, 14, 14, 14, 14],
  [14, 14, 14, 14, 14, 14, 14, 15, 15, 0, 0, 0, 0, 15, 13, 13, 14, 14, 14],
  [14, 14, 14, 14, 14, 14, 14, 15, 15, 0, 0, 0, 0, 15, 13, 13, 13, 14, 14],
  [14, 14, 14, 14, 14, 14, 14, 15, 15, 15, 0, 0, 15, 15, 1, 1, 13, 14, 14],
  [14, 14, 14, 14, 14, 14, 14, 14, 15, 15, 15, 15, 15, 1, 13, 13, 13, 14, 14],
  [14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 1, 1, 13, 13, 1, 1, 14, 14],
  [14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 1, 1, 1, 14, 14, 14, 14],
  [14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14],
  [14, 14, 14, 14, 14, 12, 0, 0, 12, 14, 14, 14, 14, 12, 12, 0, 12, 0, 0],
  [14, 14, 14, 14, 0, 12, 12, 12, 12, 12, 14, 14, 12, 12, 12, 12, 12, 12, 12],
  [14, 14, 14, 12, 12, 12, 12, 0, 0, 12, 14, 14, 12, 12, 12, 12, 12, 0, 0],
  [14, 14, 14, 0, 0, 0, 0, 0, 0, 0, 14, 1, 0, 0, 0, 0, 0, 0, 0],
  [14, 14, 14, 1, 1, 1, 1, 1, 1, 1, 14, 14, 1, 1, 1, 1, 1, 1, 1],
];


// function die de pixelart tekent
function drawPixelArt(art) {
  strokeWeight(0);
  pixelArt = art;
  let pixelAmount = pixelArt.length * pixelArt[0].length;
  let maxPixel;
  if (pixelArt == pixelArtAmogus || pixelArt == pixelArtLuigi) {
    maxPixel = Math.floor(pixelAmount * (counter / 180));
  } else if (pixelArt == pixelArtCyndaquil) {
    maxPixel = Math.floor(pixelAmount * (counter / 210));
  } else if (pixelArt == pixelArtRayman) {
    maxPixel = Math.floor(pixelAmount * (counter / 300));
  }
  // nested for loop waarvan de eerste de row aanmaakt en de tweede de kolommen aanmaakt
  for (let row = 0; row < pixelArt.length; row++) {
    for (let cells = 0; cells < pixelArt[row].length; cells++) {
      // met een switch case zijn er minder karakters aan code en is het overzichtelijker
      if (row * pixelArt[0].length + cells <= maxPixel) {
        switch (pixelArt[row][cells]) {
          case 0:
            fill(255);
            break;
          case 1:
            fill(0);
            break;
          case 2:
            fill(255, 0, 0);
            break;
          case 3:
            fill(0, 234, 241);
            break;
          case 4:
            fill(178, 0, 0);
            break;
          case 5:
            fill(160);
            break;
          case 6:
            fill(5, 74, 91);
            break;
          case 7:
            fill(255, 227, 133);
            break;
          case 8:
            fill(251, 255, 0);
            break;
          case 9:
            fill(0, 255, 0);
            break;
          case 10:
            fill(117, 22, 22);
            break;
          case 11:
            fill(0, 0, 255);
            break;
          case 12:
            fill("orange");
            break;
          case 13:
            fill(92);
            break;
          case 14:
            fill(220);
            break;
          case 15:
            fill(124, 1, 176);
            break;
          default:
            break;
        }
      } else {
        fill(0); // Kleur pixels die nog niet zichtbaar zijn zwart
      }
      rect(startPosX + cells * pixelSize, startPosY + row * pixelSize, pixelSize);
    }
  }
}

// knoppen die de functie drawPixelArt aanroepen met de pixel art die je wil hebben
function setup() {
  createCanvas(1495, 715);
  counter = 0;
  frameRate(60);
  AmogusKnop = createButton("Amogus");
  AmogusKnop.position(600, 50);
  AmogusKnop.mousePressed(function () {
    counter = 0;
    clear();
    drawPixelArt(pixelArtAmogus);
  });
  CyndaquilKnop = createButton("Cyndaquil");
  CyndaquilKnop.position(600, 100);
  CyndaquilKnop.mousePressed(function () {
    counter = 0;
    clear();
    drawPixelArt(pixelArtCyndaquil);
  });
  LuigiKnop = createButton("Luigi");
  LuigiKnop.position(600, 150);
  LuigiKnop.mousePressed(function () {
    counter = 0;
    clear();
    drawPixelArt(pixelArtLuigi);
  });
  RaymanKnop = createButton("Rayman");
  RaymanKnop.position(600, 200);
  RaymanKnop.mousePressed(function () {
    counter = 0;
    clear();
    drawPixelArt(pixelArtRayman);
  });
}

// draw() MOET leeg zijn anders zie je de rest niet
function draw() {
  counter++;
  drawPixelArt(pixelArt);
}
