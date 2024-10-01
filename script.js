const baseUrl = "https://pokeapi.co/api/v2/pokemon/";

const spritesBaseUrl ="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/";

let currentLastIndex = 1;

let currentOverlayPokemonIndex = "";

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





async function renderOverlayCard(index) {
  let response = await fetch(baseUrl + index);
  let responseAsJson = await response.json();
  let previousIndex = index - 1;
  let nextIndex = index + 1;
  
  document.getElementById("overlayCard").innerHTML = getOverlayTemplate(responseAsJson, index, nextIndex, previousIndex);
  document.getElementById("contentWrapper").classList.toggle("dNone");
  document.getElementById("loadBtn").classList.toggle("dNone");
  document.getElementById("overlayCard").classList.toggle("dNone");

  typesOverlayIteration(responseAsJson);
  abilitiesOverlayIteration(responseAsJson);
}

function closeOverlay(index){
  document.getElementById("contentWrapper").classList.toggle("dNone");
  document.getElementById("loadBtn").classList.toggle("dNone");
  document.getElementById("overlayCard").classList.toggle("dNone");
  currentOverlayPokemonIndex = index;
  scrollToLastOpenedPokemon(index);
}

function scrollToLastOpenedPokemon(index){
  let checkPointPokemonCard = document.getElementById(`pokemonCard${index}`);
  let yOffset = 280;
  let cardPosition = checkPointPokemonCard.getBoundingClientRect().top + (window.scrollY - yOffset);
  window.scrollTo({top: cardPosition, behavior: "instant" });
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