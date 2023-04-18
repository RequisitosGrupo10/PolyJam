

document.addEventListener('DOMContentLoaded', () => {

    const highScoresList = document.getElementById('highscoresList');
    const highScoresModal = new bootstrap.Modal(document.getElementById('highScoresModal'));
    const saveHighscoreButton = document.getElementById('saveHighscore');
    saveHighscoreButton.addEventListener("click", function () { saveHighscore() });
    document.addEventListener('end', function (event) {
        console.log("ssssss");
        highScoreCanBeAdded(event.detail.score);
    });

    if (localStorage.getItem("quizHighScores") != null) {
        actualHighScores = JSON.parse(localStorage.getItem('quizHighScores'));
        //console.log(actualHighScores);
        size = actualHighScores.length;
        for (i = 0; i < size; i++) {
            //Creo nuevo nodo
            highScoreName = actualHighScores[i];
            i++;
            highScoreValue = actualHighScores[i];

            addNewScore(highScoreName, highScoreValue);
        }
    }

    function highScoreCanBeAdded(mostRecentScore) {
        let highScoresList = document.getElementById('highscoresList');
        console.log(highScoresList);
        if (highScoresList.childElementCount < 5) {
            // Añadimos el highscore directamente
            highScoresModal.show();
        } else {
            if (parseInt(mostRecentScore) > highScoresList.lastElementChild.firstElementChild.firstElementChild) {
                highScoresModal.show();
            }
        }
    }

    function addNewScore(name, score) {

        score = parseInt(score);

        //Creo nuevo nodo
        let newItem = document.createElement("li");
        let newSpan = document.createElement("span");
        let newName = document.createTextNode(name);
        let newGuion = document.createTextNode(" - ");
        let newStrong = document.createElement("strong");
        let newScore = document.createTextNode(score);

        newStrong.appendChild(newScore);
        newSpan.appendChild(newName);

        newItem.appendChild(newSpan);
        newItem.appendChild(newGuion);
        newItem.appendChild(newStrong);

        if (highScoresList.childElementCount > 0) {
            let auxListItem = highScoresList.firstElementChild;
            let auxScore = auxListItem.lastElementChild.textContent;

            while (score <= auxScore && auxListItem.nextSibling != null) {
                auxListItem = auxListItem.nextSibling;
                auxScore = auxListItem.lastElementChild.textContent;
                console.log(auxListItem);
            }
            if (score < auxScore) {
                highScoresList.insertBefore(newItem, auxListItem);
                highScoresList.insertBefore(auxListItem, newItem);
            } else {
                highScoresList.insertBefore(newItem, auxListItem);
            }

            if (highScoresList.childElementCount >= 5) {
                highScoresList.removeChild(highScoresList.lastElementChild);
            }
        } else {

            highScoresList.appendChild(newItem);
        }
    }

    function saveHighscore() {
        let userName = document.getElementById('nameHighScore').value;
        updateHighScoresList(userName, resultDisplay.textContent);
        highScoresModal.hide();
    }

    function updateHighScoresList(userName, score) {
        if (userName != "") {//&& score != ""

            addNewScore(userName, score);

            //Local storage update
            auxListItem = highScoresList.firstElementChild;
            let actualHighScores = [];
            while (auxListItem != null) {
                nombre = auxListItem.firstElementChild.textContent;
                numero = auxListItem.lastElementChild.textContent;
                actualHighScores.push(nombre);
                actualHighScores.push(numero);
                numeroreturned = JSON.parse(JSON.stringify(actualHighScores));
                auxListItem = auxListItem.nextSibling;
            }
            localStorage.setItem('quizHighScores', JSON.stringify(actualHighScores));
        }
    }
})