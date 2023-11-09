var one = document.getElementById("one").innerText;
var minute = document.getElementById("minute").innerText;
var currentTime = document.getElementById("currentTime").innerText;
var timer = 0;
function draw() {
    timer += deltaTime / 1000;
    if (timer >= 5) {
        timer = 0;
        if (currentTime == "08:42") {
            document.getElementById("currentTime").innerText = "";
            document.getElementById("one").innerText = "1";
            document.getElementById("minute").innerText = "minuut";
            currentTime = document.getElementById("currentTime").innerText;
            minute = document.getElementById("minute").innerText;
            one = document.getElementById("one").innerText;
        } else if (one == "1" && minute == "minuut") {
            document.getElementById("currentTime").innerText = "08:42";
            document.getElementById("one").innerText = "";
            document.getElementById("minute").innerText = "";
            currentTime = document.getElementById("currentTime").innerText;
            minute = document.getElementById("minute").innerText;
            one = document.getElementById("one").innerText;
        }
    }
}