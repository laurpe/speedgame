function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function () {
        this.sound.play();
    };
    this.stop = function () {
        this.sound.pause();
    };
}

let music = new sound("puppy_playing_in_the_garden.ogg");
let gameOver = new sound("game_over.wav");

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
    music.play();

    startBtn.style.display = "none";
    stopBtn.style.display = "inline";

    circles.forEach((circle) => {
        circle.style.pointerEvents = "auto";
    });

    let nextActive = pickNew(active);

    circles[nextActive].classList.toggle("active");
    circles[active].classList.remove("active");

    rotateImage(circles[nextActive]);

    active = nextActive;
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
    music.stop();
    gameOver.play();
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

const rotateImage = (circle) => {
    let max = 360;
    let min = -360;
    let degrees = Math.floor(Math.random() * (max - min) + min);
    circle.style.transform = `rotate(${degrees}deg)`;
};
