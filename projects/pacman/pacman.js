const pacman = document.getElementById("pacman");
var xPos = 0;
var yPos = 0;
var direction = 0;
var animation = 0;
const pngs = [[ "images/pacman1", "images/pacman2"], [ "images/pacman3", "images/pacman4" ]];

document.addEventListener("keydown", keypressHandler);
function keypressHandler(e) {
    for (let i = 0; i < dots.length; i++) {
        const d = document.getElementById("dot" + i);
        if ((Math.abs(xPos + 25 - dots[i].x) < 25) && (Math.abs(yPos + 25 - dots[i].y) < 25)) {
            d.style.background = "black";
        }
    }

    if (e.keyCode === 37) {
        //console.log("left");
        xPos -= 35;
        direction = 1;
    } else if (e.keyCode === 38) {
        //console.log("up")
        yPos -= 35;
    } else if (e.keyCode === 39) {
        //console.log("right")
        xPos += 35;
        direction = 0;
    } else if (e.keyCode === 40) {
        //console.log("down")
        yPos += 35;
    }

    if (xPos - 35 < 0) {
        xPos = 0;
    } else if (xPos > 600) {
        xPos = 600;
    }
    pacman.style.left = xPos + "px";

    if (yPos - 35 < 0) {
        yPos = 0;
    } else if (yPos > 350) {
        yPos = 350;
    }
    pacman.style.top = yPos + "px";

    animation++;
    pacman.src = pngs[direction][animation%2];
}

const dots = [];
for (let i = 20; i < 650; i+=35) {
    for (let j = 20; j < 400; j+=35) {
        let dot = new Object();
        dot.x = i;
        dot.y = j;
        dots.push(dot);
    }
}

for (let i = 0; i < dots.length; i++) {
    var dotDiv = document.createElement("div");
    dotDiv.id = "dot" + i;
    dotDiv.style.background = "yellow";
    dotDiv.style.width = "10px";
    dotDiv.style.height = "10px";
    dotDiv.style.position = "absolute";
    dotDiv.style.borderRadius = "50%";
    dotDiv.style.top = dots[i].y + "px";
    dotDiv.style.left = dots[i].x + "px";
    document.body.appendChild(dotDiv);
}