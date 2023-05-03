const gameCatalog = document.getElementById("gameCatalog")
const searchBar = document.getElementById("searchBar")
const searchButton = document.getElementById("searchButton")
const searchInput = document.getElementById("searchInput")
const selectableElements = document.querySelectorAll('.selectable');

function doSearch(searchValue) {
    if(!searchValue){
        searchValue = searchInput.value; // if searchValue is empty, show all games
        if(searchValue === ""){
            updateStatusBar("");
        }else{      
            updateStatusBar("Showing results for: " + searchValue);
        }
    } else{
        updateStatusBar(searchValue + " games");
    }
    const games = gameCatalog.children;
    const favouriteGames = [];

    for (let i = 0; i < games.length; i++) {
        const game = games[i];
        const gameName = game.querySelector('.card-body h3.card-title').textContent;
        if (localStorage.getItem(gameName) == 'true') {
            favouriteGames.push(game);
        }
    }

    for (let i = 0; i < favouriteGames.length; i++) {
        const game = favouriteGames[i];
        const gameName = game.querySelector('.card-body h3.card-title').textContent;
        const gameTags = game.querySelectorAll('.tags > span');
        const tags = Array.from(gameTags).map(span => span.textContent.toLowerCase());
        if (gameName.toLowerCase().includes(searchValue.toLowerCase()) || searchValue === "" || tags.includes( (searchValue.toLowerCase()) ) ) {
            game.removeAttribute("style");
        } else {
            game.setAttribute("style", "display: none !important;");
        }
    }
}

searchInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        doSearch();
    }
}, false);

searchButton.addEventListener("click", function (e) {
    doSearch();
}, false);

function collectTags(){
    const allTags = document.querySelectorAll('.tags > span');
    for(let i = 0; i < allTags.length; i++){
        let tagText = allTags[i].textContent;
        allTags[i].addEventListener('click', function(){doSearch(tagText)}, false);
    //doSearch("");
    }
}
function clicked(text){
    console.log(text);
}

function updateStatusBar(status){
    document.getElementById("statusBar").innerHTML = status;
}

// Function to perform when the user presses the Enter key on a selectable element
function activateElement(event) {
    const el = event.target;
    if (el.tagName === 'SPAN'){ // its a tag
      console.log(el.textContent);
      doSearch(el.textContent);
  
    } else if (el.tagName === 'I'){ // its a favorite
      const parent = el.parentNode;
      const gameName = parent.querySelector('.card-title').textContent;
      const gameTuple = {key: gameName, element: el};
      clicked(gameTuple);
    }
  }
  
  // Add event listeners to each selectable element
  selectableElements.forEach((element) => {
    // Add a keydown event listener to the element
    element.addEventListener('keydown', (event) => {
      // If the user presses the enter key (keyCode 13)
      if (event.keyCode === 13) {
        // Call the doSomething function and pass in the event
        activateElement(event);
      }
    });
  });
  
  document.onload = collectTags();
