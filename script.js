const baseUrl = "https://pokeapi.co/api/v2/pokemon/";

const spritesBaseUrl =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/";

let currentPokemonIndex = 1;



window.onscroll = function () {
  stickyHeader();
};

function stickyHeader() {
  let header = document.getElementById("pageHeader");
  let pixelDistanceFromTop = 1;

  if (window.scrollY > pixelDistanceFromTop) {
    header.classList.add("fixed");
  } else {
    header.classList.remove("fixed");
  }
}

function init() {
  loadData();
}

async function loadData() {
  toggleDisplay();
  for (
    let index = currentPokemonIndex;
    index < currentPokemonIndex + 20;
    index++
  ) {
    let response = await fetch(baseUrl + index);
    let responseAsJson = await response.json();
    
    document.getElementById("contentWrapper").innerHTML += getCardTemplate(
      responseAsJson,
      index
    );
    

    for (
      let indexElement = 0;
      indexElement < responseAsJson.types.length;
      indexElement++
    ) {
      let type = responseAsJson.types[indexElement].type.name;
      document.getElementById(`cardType${index}`).innerHTML +=
        getTypeTemplate(type);
      document
        .getElementById(`cardBackground${index}`)
        .classList.add(`${responseAsJson.types[0].type.name}Bg`);
    }
  }
  currentPokemonIndex += 20;
  toggleDisplay();
  updateAndScrollDown();
}

function toggleDisplay() {
  document.getElementById("loadingSpinner").classList.toggle("dNone");
  document.getElementById("contentWrapper").classList.toggle("dNone");
  document.getElementById("loadBtn").classList.toggle("dNone");
  document.getElementById("loadingMessage").classList.toggle("dNone");
}

function updateAndScrollDown() {
  if (currentPokemonIndex > 26) {
    let scrollCheckPointIndex = currentPokemonIndex - 26;
    let checkPointPokemonCard = document.getElementById(
      `pokemonCard${scrollCheckPointIndex}`
    );
    checkPointPokemonCard.scrollIntoView({ behavior: "smooth" });
  }
}

function getCardTemplate(responseAsJson, index) {
  const spriteUrlSvg = `${spritesBaseUrl}${index}.svg`;

  return /*html*/ `
    <div id="pokemonCard${index}" class="pokemonCard" onclick="renderOverlayCard(${index})">
        <div class="cardName">
            <p>#${responseAsJson.id}</p>
            <p>${
              responseAsJson.name.charAt(0).toUpperCase() +
              responseAsJson.name.slice(1)
            }</p>
        </div>
        <div id="cardBackground${index}" class="cardBackground">
                <img src="${spriteUrlSvg}" alt="">
        </div>
        <div id="cardType${index}" class="cardElement">
                
        </div>
    </div>
  `;
}

function getTypeTemplate(type) {
  return /*html*/ `
        <p class="elementTag , ${type}Bg">${type}</p>
    `;
}

async function renderOverlayCard(index) {
  let response = await fetch(baseUrl + index);
  let responseAsJson = await response.json();
  console.log(responseAsJson);


  document.getElementById("overlayCard").innerHTML = getOverlayTemplate(responseAsJson, index);
  document.getElementById("contentWrapper").classList.toggle("dNone");
  document.getElementById("loadBtn").classList.toggle("dNone");
  document.getElementById("overlayCard").classList.toggle("dNone");
}

function getOverlayTemplate(responseAsJson, index) {
  const spriteUrlSvg = `${spritesBaseUrl}${index}.svg`;

  return /*html*/ `
    <div id="overlayLeft">
      <div id="overlayLeftTop" class="${responseAsJson.types[0].type.name}Bg">
        <img src="${spriteUrlSvg}" alt="" />
      </div>

      <div id="overlayLeftBottom">
        <h3>#${responseAsJson.id} ${responseAsJson.name.charAt(0).toUpperCase() + responseAsJson.name.slice(1)} </h3>
        <p>Height</p><p>${responseAsJson.height}</p>
        <p>Weight</p><p>${responseAsJson.weight}</p>
        <p>Primary Element</p><p>${responseAsJson.types[0].type.name}</p>
        <p>Secondary Element</p><p></p>
      </div>
    </div>

    <div id="overlayRight">
      <div id="overlayRightTop">
        <h3>Stats</h3>
        <p>HP</p>
        <p>Attack</p>
        <p>Defense</p>
        <p>Special Attack</p>
        <p>Special Defense</p>
      </div>

      <div id="overlayRightBottom">
        <h3>Abilities</h3>
        <p>1</p>
        <p>2</p>
        <p>3</p>
      </div>
    </div>
  `;
}
