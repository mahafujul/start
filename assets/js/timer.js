let urlParams = new URLSearchParams(window.location.search);
let timer = document.querySelector("timer");
// let title = document.querySelector("title");
let timeStarts = urlParams.get("time") * 60 || 1500;
let timeRemaining = timeStarts;
let running = true;
let breakTime = false;

updateTimer();

document.onkeyup = function (event) {
  // pause | play using `space` = 32
  if (event.keyCode == 32) {
    running = !running;
  }
  // reset using `R` = 82 || 114
  if (event.keyCode == 82) {
    resetTimer();
  }
  // skip to next using `S` = 83 || 115
  if (event.keyCode == 83) {
    skipForword();
  }
};

timer.addEventListener("click", function () {
  running = !running;
});

setInterval(updateTimer, 1000);

function updateTimer() {
  if (timeRemaining <= 0) {
    skipForword();
  }
  if (running) {
    time = convertTime(timeRemaining--);
    // title.innerHTML = time;
    timer.innerHTML = time;
  }
}

function convertTime(seconds) {
  if (seconds < 0) return "00:00";

  minutes = Math.floor(seconds / 60);
  seconds = seconds % 60;

  if (minutes < 10) minutes = `0${minutes}`;

  if (seconds < 10) seconds = `0${seconds}`;

  return `${minutes}:${seconds}`;
}

function resetTimer() {
  timeRemaining = timeStarts;
  timer.innerHTML = convertTime(timeRemaining);
}

function skipForword() {
  if (breakTime == false) {
    breakTime = !breakTime;
    timeStarts = 300;
    timeRemaining = timeStarts;
    document.getElementById("timer").className = "breakTime";
  } else {
    breakTime = !breakTime;
    timeStarts = 1500;
    timeRemaining = timeStarts;
    document.getElementById("timer").className = "workTime";
  }
  if (!running) {
    timer.innerHTML = convertTime(timeRemaining);
  }
}
