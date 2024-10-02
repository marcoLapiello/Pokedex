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