const startButton = document.querySelector(".start-button");
const gamePanel = document.querySelector(".gamePanel");
let circle;

let playing = false;

startButton.addEventListener("click", () => {
    playing ? end() : start();
    playing = !playing;
});

if (gamePanel.childNodes[0]) {
    circle = document.querySelector(".circle");
}

if (circle)
    circle.addEventListener("click", () => {
        console.log("removing circle");
        gamePanel.removeChild(".circle");
    });

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
            gamePanel.removeChild(circle);

            setTimeout(() => {
                createCircle(
                    Math.floor(Math.random() * 340 + 40),
                    Math.floor(Math.random() * 340 + 40)
                );
            }, 100);
        });
    }
}

function end() {
    startButton.innerHTML = "start";
}
