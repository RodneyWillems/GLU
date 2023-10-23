let canvas;
let selectX1;
let selectX2;
let selectX3;
let selectX4;
let selectX5;
let selectX6;
let selectX7;
let selectX8;
let selectX9;
let selectY1;
let selectY2;
let selectY3;
let selectY4;
let selectY5;
let selectY6;
let selectY7;
let selectY8;
let selectY9;
let player1 = true;
let vakjeX;
let vakjeY;
let vakje10 = 150;          // lijn ^V 1 circle
let vakje1X = 50;           // lijn ^V 1 square
let vakje1Y0 = 100;         // lijn <> 1 circle
let vakje1YX = 0;           // lijn <> 1 square
let vakje20 = 450;          // lijn ^V 2 circle
let vakje2X = 350;          // lijn ^V 2 square
let vakje2Y0 = 300;         // lijn <> 2 circle
let vakje2YX = 200;         // lijn <> 2 square


function setup() {
    canvas = createCanvas(900,600);
}

function mouseClicked() {
    if (mouseX < 300 && mouseY < 200) {
        if (player1 == true) {
            if (selectX1 == vakje10 && selectY1 == vakje1Y0 || selectX2 == vakje1X && selectY2 == vakje1YX || selectX3 == vakje10 && selectY3 == vakje1Y0 || selectX4 == vakje1X && selectY4 == vakje1YX || selectX5 == vakje10 && selectY5 == vakje1Y0 || selectX6 == vakje1X && selectY6 == vakje1YX || selectX7 == vakje10 && selectY7 == vakje1Y0 || selectX8 == vakje1X && selectY8 == vakje1YX || selectX9 == vakje10 && selectY9 == vakje1Y0) {
                vakjeX = 150;
                vakjeY = 100;
            }
            else if (selectX1 == null) {
                selectX1 = 150;
                selectY1 = 100;
                player1 = false;
            } else if (selectX3 == null) {
                selectX3 = 150;
                selectY3 = 100;
                player1 = false;
            } else if(selectX5 == null) {
                selectX5 = 150;
                selectY5 = 100;
                player1 = false;
            } else if(selectX7 == null) {
                selectX7 = 150;
                selectY7 = 100;
                player1 = false;
            } else if(selectX9 == null) {
                selectX9 = 150;
                selectY9 = 100;
                player1 = false;
            }
        } else { 
            if (selectX1 == vakje10 && selectY1 == vakje1Y0 || selectX2 == vakje1X && selectY2 == vakje1YX || selectX3 == vakje10 && selectY3 == vakje1Y0 || selectX4 == vakje1X && selectY4 == vakje1YX || selectX5 == vakje10 && selectY5 == vakje1Y0 || selectX6 == vakje1X && selectY6 == vakje1YX || selectX7 == vakje10 && selectY7 == vakje1Y0 || selectX8 == vakje1X && selectY8 == vakje1YX || selectX9 == vakje10 && selectY9 == vakje1Y0) {
                vakjeX = 150;
                vakjeY = 100;
            } else if (selectX2 == null) {
                selectX2 = 50;
                selectY2 = 0;
                player1 = true;
            } else if(selectX4 == null) {
                selectX4 = 50;
                selectY4 = 0;
                player1 = true;
            } else if(selectX6 == null) {
                selectX6 = 50;
                selectY6 = 0;
                player1 = true;
            } else if(selectX8 == null) {
                selectX8 = 50;
                selectY8 = 0;
                player1 = true;
            }
        }
    } else if(mouseX < 300 && mouseY < 400) {
        if (player1 == true) {
            if (selectX1 == vakje10 && selectY1 == vakje1Y0 || selectX2 == vakje1X && selectY2 == vakje1YX || selectX3 == vakje10 && selectY3 == vakje1Y0 || selectX4 == vakje1X && selectY4 == vakje1YX || selectX5 == vakje10 && selectY5 == vakje1Y0 || selectX6 == vakje1X && selectY6 == vakje1YX || selectX7 == vakje10 && selectY7 == vakje1Y0 || selectX8 == vakje1X && selectY8 == vakje1YX || selectX9 == vakje10 && selectY9 == vakje1Y0) {
                vakjeX = 150;
                vakjeY = 100;
            }
            if (selectX1 == null) {
                selectX1 = 150;
                selectY1 = 300;
                player1 = false;
            } else if (selectX3 == null) {
                selectX3 = 150;
                selectY3 = 300;
                player1 = false;
            }
        }
    } else if(mouseX < 300 && mouseY < 600) {
        if (player1 == true) {
            if (selectX1 == null) {
                selectX1 = 150;
                selectY1 = 500;
            } else if(selectX3 == null) {
                selectX3 = 150;
                selectY3 = 500;
            }
            player1 = !player1;
        }
    } else if(mouseX < 600 && mouseY < 200) {
        selectX4 = 350;
        selectY4 = 0;
    } else if(mouseX < 600 && mouseY < 400) {
        selectX5 = 450;
        selectY5 = 300;
    } else if(mouseX < 600 && mouseY < 600) {
        selectX6 = 350;
        selectY6 = 400;
    } else if(mouseX < 900 && mouseY < 200) {
        selectX7 = 750;
        selectY7 = 100;
    } else if(mouseX < 900 && mouseY < 400) {
        selectX8 = 650;
        selectY8 = 200;
    } else if(mouseX < 900 && mouseY < 600) {
        selectX9 = 750;
        selectY9 = 500;
    }
}

function draw() {
    background(200);
    fill(0);
    line(300,0,300,600);
    line(600,0,600,600);
    line(0,200,900,200);
    line(0,400,900,400);
    fill(0,0,255);
    circle(selectX1,selectY1,200);
    circle(selectX3,selectY3,200);
    circle(selectX5,selectY5,200);
    circle(selectX7,selectY7,200);
    circle(selectX9,selectY9,200);
    fill(255,0,0);
    rect(selectX2,selectY2,200,200);
    rect(selectX4,selectY4,200,200);
    rect(selectX6,selectY6,200,200);
    rect(selectX8,selectY8,200,200);
    fill(0);
    text("Vakje is al gevuld!",vakjeX,vakjeY);
    console.log(mouseX + " x coordinate");
    console.log(mouseY + " y coordinate");
}