const baseUrl = "https://pokeapi.co/api/v2/pokemon/";

const spritesBaseUrl ="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/";

let currentLastIndex = 1;

let currentOverlayPokemonIndex = "";

let originalContent = "";

let isSearchActive = false;

async function loadData() {
  toggleDisplay();
  for (let index = currentLastIndex; index < currentLastIndex + 20; index++) {
    let response = await fetch(baseUrl + index);
    let responseAsJson = await response.json();
    document.getElementById("contentWrapper").innerHTML += getCardTemplate(responseAsJson, index);
    for (let indexElement = 0; indexElement < responseAsJson.types.length; indexElement++) {
      let type = responseAsJson.types[indexElement].type.name;
      document.getElementById(`cardType${index}`).innerHTML += getTypeTemplate(type);
      document.getElementById(`cardBackground${index}`).classList.add(`${responseAsJson.types[0].type.name}Bg`);
    }
  }
  currentLastIndex += 20;
  toggleDisplay();
  updateAndScrollDown();
}


function search() {
  let inputRef = document.getElementById("searchField").value.trim().toLowerCase();
  if (inputRef.length > 2) {
    isSearchActive = true;
    if (!originalContent) {
      originalContent = document.getElementById("contentWrapper").innerHTML;
    }
    document.getElementById("contentWrapper").innerHTML = "";
    document.getElementById("loadBtn").classList.add("dNone");
    searchIteration(inputRef);
  } else {
    isSearchActive = false;
    if (originalContent) {
      document.getElementById("contentWrapper").innerHTML = originalContent;
      document.getElementById("loadBtn").classList.remove("dNone");
    }
  }
}

async function searchIteration(inputRef) {
  for (let index = 1; index < 152; index++) {
    let response = await fetch(baseUrl + index);
    let responseAsJson = await response.json();
    if (responseAsJson.name.startsWith(inputRef)) {
      document.getElementById("contentWrapper").innerHTML += getCardTemplate(responseAsJson, index);
      for (let indexElement = 0; indexElement < responseAsJson.types.length; indexElement++) {
        let type = responseAsJson.types[indexElement].type.name;
        document.getElementById(`cardType${index}`).innerHTML += getTypeTemplate(type);
        document.getElementById(`cardBackground${index}`).classList.add(`${responseAsJson.types[0].type.name}Bg`);
      }
    } 
  }
}

async function renderOverlayCard(index) {
  let response = await fetch(baseUrl + index);
  let responseAsJson = await response.json();
  let previousIndex = index - 1;
  let nextIndex = index + 1;
  prepareOverlayAnimation(index);
  document.getElementById("overlayCard").innerHTML = getOverlayTemplate(responseAsJson, index, nextIndex, previousIndex);
  document.getElementById("overlayBlurredBg").classList.toggle("dNone");
  document.body.style.overflowY = "hidden";
  document.getElementById("searchField").classList.toggle("dNone");
  if (!isSearchActive) {
    document.getElementById("loadBtn").classList.toggle("dNone");
  }
  executeOverlayAnimation();
  typesOverlayIteration(responseAsJson);
  abilitiesOverlayIteration(responseAsJson);
}


function closeOverlay(index){
  document.getElementById("searchField").classList.toggle("dNone");
  if (!isSearchActive) {
    document.getElementById("loadBtn").classList.toggle("dNone");
  }
  currentOverlayPokemonIndex = index;
  executeOverlayClosingAnimation(index);
  setTimeout(() => {
    document.getElementById("overlayCard").classList.toggle("dNone");
    document.getElementById("overlayBlurredBg").classList.toggle("dNone");
    document.body.style.overflowY = "auto";
  },400);
  
  
}

async function nextPokemon(index) {
  if (index === currentLastIndex) {
    index = 1;
    let nextIndex = 2;
    let previousIndex = currentLastIndex - 1;
    let response = await fetch(baseUrl + index);
    let responseAsJson = await response.json();
    document.getElementById("overlayCard").innerHTML = getOverlayTemplate(responseAsJson, index, nextIndex, previousIndex);
    typesOverlayIteration(responseAsJson);
    abilitiesOverlayIteration(responseAsJson);
  } else {
    let nextIndex = index + 1;
    let previousIndex = index - 1;
    let response = await fetch(baseUrl + index);
    let responseAsJson = await response.json();
    document.getElementById("overlayCard").innerHTML = getOverlayTemplate(responseAsJson, index, nextIndex, previousIndex);
    typesOverlayIteration(responseAsJson);
    abilitiesOverlayIteration(responseAsJson);
  }
}  

async function previousPokemon(index) {
  if (index === 0) {
    index = currentLastIndex - 1;
    let nextIndex = 1;
    let previousIndex = currentLastIndex - 2;
    let response = await fetch(baseUrl + index);
    let responseAsJson = await response.json();
    document.getElementById("overlayCard").innerHTML = getOverlayTemplate(responseAsJson, index, nextIndex, previousIndex);
    typesOverlayIteration(responseAsJson);
    abilitiesOverlayIteration(responseAsJson);
  } else {
    let nextIndex = index + 1;
    let previousIndex = index - 1;
    let response = await fetch(baseUrl + index);
    let responseAsJson = await response.json();
    document.getElementById("overlayCard").innerHTML = getOverlayTemplate(responseAsJson, index, nextIndex, previousIndex);
    typesOverlayIteration(responseAsJson);
    abilitiesOverlayIteration(responseAsJson);
  }
}  

function typesOverlayIteration(responseAsJson){
  for ( let indexElement = 0; indexElement < responseAsJson.types.length; indexElement++) {
    let type = responseAsJson.types[indexElement].type.name;
    document.getElementById("overlayElement").innerHTML += getTypeTemplate(type);
  };
}

function abilitiesOverlayIteration(responseAsJson){
  for ( let indexAbility = 0; indexAbility < responseAsJson.abilities.length; indexAbility++) {
    let Ability = responseAsJson.abilities[indexAbility].ability.name;
    document.getElementById("overlayRightBottom").innerHTML += getAbilityTemplate(Ability);
  };
}