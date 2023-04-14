const matchPairsStar = document.getElementById("matchPairsStar");
const quickQuizStar = document.getElementById("quickQuizStar");
const minesweeperStar = document.getElementById("minesweeperStar");

function clicked(star) {
    star.classList.toggle("bi-star");
    star.classList.toggle("bi-star-fill");

    if (matchPairsStar.classList.contains("bi-star")) {
        console.log("Im in bi-star");
    } else {

    }
}

matchPairsStar.addEventListener("click", () => clicked(matchPairsStar));
quickQuizStar.addEventListener("click", () => clicked(quickQuizStar));
minesweeperStar.addEventListener("click", () => clicked(minesweeperStar));