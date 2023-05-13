const mostPlayedDiv = document.getElementById("most-played-game")
const times = JSON.parse(localStorage.getItem("timePlayed"))
const list_games = document.getElementById("played-games")

let mostPlayedGame = "";
let mostPlayedTime = 0;
for (let key in times) {
    if (mostPlayedTime < times[key]) {
        mostPlayedGame = key
        mostPlayedTime = times[key]
    }
}

if (mostPlayedGame !== "")
    mostPlayedDiv.innerText = `${mostPlayedGame} with ${msToTime(mostPlayedTime)}`
else
    mostPlayedDiv.innerText = "None"

for (let key in times) {
    const li_item = document.createElement("div");
    li_item.innerText = key + ' is ' + msToTime(times[key])
    li_item.classList += "list-group-item"
    list_games.appendChild(li_item)
}


function msToTime(ms) {
    let seconds = (ms / 1000).toFixed(1);
    let minutes = (ms / (60000)).toFixed(1);
    let hours = (ms / (3600000)).toFixed(1);
    let days = (ms / (86400000)).toFixed(1);
    if (seconds < 60) return seconds + " seconds";
    else if (minutes < 60) return minutes + " minutes";
    else if (hours < 24) return hours + " hours";
    else return days + " days"
}