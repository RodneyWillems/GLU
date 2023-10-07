//grote van de cellen
let cellWidth=100;
let cellHeight=100;

//start positie van het spel
let startXpos=50;
let startYpos=50;
let x;
let y;

//timers
let timer = 0;
let timer2 = 0;
let frames = 0;

let gameEnded = false;

//kleur van de cellen aan het begin
let cell_1_Color = "white";
let cell_2_Color = "white";
let cell_3_Color = "white";
let cell_4_Color = "white";
let cell_5_Color = "white";
let cell_6_Color = "white";
let cell_7_Color = "white";
let cell_8_Color = "white";
let cell_9_Color = "white";
let player1Color = "blue";
let player2Color = "red";

// Variabelen van de spelers
let firstPlayer;
let player1 = 1;
let player2 = 2;
let currentPlayer;
let player1Score = 0;
let player2Score = 0;


function setup(){
    createCanvas(800,600);
    currentPlayer = round(random(1, 2));   //bepalen wie er begint
}

// blokjes neerzetten
function draw(){
    background(200);
    fill(cell_1_Color);
    rect(startXpos, startYpos, cellWidth, cellHeight);

    fill(cell_2_Color);
    rect(startXpos +(cellWidth), startYpos, cellWidth, cellHeight);

    fill(cell_3_Color);
    rect(startXpos +(2*cellWidth), startYpos, cellWidth, cellHeight);

    fill(cell_4_Color);
    rect(startXpos, startYpos+(cellHeight), cellWidth, cellHeight);

    fill(cell_5_Color);
    rect(startXpos +(cellWidth), startYpos+(cellHeight), cellWidth, cellHeight);

    fill(cell_6_Color);
    rect(startXpos +(2*cellWidth), startYpos+(cellHeight), cellWidth, cellHeight);

    fill(cell_7_Color);
    rect(startXpos, startYpos+(2*cellHeight), cellWidth, cellHeight);

    fill(cell_8_Color);
    rect(startXpos +(cellWidth), startYpos+(2*cellHeight), cellWidth, cellHeight);

    fill(cell_9_Color);
    rect(startXpos +(2*cellWidth), startYpos+(2*cellHeight), cellWidth, cellHeight);

    // elke halve seconde checken of iemand heeft gewonnen
    if (timer >= 1) {
        if (cell_1_Color == "blue" && cell_2_Color == "blue" && cell_3_Color == "blue" || cell_1_Color == "red" && cell_2_Color == "red" && cell_3_Color == "red") {
            gameEnded = true;
            if (currentPlayer == 1) {
                player2Score++;
            } else if(currentPlayer == 2) {
                player1Score++;
            } 
        } else if (cell_1_Color == "blue" && cell_4_Color == "blue" && cell_7_Color == "blue" || cell_1_Color == "red" && cell_4_Color == "red" && cell_7_Color == "red") {
            gameEnded = true;
            if (currentPlayer == 1) {
                player2Score++;
            } else if(currentPlayer == 2) {
                player1Score++;
            } 
        } else if (cell_1_Color == "blue" && cell_5_Color == "blue" && cell_9_Color == "blue" || cell_1_Color == "red" && cell_5_Color == "red" && cell_9_Color == "red") {
            gameEnded = true;
            if (currentPlayer == 1) {
                player2Score++;
            } else if(currentPlayer == 2) {
                player1Score++;
            } 
        } else if (cell_2_Color == "blue" && cell_5_Color == "blue" && cell_8_Color == "blue" || cell_2_Color == "red" && cell_5_Color == "red" && cell_8_Color == "red") {
            gameEnded = true;
            if (currentPlayer == 1) {
                player2Score++;
            } else if(currentPlayer == 2) {
                player1Score++;
            } 
        } else if (cell_3_Color == "blue" && cell_6_Color == "blue" && cell_9_Color == "blue" || cell_3_Color == "red" && cell_6_Color == "red" && cell_9_Color == "red") {
            gameEnded = true;
            if (currentPlayer == 1) {
                player2Score++;
            } else if(currentPlayer == 2) {
                player1Score++;
            } 
        } else if (cell_3_Color == "blue" && cell_5_Color == "blue" && cell_7_Color == "blue" || cell_3_Color == "red" && cell_5_Color == "red" && cell_7_Color == "red") {
            gameEnded = true;
            if (currentPlayer == 1) {
                player2Score++;
            } else if(currentPlayer == 2) {
                player1Score++;
            } 
        } else if (cell_4_Color == "blue" && cell_5_Color == "blue" && cell_6_Color == "blue" || cell_4_Color == "red" && cell_5_Color == "red" && cell_6_Color == "red") {
            gameEnded = true;
            if (currentPlayer == 1) {
                player2Score++;
            } else if(currentPlayer == 2) {
                player1Score++;
            } 
        } else if (cell_7_Color == "blue" && cell_8_Color == "blue" && cell_9_Color == "blue" || cell_7_Color == "red" && cell_8_Color == "red" && cell_9_Color == "red") {
            gameEnded = true;
            if (currentPlayer == 1) {
                player2Score++;
            } else if(currentPlayer == 2) {
                player1Score++;
            } 
        } else if (cell_1_Color != "white" && cell_2_Color != "white" && cell_3_Color != "white" && cell_4_Color != "white" && cell_5_Color != "white" && cell_6_Color != "white" && cell_7_Color != "white" && cell_8_Color != "white" && cell_9_Color != "white") {
            currentPlayer = 3;
            gameEnded = true;
        }
        timer = 0;
    }

    fill(0);
    //Bepalen wie de speler is en wie heeft gewonnen of gelijkspel
    if (gameEnded == false) {
        if (currentPlayer == 1){
            text("speler 1 is aan de beurt", 75, 25);
            currentPlayer = 1;
        } else if (currentPlayer == 2){
            text("speler 2 is aan de beurt", 75, 25);
            currentPlayer = 2;
        }
    } else if (gameEnded == true && currentPlayer == 2) {
        text("Speler 1 heeft gewonnen!", 75, 25);
        frames = frameCount;
        if (frames == 30) {
            timer2++;
            frameCount = 0;
        }
    } else if (gameEnded == true && currentPlayer == 1) {
        text("Speler 2 heeft gewonnen!", 75, 25);
        frames = frameCount;
        if (frames == 30) {
            timer2++;
            frameCount = 0;
        } 
    } else if (gameEnded == true && currentPlayer == 3) {
        text("Gelijkspel! Probeer nog een keer!",75,25);
        frames = frameCount;
        if (frames == 30) {
            timer2++;
            frameCount = 0;
        }
    }

    text("Speler 1 heeft: " + player1Score + " punten",100,425);
    text("Speler 2 heeft: " + player2Score + " punten",100,475);

    // elke 2.5 secondes checked het of de game voorbij is en zet het terug naar het begin
    if (timer2 >= 5) {
        if (gameEnded == true) {
            cell_1_Color = "white";
            cell_2_Color = "white";
            cell_3_Color = "white";
            cell_4_Color = "white";
            cell_5_Color = "white";
            cell_6_Color = "white";
            cell_7_Color = "white";
            cell_8_Color = "white";
            cell_9_Color = "white";
            gameEnded = false;
            currentPlayer = round(random(1,2));
            x = null;
            y = null;
        }
        timer2 = 0;
    }

    text("Game is al voorbij!",x,y);

    // timer om te checken wanneer gameEnded is
    if (frameCount == 30) {
        timer++;
        frameCount = 0;
    }
}

