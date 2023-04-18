const gameCatalog = document.getElementById("gameCatalog")
const searchBar = document.getElementById("searchBar")
const searchButton = document.getElementById("searchButton")
const searchInput = document.getElementById("searchInput")

function doSearch() {
    const searchValue = searchInput.value; // if searchValue is empty, show all games
    const games = gameCatalog.children;
    for (let i = 0; i < games.length; i++) {
        const game = games[i];
        const gameName = game.querySelector('.card-body h5.card-title').textContent;
        if (gameName.toLowerCase().includes(searchValue.toLowerCase()) || searchValue === "") {
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