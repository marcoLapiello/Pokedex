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
    <div class="overlayWrapper">
      <div id="overlayLeft">
        <div id="overlayLeftTop" class="${responseAsJson.types[0].type.name}Bg">
          <img src="${spriteUrlSvg}" alt="" />
        </div>
  
        <div id="overlayLeftBottom">
          <h3>#${responseAsJson.id} ${responseAsJson.name.charAt(0).toUpperCase() + responseAsJson.name.slice(1)}</h3>
          <div class="overlayLineWrapper">
            <p>Height</p><p>${responseAsJson.height * 10} Cm</p>
          </div>
          
          <div class="overlayLineWrapper">
            <p>Weight</p><p>${responseAsJson.weight / 10} Kg</p>
          </div>
          
          <h3 id="overlayElementH3">Element</h3>
          
          <p id="overlayElement"></p> 
        </div>
      </div>
  
      <div id="overlayRight">
        <div id="overlayRightTop">
          <h3>Stats</h3>

          <div class="overlayLineWrapper">
            <p>HP</p><p>${responseAsJson.stats[0].base_stat}</p>
          </div>
          
          <div class="overlayLineWrapper">
            <p>Attack</p><p>${responseAsJson.stats[1].base_stat}</p>
          </div>
          
          <div class="overlayLineWrapper">
            <p>Defense</p><p>${responseAsJson.stats[2].base_stat}</p>
          </div>
          
          <div class="overlayLineWrapper">
            <p>Special Attack</p><p>${responseAsJson.stats[3].base_stat}</p>
          </div>
          
          <div class="overlayLineWrapper">
            <p>Special Defense</p><p>${responseAsJson.stats[4].base_stat}</p>
          </div>
          
          <div class="overlayLineWrapper">
            <p>Speed</p><p>${responseAsJson.stats[5].base_stat}</p>
          </div>
          
        </div>
  
        <div id="overlayRightBottom">
          <h3>Abilities</h3>
          
        </div>
      </div>
    </div>

    <div class="overlayBtnDiv">
      <button id="prevBtn" onclick="previousPokemon(${previousIndex})"><</button>
      <button id="closeBtn" onclick="closeOverlay(${index})">X</button>
      <button id="nextBtn" onclick="nextPokemon(${nextIndex})">></button> 
    </div>
    
      
  `;
}

function getAbilityTemplate(Ability) {
    return /*html*/ `
            <p>${Ability}</p>
        `;
  }