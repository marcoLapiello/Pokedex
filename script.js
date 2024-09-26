const baseUrl = "https://pokeapi.co/api/v2/pokemon/";

function init() {
  loadData();
}

async function loadData() {
  for (let index = 1; index < 21; index++) {
    let response = await fetch(baseUrl + index);
    let responseAsJson = await response.json();
    document.getElementById("contentWrapper").innerHTML += getCardTemplate(responseAsJson, index);

    for (let indexElement = 0; indexElement < responseAsJson.types.length; indexElement++) {
      let type = responseAsJson.types[indexElement].type.name;
      document.getElementById(`cardType${index}`).innerHTML += getTypeTemplate(type);
      document.getElementById(`cardBackground${index}`).classList.add(`${responseAsJson.types[0].type.name}Bg`);
    }
  }
}

function getCardTemplate(responseAsJson, index) {
  return /*html*/ `
        <div class="pokemonCard">
            <div class="cardName">
                <p>#${responseAsJson.id}</p>
                <p>${
                  responseAsJson.name.charAt(0).toUpperCase() +
                  responseAsJson.name.slice(1)
                }</p>
            </div>
            <div id="cardBackground${index}" class="cardBackground">
                <img src="./assets/img/pokeball.png" alt="">
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
