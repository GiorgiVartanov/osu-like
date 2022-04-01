const startButton = document.querySelector(".start-button");
const gamePanel = document.querySelector(".gamePanel");
const scoresElement = document.querySelector(".scores");
const addingScoresElement = document.querySelector(".adding-scores ");

let circle;
let disappearing;
let scores = 0;
let playing = false;

let audio = new Audio("assets/sounds/click.wav");

startButton.addEventListener("click", () => {
    playing ? end() : start();
    playing = !playing;
});

gamePanel.addEventListener("click", function (event) {
    if (playing) {
        var isClickInsideElement = circle.contains(event.target);
        if (!isClickInsideElement) {
            changeScore(-1);
        }
    }
});

if (gamePanel.childNodes[0]) {
    circle = document.querySelector(".circle");
}

// if (circle)
//     circle.addEventListener("click", () => {
//         console.log("removing circle");
//         gamePanel.removeChild(".circle");
//     });

function start() {
    startButton.innerHTML = "end";

    //createCircle(40, 40);
    // createCircle(380, 380);

    createCircle(210, 210);

    function createCircle(x, y) {
        let createdCircle = document.createElement("div");
        createdCircle.classList.add("circle");
        gamePanel.appendChild(createdCircle);
        circle = document.querySelector(".circle");
        circle.style.left = x + "px";
        circle.style.top = y + "px";

        circle.addEventListener("click", () => {
            audio.play();
            if (disappearing) clearTimeout(disappearing);
            circle.classList.add("anim-class");
            setTimeout(() => {
                circle.remove();

                changeScore(1);

                setTimeout(() => {
                    createCircle(
                        Math.floor(Math.random() * 340 + 40),
                        Math.floor(Math.random() * 340 + 40)
                    );
                }, 100);
            }, 100);
        });

        disappearing = setTimeout(() => {
            circle.remove();

            changeScore(-1);

            createCircle(
                Math.floor(Math.random() * 340 + 40),
                Math.floor(Math.random() * 340 + 40)
            );
        }, 1400);
    }
}

function end() {
    if (disappearing) clearTimeout(disappearing);
    startButton.innerHTML = "start";

    circle.remove();
    scores = 0;
    scoresElement.innerHTML = scores;
}

function changeScore(sc) {
    addingScoresElement.style.color = sc > 0 ? "#66f576" : "#DB4944";
    addingScoresElement.innerHTML = sc > 0 ? "+" + sc : sc;
    addingScoresElement.style.display = "block";
    setTimeout(() => {
        addingScoresElement.style.display = "none";
    }, 200);
    scores += sc;
    scoresElement.innerHTML = scores;
}
