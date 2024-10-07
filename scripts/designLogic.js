function toggleDisplay() {
    document.getElementById("loadingSpinner").classList.toggle("dNone");
    document.getElementById("contentWrapper").classList.toggle("dNone");
    document.getElementById("loadBtn").classList.toggle("dNone");
    document.getElementById("loadingMessage").classList.toggle("dNone");
}
  
function updateAndScrollDown() {
    if (currentLastIndex > 26) {
      let scrollCheckPointIndex = currentLastIndex - 26;
      let checkPointPokemonCard = document.getElementById(`pokemonCard${scrollCheckPointIndex}`);
      checkPointPokemonCard.scrollIntoView({ behavior: "smooth" });
    }
}

function scrollToLastOpenedPokemon(index){
    let checkPointPokemonCard = document.getElementById(`pokemonCard${index}`);
    let yOffset = 280;
    let cardPosition = checkPointPokemonCard.getBoundingClientRect().top + (window.scrollY - yOffset);
    window.scrollTo({top: cardPosition, behavior: "instant" });
}

function prepareOverlayAnimation(index){
    let pokemonCardCoords = getPokemonCardCoordinates(index);
    let overlay = document.getElementById("overlayCard");
    overlay.style.top = `${pokemonCardCoords.top}px`;
    overlay.style.left = `${pokemonCardCoords.left}px`;
    overlay.style.width = `${pokemonCardCoords.width}px`;
    overlay.style.height = `${pokemonCardCoords.height}px`;
    overlay.style.scale = 1;
    overlay.style.transition = "all 0.5s ease";
    overlay.classList.toggle("dNone");
}

function getPokemonCardCoordinates(index) {
    let pokemonCard = document.getElementById(`pokemonCard${index}`);
    if (pokemonCard) {
      let rect = pokemonCard.getBoundingClientRect();
      return {
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height
      };
    }
    return null;
}

function executeOverlayAnimation(){
    let overlay = document.getElementById("overlayCard");
    setTimeout(() => {
        overlay.style.top = "150px";
        overlay.style.left = "50%";
        overlay.style.transform = "translateX(-50%)";
        overlay.style.width = "80%";
        overlay.style.height = "80%";
    }, 10);
}

function executeOverlayClosingAnimation(index){
    let pokemonCardCoords = getPokemonCardCoordinates(index);
    let overlay = document.getElementById("overlayCard");
    setTimeout(() => {
        overlay.style.top = `${pokemonCardCoords.top}px`;;
        overlay.style.left = `${pokemonCardCoords.left}px`;
        overlay.style.transform = "scale(0.1) translateX(-50%)";
        overlay.style.width = `${pokemonCardCoords.width}px`;
        overlay.style.height = `${pokemonCardCoords.height}px`;
        overlay.style.transition = "all 0.5s ease";;
    }, 10);
}