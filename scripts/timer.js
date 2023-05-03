const timePlayed = localStorage.getItem("timePlayed");
if (timePlayed === null) {
    const initialTimes = {};
    const jsoned = JSON.stringify(initialTimes);
    localStorage.setItem("timePlayed", jsoned);
}

const intervalID = setInterval(timer, 2500, localStorage.getItem("actualGame"));

function timer(actualGame) {
    if (actualGame != null) {
        const newTimePlayed = JSON.parse(localStorage.getItem("timePlayed"));
        newTimePlayed[actualGame] += 2500
        localStorage.setItem("timePlayed", JSON.stringify(newTimePlayed));
    }
}
