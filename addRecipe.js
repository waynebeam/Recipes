
var newRecipeSteps = document.getElementById('new-recipe-steps');
var addStepBtn = document.getElementById('add-step');
var saveBtn = document.getElementById('save-recipe');
var cancelBtn = document.getElementById('cancel-recipe');
var pasteBtn = document.getElementById('paste-recipe');
var recipes = [];

function init() {
  loadRecipes();
  buildEmptyRecipe();

}

function loadRecipes() {
  var recipesRaw = localStorage.getItem('recipes');
  if (recipesRaw) {
    recipes = JSON.parse(recipesRaw);
  } else {
    recipes = [];
  }
}

function buildEmptyRecipe() {
  var firstStep = document.createElement('li');
  addNameToFirstStep(firstStep);

  addRecipeStep(newRecipeSteps, firstStep);
}

function addNameToFirstStep(li) {
  var nameField = document.createElement('input');

  nameField.setAttribute('type', 'text');
  nameField.setAttribute('id', 'name');
  nameFieldLabel = document.createElement('label');
  nameFieldLabel.setAttribute('for', 'name');
  nameFieldLabel.innerHTML = 'Name of Recipe: ';


  li.appendChild(nameFieldLabel);
  li.appendChild(nameField);
  li.appendChild(document.createElement("br"))
}


function addRecipeStep(ol, li) {
  var directionField = document.createElement('input');
  directionField.setAttribute('type', 'text');
  directionField.setAttribute('id', 'direction');
  directionFieldLabel = document.createElement('label');
  directionFieldLabel.setAttribute('for', 'direction');
  directionFieldLabel.innerHTML = 'Next Step: ';
  var timeField = document.createElement('input');
  timeField.setAttribute('type', 'number');
  timeField.setAttribute('id', 'time');
  timeFieldLabel = document.createElement('label');
  timeFieldLabel.setAttribute('for', 'time');
  timeField.setAttribute('min', '0');
  timeField.setAttribute('value', '0');
  timeFieldLabel.innerHTML = 'Time (minutes): ';

  li.appendChild(directionFieldLabel);
  li.appendChild(directionField);
  li.appendChild(document.createElement("br"));
  li.appendChild(timeFieldLabel);
  li.appendChild(timeField);
  li.appendChild(document.createElement("hr"));

  ol.appendChild(li);
}

function validateStep(li) {
  return true;
  //this function is called when the user clicks the add step button
  //it checks the validity of the input fields
  //if the fields are valid, it adds the step to the list of steps
  //if the fields are invalid, it shows the error message
}

function pasteButtonPressed() {
  var rawPaste;
  navigator.clipboard.readText().then(function(text) {
    rawPaste = text;
    dataPasted(rawPaste);
  });
}

function dataPasted(data) {


  try {
    data = JSON.parse(data);
    if (validateRecipe(data)) {
      displayAllSteps(data);
    }
  }
  catch (e) {
    pasteBtn.innerHTML = 'Invalid!';
    pasteBtn.style.color = 'red';
    setTimeout(function() {
      pasteBtn.innerHTML = 'Paste Recipe';
      pasteBtn.style.color = 'black';

    }, 1000);
  }
}

function validateRecipe(recipe) {
  recipe.forEach(function(step) {
    if ("direction" in step == false) {
      return false;
    }
    if (step.direction == "") {
      return false;
    }
    if ("time" in step == false) {
      return false;
    }
    if (isNaN(step.time)) {
      return false;
    }
  });
  if ("name" in recipe[0] == false) {
    return false;
  }
  return true;
}

function displayAllSteps(recipe) {
  var newOl = document.createElement('ol');
  var firstStep = document.createElement('li');
  addNameToFirstStep(firstStep);
  addRecipeStep(newOl, firstStep);

  newOl.childNodes[0].querySelector('#name').value = recipe[0].name;
  newOl.childNodes[0].querySelector('#direction').value = recipe[0].direction;
  newOl.childNodes[0].querySelector('#time').value = recipe[0].time;

  for (var i = 1; i < recipe.length; i++) {
    var li = document.createElement('li');
    addRecipeStep(newOl, li);

    li.querySelector('#direction').value = recipe[i].direction;
    li.querySelector('#time').value = recipe[i].time;
  };

  newRecipeSteps.replaceWith(newOl);
  newRecipeSteps = newOl;
}

addStepBtn.addEventListener('click', function() {
  if (validateStep(newRecipeSteps.childNodes[newRecipeSteps.childElementCount - 1])) {
    addRecipeStep(newRecipeSteps, document.createElement('li'));
  }
});

saveBtn.addEventListener('click', function() {
  recipe = [];
  var steps = newRecipeSteps.childElementCount;
  //console.log(newRecipeSteps.childNodes[0].querySelector('#name').value);
  var step1 = {
    name: newRecipeSteps.childNodes[0].querySelector('#name').value,
    direction: newRecipeSteps.childNodes[0].querySelector('#direction').value,
    time: newRecipeSteps.childNodes[0].querySelector('#time').value
  };
  recipe.push(step1);
  if (steps > 1) {
    for (var i = 1; i < steps; i++) {
      step = {
        direction: newRecipeSteps.childNodes[i].querySelector('#direction').value,
        time: newRecipeSteps.childNodes[i].querySelector('#time').value
      };
      recipe.push(step);
    }
  }

  recipes.push(recipe);
  localStorage.setItem('recipes', JSON.stringify(recipes));

});

cancelBtn.addEventListener('click', function() {
  window.location.href = 'index.html';
});

pasteBtn.addEventListener('click', pasteButtonPressed);

init();