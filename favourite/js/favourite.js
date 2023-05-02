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

        if (favouriteValue == 'false' || favouriteValue == null) {
            game.setAttribute("style", "display: none !important;");
        } else if (favouriteValue == 'true') {
            if (game.getAttribute("style") != null) {
                game.removeAttribute("style");
            }
        }

        gameStar.addEventListener("click", () => clicked(gameTuple));
    }
}

function clicked(gameTuple) {
    if (gameTuple.element.classList.contains("bi-star")) {
        localStorage.setItem(gameTuple.key, 'true');
    } else {
        localStorage.setItem(gameTuple.key, 'false');
    }
    load();
}