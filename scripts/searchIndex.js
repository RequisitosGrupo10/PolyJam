const gameCatalog = document.getElementById("gameCatalog")
const searchBar = document.getElementById("searchBar")
const searchButton = document.getElementById("searchButton")
const searchInput = document.getElementById("searchInput")

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
    for (let i = 0; i < games.length; i++) {
        const game = games[i];
        const gameName = game.querySelector('.card-body h5.card-title').textContent;
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

searchButton.addEventListener("click", function () {
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

document.onload = collectTags();
