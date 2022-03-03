const startBtn = document.querySelector("#start");
const stopBtn = document.querySelector("#stop");

const gameOverAlert = document.querySelector(".game-over");

const closeAlertBtn = document.querySelector(".close");

stopBtn.addEventListener("click", () => {
    gameOverAlert.classList.remove("hidden");
});

closeAlertBtn.addEventListener("click", () => {
    gameOverAlert.classList.add("hidden");
});
