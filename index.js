let timeDisplay = document.querySelector("#timeDisplay");
let startButton = document.querySelector("#startButton");
let pauseButton = document.querySelector("#pauseButton");
let resetButton = document.querySelector("#resetButton");

let startTime = 0;
let elapsedTime = 0;
let currentTime = 0;
let paused = true;
let intervalId;
let hours = 0;
let minutes = 0;
let seconds = 0;
let miliseconds = 0;

startButton.addEventListener("click", () => {
    if(paused){
        paused = false;
        startTime = Date.now() - elapsedTime;
        intervalId = setInterval(updateTime, 129);
    }
});

pauseButton.addEventListener("click", () => {
    if(!paused){
        paused = true;
        elapsedTime = Date.now() - startTime;
        clearInterval(intervalId);
        startButton.textContent = "Resume";
    }
});

resetButton.addEventListener("click", () => {
    paused = true;
    clearInterval(intervalId);

    startTime = 0;
    elapsedTime = 0;
    currentTime = 0;
    hours = 0;
    minutes = 0;
    seconds = 0;

    timeDisplay.textContent = "00:00:00.000"
    startButton.textContent = "Start";
});

function updateTime(){
    elapsedTime = Date.now() - startTime;

    miliseconds = Math.floor(elapsedTime % 1000);
    seconds = Math.floor((elapsedTime / 1000) % 60);
    minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    hours = Math.floor((elapsedTime / (1000 * 3600)) % 60);
    miliseconds = padMiliseconds(miliseconds);
    seconds = pad(seconds);
    minutes = pad(minutes);
    hours = pad(hours);

    function pad(unit){
        return (("0") + unit).length > 2 ? unit : ("0") + unit;
    }

    function padMiliseconds(unit){
        let oneDigit = ("00") + unit;
        let twoDigits = ("0") + unit;
        return oneDigit.length < 4 ? oneDigit : (twoDigits.length < 4 ? twoDigits : unit);
    }

    timeDisplay.textContent = `${hours}:${minutes}:${seconds}.${miliseconds}`;
}