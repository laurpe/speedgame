const startBtn = document.querySelector("#start");
const stopBtn = document.querySelector("#stop");
const closeBtn = document.querySelector("#close");
const overlay = document.querySelector(".overlay");
const circles = document.querySelectorAll(".circle");
const scoreText = document.querySelector("#score");
const result = document.querySelector("#result");

let active = 0;
let score = 0;
let pace = 1000;
let timer;
let rounds = 0;

circles.forEach((circle, index) => {
    circle.addEventListener("click", () => {
        clickedCircle(index);
    });
});

const clickedCircle = (i) => {
    if (i !== active) {
        endGame();
    } else {
        score++;
        rounds--;
        scoreText.textContent = score;
    }
};

const startGame = () => {
    startBtn.style.display = "none";
    stopBtn.style.display = "inline";

    circles.forEach((circle) => {
        circle.style.pointerEvents = "auto";
    });

    let nextActive = pickNew(active);

    circles[nextActive].classList.toggle("active");
    circles[active].classList.remove("active");

    active = nextActive;
    console.log("active circle: ", active);
    timer = setTimeout(startGame, pace);
    pace = pace - 10;

    if (rounds >= 5) {
        endGame();
    }

    rounds++;

    function pickNew(active) {
        let nextActive = Math.floor(Math.random() * 4);

        if (nextActive != active) {
            return nextActive;
        } else {
            return pickNew(active);
        }
    }

    console.log("score", score);
};

const endGame = () => {
    console.log("game ended");
    overlay.style.visibility = "visible";
    clearTimeout(timer);
    result.textContent = `Your score is ${score}`;
};

const reloadGame = () => {
    window.location.reload();
};

startBtn.addEventListener("click", startGame);
stopBtn.addEventListener("click", endGame);
closeBtn.addEventListener("click", reloadGame);
