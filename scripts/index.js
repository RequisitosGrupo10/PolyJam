const gameCatalog = document.getElementById("gameCatalog")
const searchBar = document.getElementById("searchBar")
const searchButton = document.getElementById("searchButton")
const searchInput = document.getElementById("searchInput")

searchInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        console.log("Enter pressed")
    }
}, false);

searchButton.addEventListener("click", function (e) {
    console.log("Search button pressed")
}, false);