load();

function load() {
    const gameCatalog = document.getElementById("gameCatalog");
    const games = gameCatalog.children;
    for (let i = 0; i < games.length; i++) {
        const game = games[i];
        const gameName = game.querySelector('.card-body h4.card-title').textContent;
        const gameStar = game.querySelector('.card-body i');
        const gameTuple = {key: gameName, element: gameStar};
        const favouriteValue = localStorage.getItem(gameName);

        if (favouriteValue == 'true') {
            gameStar.classList.toggle("bi-star");
            gameStar.classList.toggle("bi-star-fill");
        }
        
        gameStar.addEventListener("click", () => clicked(gameTuple));
    }
}

function clicked(gameTuple) {
    gameTuple.element.classList.toggle("bi-star");
    gameTuple.element.classList.toggle("bi-star-fill");

    if (gameTuple.element.classList.contains("bi-star-fill")) {
        localStorage.setItem(gameTuple.key, 'true');
    } else {
        localStorage.setItem(gameTuple.key, 'false');
    }
}