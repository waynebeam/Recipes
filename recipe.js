
var currentStep = 0;
var currentTime = 0;
var runningTimer;
var currentRecipe;
var interval = 100;

let directionsList = document.getElementById("directions-list");
let nextButton = document.getElementById("next-button");
let startButton = document.getElementById("start-button");
let currentStepText = document.getElementById("current-step");
let currentStepTime = document.getElementById("current-step-time");
let continuous = document.getElementById("continuous");
let timer = document.getElementById("timer");
let testMode = document.getElementById("test-mode");

let timerDoneSound = document.getElementById("timer-done-sound");
let sounds = document.getElementById("sounds");


function init() {

  setCurrentRecipe();
  currentRecipe.forEach(function(currentstep) {
    let direction = document.createElement("li");
    direction.innerHTML = currentstep.direction
    if (currentstep.time > 0) {
      direction.innerHTML += " (" + formatTime(currentstep.time * 60) + ")";
    }
    directionsList.appendChild(direction);

  });
  displayCurrentStep();
  updateDirectionListStyle();
  setTimer();
  updateTimerDisplay();
};

function setCurrentRecipe() {
  currentRecipe = JSON.parse(sessionStorage.getItem("recipe"));

}

function formatTime(time) {
  let output = "";
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  output = minutes + ":" + seconds;
  return output;
}


function displayCurrentStep() {
  currentStepText.innerHTML = "Current Step: " + currentRecipe[currentStep].direction;
  if (currentRecipe[currentStep].time > 0) {
    currentStepTime.innerHTML = "Step time: " + formatTime(currentRecipe[currentStep].time * 60);
  }
  else {
    currentStepTime.innerHTML = "-";
  }

}

function setTimer() {

  currentTime = currentRecipe[currentStep].time * 60;

}

function startOrPause() {
  if (currentTime > 0) {
    if (runningTimer == undefined) {
      runningTimer = setInterval(runClock, interval);
      startButton.innerHTML = "Pause";
    } else {
      clearTimer();
    }
  } else {
    advanceCurrentStep();
  }
}

function clearTimer() {

  clearInterval(runningTimer);
  runningTimer = undefined;
  startButton.innerHTML = "Start!";
}

function updateTimerDisplay() {

  timer.innerHTML = formatTime(currentTime);
}

function runClock() {

  if (currentTime > 0) {
    currentTime -= 1;
    updateTimerDisplay();
  } else {
    if (sounds.checked) {
      timerDoneSound.play();
    }
    advanceCurrentStep();

  }
}

function advanceCurrentStep() {
  clearTimer();

  currentStep++;
  updateDirectionListStyle();

  if (currentStep < currentRecipe.length) {
    displayCurrentStep();
    setTimer();
    updateTimerDisplay();

    if (continuous.checked && currentRecipe[currentStep].time > 0) {
      startOrPause();
    }
  } else {

    currentStepText.innerHTML = "Done!";
    currentStepTime.innerHTML = "Finished!";
    currentTime = 0;
    updateTimerDisplay();
  }
}

function updateDirectionListStyle() {

  for (let direction of directionsList.children) {
    direction.style = "font-weight: normal; font-size: 1em;";
  }

  if (currentStep < currentRecipe.length) {
    directionsList.children[currentStep].style = "font-weight: bold; font-size: 1.5em;";
  }
}

startButton.addEventListener("click", startOrPause);
nextButton.addEventListener("click", function() {
  continuous.checked = false;

  advanceCurrentStep();

});

testMode.addEventListener("change", function() {
  if (testMode.checked) {
    interval = 100;
  }
  else {
    interval = 1000;
  }
});


init();