// De cell krijgt de kleur van de huidige speler wanneer je erop klikt en wisselt de spelers daarna
function mousePressed() {
    if (gameEnded == true) {
        x = 75;
        y = 50;
    } else {
        if ((mouseX > startXpos &&  mouseX < startXpos + cellWidth) && (mouseY > startYpos && mouseY < startYpos + cellHeight) && (cell_1_Color == "white")) {
            if (currentPlayer == 1) {
                cell_1_Color = player1Color;
                currentPlayer = 2;
            } else {
                cell_1_Color = player2Color;
                currentPlayer = 1;
            }
        } else if ((mouseX > startXpos + cellWidth &&  mouseX < startXpos + (2*cellWidth)) && (mouseY > startYpos && mouseY < startYpos + cellHeight) && (cell_2_Color == "white")) {
            if (currentPlayer == 1) {
                cell_2_Color = player1Color;
                currentPlayer = 2;
            } else {
                cell_2_Color = player2Color;
                currentPlayer = 1;
            }
        } else if ((mouseX > startXpos + cellWidth*2 &&  mouseX < startXpos + (3*cellWidth)) && (mouseY > startYpos && mouseY < startYpos + cellHeight) && (cell_3_Color == "white")) {
            if (currentPlayer == 1) {
                cell_3_Color = player1Color;
                currentPlayer = 2;
            } else {
                cell_3_Color = player2Color;
                currentPlayer = 1;
            }
        } else if ((mouseX > startXpos &&  mouseX < startXpos + (cellWidth)) && (mouseY > startYpos + cellHeight && mouseY < startYpos + (cellHeight*2)) && (cell_4_Color == "white")) {
            if (currentPlayer == 1) {
                cell_4_Color = player1Color;
                currentPlayer = 2;
            } else {
                cell_4_Color = player2Color;
                currentPlayer = 1;
            }
        } else if ((mouseX > startXpos + cellWidth &&  mouseX < startXpos + (2*cellWidth)) && (mouseY > startYpos + cellHeight && mouseY < startYpos + (cellHeight*2)) && (cell_5_Color == "white")) {
            if (currentPlayer == 1) {
                cell_5_Color = player1Color;
                currentPlayer = 2;
            } else {
                cell_5_Color = player2Color;
                currentPlayer = 1;
            }
        } else if ((mouseX > startXpos + cellWidth*2 &&  mouseX < startXpos + (3*cellWidth)) && (mouseY > startYpos + cellHeight && mouseY < startYpos + (cellHeight*2)) && (cell_6_Color == "white")) {
            if (currentPlayer == 1) {
                cell_6_Color = player1Color;
                currentPlayer = 2;
            } else {
                cell_6_Color = player2Color;
                currentPlayer = 1;
            }
        } else if ((mouseX > startXpos &&  mouseX < startXpos + (cellWidth)) && (mouseY > startYpos + (cellHeight*2) && mouseY < startYpos + (cellHeight*3)) && (cell_7_Color == "white")) {
            if (currentPlayer == 1) {
                cell_7_Color = player1Color;
                currentPlayer = 2;
            } else {
                cell_7_Color = player2Color;
                currentPlayer = 1;
            }
        } else if ((mouseX > startXpos + cellWidth &&  mouseX < startXpos + (2*cellWidth)) && (mouseY > startYpos + (cellHeight*2) && mouseY < startYpos + (cellHeight*3)) && (cell_8_Color == "white")) {
            if (currentPlayer == 1) {
                cell_8_Color = player1Color;
                currentPlayer = 2;
            } else {
                cell_8_Color = player2Color;
                currentPlayer = 1;
            }
        } else if ((mouseX > startXpos + cellWidth*2 &&  mouseX < startXpos + (3*cellWidth)) && (mouseY > startYpos + (cellHeight*2) && mouseY < startYpos + (cellHeight*3)) && (cell_9_Color == "white")) {
            if (currentPlayer == 1) {
                cell_9_Color = player1Color;
                currentPlayer = 2;
            } else {
                cell_9_Color = player2Color;
                currentPlayer = 1;
            }
        }
    }
}