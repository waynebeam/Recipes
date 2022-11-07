recipeList = document.getElementById('recipe-list');

let recipes;
let sampleRecipes;

function loadRecipes() {
  let recipesRaw = localStorage.getItem('recipes');
  if (recipesRaw) {
    recipes = JSON.parse(recipesRaw);
  } else {
    recipes = [];
  }

  const pourOverRecipe = [
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
  const testRecipe = [
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
  sampleRecipes = [pourOverRecipe,testRecipe];
}


function buildContents() {
  deleteTableOfContents();

  recipes.forEach(function(recipe, i) {
    createTableEntry(recipe, i, recipes);
  });
  sampleRecipes.forEach(function(recipe, i) {
    createTableEntry(recipe, i, sampleRecipes);
  });
}

function createTableEntry(recipe, i, list){
  let li = document.createElement('li');
  let link = document.createElement('button');
  link.innerHTML = recipe[0].name;
  let copy = document.createElement('button');
  copy.innerHTML = '📋';
  let deleteBtn = document.createElement('button');
  deleteBtn.innerHTML = '🚫';
  li.appendChild(link);
  li.appendChild(copy);
  li.appendChild(deleteBtn);
  recipeList.appendChild(li);
  link.addEventListener('click', function() {
    viewRecipePage(i, list);
  });
  copy.addEventListener('click', function() {
    copyRecipe(list[i], this);
  });
  deleteBtn.addEventListener('click', function() {
    if(verifyDeleteRecipe()){
      deleteRecipe(list[i], this);
    }

  });

}

function deleteTableOfContents() {
    let list = document.getElementById("recipe-list");
    while (list.hasChildNodes()) {
        list.removeChild(list.firstChild);
    }
}

function viewRecipePage(i) {

  let chosenRecipe = recipes[i];
  let recipeJson = JSON.stringify(chosenRecipe);
  sessionStorage.setItem('recipe', recipeJson);
  window.location.href = 'recipe.html';
}

function copyRecipe(recipe, btn) {
  let recipeString = JSON.stringify(recipe);

  navigator.clipboard.writeText(recipeString)
      .then(function() {btn.innerHTML = "Copied!";});
  setTimeout(function() {
    btn.innerHTML = "📋";

  }, 1000);
}

function verifyDeleteRecipe(){

  return confirm("Are you sure you want to delete this recipe?");
}

function deleteRecipe(recipe, btn) {

  const index = recipes.indexOf(recipe);
  recipes.splice(index, 1);
  buildContents();
  saveRecipes();
  let recipeList = document.getElementById("recipe-list");
  if (!recipeList.hasChildNodes()) {
    let link = document.createElement('button');
    link.innerHTML = 'Add New Recipe';
    recipeList.appendChild(link);
    link.addEventListener('click', function() {
      window.location.href ='addRecipe.html';
    });
  }
}

function saveRecipes() {
  let recipesJson = JSON.stringify(recipes);
  localStorage.setItem('recipes', recipesJson);
}

function onLoad() {
  loadRecipes();
  buildContents();
}

onLoad();