recipeList = document.getElementById('recipe-list');

var recipes;

function loadRecipes() {
  var recipesRaw = localStorage.getItem('recipes');
  if (recipesRaw) {
    recipes = JSON.parse(recipesRaw);
  } else {
    recipes = [];
  }

  var pourOverRecipe = [
    {
      name: 'Pour Over (Sample)',
      direction: "grind 20g coffee medium-fine",
      time: 0
    },
    {
      direction: "heat 500mL water to 202F",
      time: 0
    },
    {
      direction: "pour 50g water onto grounds",
      time: .75
    },
    {
      direction: "pour 150g water to reach 200g total",
      time: .5
    },
    {
      direction: "pour 130g water to reach 330g total",
      time: .5
    },
    {
      direction: "allow coffee to finish draining",
      time: 2
    }
  ];
  var testRecipie = [
    {
      name: "Test Recipe (Sample)",
      direction: "Follow step one to do the thing",
      time: .3
    }, {
      direction: "Then do this likewise",
      time: .5

    }, {
      direction: "Chop, stew, heat, stir ",
      time: .2
    }, {
      direction: "Bake, cool, serve!",
      time: .4

    }
  ];
  recipes.push(pourOverRecipe);
  recipes.push(testRecipie);
}


function buildContents() {

  recipes.forEach(function(recipe, i) {
    var li = document.createElement('li');
    var link = document.createElement('button');
    link.innerHTML = recipe[0].name;
    var copy = document.createElement('button');
    copy.innerHTML = '📋';
    li.appendChild(link);
    li.appendChild(copy);
    recipeList.appendChild(li);
    link.addEventListener('click', function() {
      viewRecipePage(i);
    });
    copy.addEventListener('click', function() {
      copyRecipe(recipes[i],this);
    });
  

  });
}

function viewRecipePage(i) {

  var chosenRecipe = recipes[i];
  var recipeJson = JSON.stringify(chosenRecipe);
  sessionStorage.setItem('recipe', recipeJson);
  window.location.href ='recipe.html';
}

function copyRecipe(recipe, btn){
  var recipeString = JSON.stringify(recipe);

  navigator.clipboard.writeText(recipeString);
  btn.innerHTML = "Copied!";
  setTimeout(function() {
    btn.innerHTML = "📋";
  
  }, 1000);
}


function onLoad(){
  loadRecipes();
  buildContents();
}

onLoad();