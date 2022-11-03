
var currentStep = 0;
var currentTime = 0;
var runningTimer;
var currentRecipe;
var interval = 100;


var nextButton = document.getElementById("next-button");
var startButton = document.getElementById("start-button");
var directionsList = document.getElementById("directions-list");
var currentStepText = document.getElementById("current-step");
var currentStepTime = document.getElementById("current-step-time");
var continuous = document.getElementById("continuous");
var timer = document.getElementById("timer");
var testMode = document.getElementById("test-mode");

var timerDoneSound = document.getElementById("timer-done-sound");
var sounds = document.getElementById("sounds");

function init() {

setCurrentRecipe();
  currentRecipe.forEach(function(currentstep) {
    var direction = document.createElement("li");
    direction.innerHTML = currentstep.direction
    if(currentstep.time > 0){
    direction.innerHTML += " (" + formatTime(currentstep.time*60) + ")";
    }
    directionsList.appendChild(direction);

  });
  displayCurrentStep();
  updateDirectionListStyle();
  setTimer();
  updateTimerDisplay();
};

function formatTime(time){
  var output = "";
  var minutes = Math.floor(time / 60);
  var seconds = time % 60;
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  output = minutes + ":" + seconds;
  return output;
}

function setCurrentRecipe(){
  currentRecipe = JSON.parse(sessionStorage.getItem("recipe"));
  
;}

function displayCurrentStep() {
  currentStepText.innerHTML = "Current Step: " + currentRecipe[currentStep].direction;
  if (currentRecipe[currentStep].time > 0) {
    currentStepTime.innerHTML = "Step time: " + formatTime(currentRecipe[currentStep].time*60);
  }
  else {
    currentStepTime.innerHTML = "-";
  }

}

function setTimer() {

  currentTime = currentRecipe[currentStep].time * 60;

}

function start() {

  runningTimer = setInterval(runClock, interval);

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
  clearInterval(runningTimer);

  currentStep++;
  updateDirectionListStyle();

  if (currentStep < currentRecipe.length) {
    displayCurrentStep();
    setTimer();
    updateTimerDisplay();
    
    if (continuous.checked && currentRecipe[currentStep].time > 0) {
      start();
    }
  } else {
    
    currentStepText.innerHTML = "Done!";
    currentStepTime.innerHTML = "Finished!";
  }
}

function updateDirectionListStyle() {
  for (var i = 0; i < directionsList.children.length; i++) {
    directionsList.children[i].style = "font-weight: normal; font-size: 1em;";

  }
  if(currentStep < currentRecipe.length)
{
  directionsList.children[currentStep].style = "font-weight: bold; font-size: 1.5em;";
  }
}

startButton.addEventListener("click", start);
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