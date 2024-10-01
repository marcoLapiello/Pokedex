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

function getOverlayTemplate(responseAsJson, index, nextIndex, previousIndex) {
  const spriteUrlSvg = `${spritesBaseUrl}${index}.svg`;

  return /*html*/ `
      <div id="overlayLeft">
        <div id="overlayLeftTop" class="${responseAsJson.types[0].type.name}Bg">
          <img src="${spriteUrlSvg}" alt="" />
        </div>
  
        <div id="overlayLeftBottom">
          <h3>#${responseAsJson.id} ${responseAsJson.name.charAt(0).toUpperCase() + responseAsJson.name.slice(1)}</h3>
          <p>Height</p><p>${responseAsJson.height}</p>
          <p>Weight</p><p>${responseAsJson.weight}</p>
          <p>Element</p><p id="overlayElement"></p>
          
        </div>
      </div>
  
      <div id="overlayRight">
        <div id="overlayRightTop">
          <h3>Stats</h3>
          <p>HP</p><p>${responseAsJson.stats[0].base_stat}</p>
          <p>Attack</p><p>${responseAsJson.stats[1].base_stat}</p>
          <p>Defense</p><p>${responseAsJson.stats[2].base_stat}</p>
          <p>Special Attack</p><p>${responseAsJson.stats[3].base_stat}</p>
          <p>Special Defense</p><p>${responseAsJson.stats[4].base_stat}</p>
          <p>Speed</p><p>${responseAsJson.stats[5].base_stat}</p>
        </div>
  
        <div id="overlayRightBottom">
          <h3>Abilities</h3>
          
        </div>

        <button onclick="closeOverlay(${index})">X</button>
        <button id="nextBtn" onclick="nextPokemon(${nextIndex})">></button>
        <button id="prevBtn" onclick="previousPokemon(${previousIndex})"><</button>
      </div>
    `;
}

function getAbilityTemplate(Ability) {
    return /*html*/ `
            <p>${Ability}</p>
        `;
  }