const matchPairsStar = document.getElementById("matchPairsStar");
const quickQuizStar = document.getElementById("quickQuizStar");
const minesweeperStar = document.getElementById("minesweeperStar");

matchPairsStar.addEventListener("click", function() {
    matchPairsStar.classList.toggle("bi-star");
    matchPairsStar.classList.toggle("bi-star-fill");
});

quickQuizStar.addEventListener("click", function() {
    quickQuizStar.classList.toggle("bi-star");
    quickQuizStar.classList.toggle("bi-star-fill");
});

minesweeperStar.addEventListener("click", function() {
    minesweeperStar.classList.toggle("bi-star");
    minesweeperStar.classList.toggle("bi-star-fill");
});