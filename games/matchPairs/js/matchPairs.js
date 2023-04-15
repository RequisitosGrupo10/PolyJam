document.addEventListener('DOMContentLoaded', () => {
  //card options
  const cardArray = [
    {
      name: 'banana',
      img: 'js/images/banana.png'
    },
    {
      name: 'blueberries',
      img: 'js/images/blueberries.png'
    },
    {
      name: 'cherries',
      img: 'js/images/cherries.png'
    },
    {
      name: 'kiwi',
      img: 'js/images/kiwi.png'
    },
    {
      name: 'pineapple',
      img: 'js/images/pineapple.png'
    },
    {
      name: 'greenApple',
      img: 'js/images/greenApple.png'
    },
    {
      name: 'banana',
      img: 'js/images/banana.png'
    },
    {
      name: 'blueberries',
      img: 'js/images/blueberries.png'
    },
    {
      name: 'cherries',
      img: 'js/images/cherries.png'
    },
    {
      name: 'kiwi',
      img: 'js/images/kiwi.png'
    },
    {
      name: 'pineapple',
      img: 'js/images/pineapple.png'
    },
    {
      name: 'greenApple',
      img: 'js/images/greenApple.png'
    }
  ]

  cardArray.sort(() => 0.5 - Math.random())

  const grid = document.querySelector('#grid')
  const resultDisplay = document.querySelector('#result')
  let cardsChosen = []
  let cardsChosenId = []
  let cardsWon = []

  const highScoresModal = new bootstrap.Modal(document.getElementById('highScoresModal'));
  let highScoresList = document.getElementById('highscoresList');
  const saveHighscoreButton = document.getElementById('saveHighscore');
  saveHighscoreButton.addEventListener("click", function () { saveHighscore() });

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
      localStorage.setItem('matchPairsHighScores', JSON.stringify(actualHighScores));
    }
  }

  function saveHighscore() {
    let userName = document.getElementById('nameHighScore').value;
    updateHighScoresList(userName, resultDisplay.textContent);
    highScoresModal.hide();
  }

  function loadFromLocalStorage() {
    if (localStorage.getItem("matchPairsHighScores") != null) {
      actualHighScores = JSON.parse(localStorage.getItem('matchPairsHighScores'));
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

      while (score >= auxScore && auxListItem.nextSibling != null) {
        auxListItem = auxListItem.nextSibling;
        auxScore = auxListItem.lastElementChild;
        console.log(auxListItem);
      }
      if (score < auxScore) {
        highScoresList.appendChild(newItem);
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

  //create your board
  function createBoard() {
    //highScoresModal.show();
    //localStorage.clear();
    loadFromLocalStorage();

    for (let i = 0; i < cardArray.length; i++) {
      const card = document.createElement('img')
      card.setAttribute('src', 'js/images/blank.png')
      card.setAttribute('width', '200')
      card.setAttribute('height', '200')
      card.setAttribute('data-id', i)
      card.addEventListener('click', flipCard)
      grid.appendChild(card)
    }
  }

  //check for matches
  function checkForMatch() {
    const cards = document.querySelectorAll('img')
    const optionOneId = cardsChosenId[0]
    const optionTwoId = cardsChosenId[1]

    if (optionOneId == optionTwoId) {
      cards[optionOneId].setAttribute('src', 'js/images/blank.png')
      cards[optionTwoId].setAttribute('src', 'js/images/blank.png')
    }
    else if (cardsChosen[0] === cardsChosen[1]) {
      cards[optionOneId].setAttribute('src', 'js/images/white.png')
      cards[optionTwoId].setAttribute('src', 'js/images/white.png')
      cards[optionOneId].removeEventListener('click', flipCard)
      cards[optionTwoId].removeEventListener('click', flipCard)
      cardsWon.push(cardsChosen)
      resultDisplay.textContent = (resultDisplay.textContent == "" ? 0 : parseInt(resultDisplay.textContent)) + 5;
    } else {
      cards[optionOneId].setAttribute('src', 'js/images/blank.png')
      cards[optionTwoId].setAttribute('src', 'js/images/blank.png')
      //alert('Sorry, try again')
      resultDisplay.textContent = (resultDisplay.textContent == "" ? 0 : parseInt(resultDisplay.textContent)) - 1;
    }
    cardsChosen = []
    cardsChosenId = []
    //resultDisplay.textContent = cardsWon.length
    if (cardsWon.length === cardArray.length / 2) {
      //Create a modal to store the high score
      if (highScoresList.childElementCount < 5) {
        // Añadimos el highscore directamente
        highScoresModal.show();
      } else {
        if (parseInt(resultDisplay.textContent) > highScoresList.lastElementChild.firstElementChild.firstElementChild) {
          highScoresModal.show();
        }
      }
      resultDisplay.textContent += ' Congratulations! You found them all!'
    }
  }

  //flip your card
  function flipCard() {
    let cardId = this.getAttribute('data-id')
    cardsChosen.push(cardArray[cardId].name)
    cardsChosenId.push(cardId)
    this.setAttribute('src', cardArray[cardId].img)
    if (cardsChosen.length === 2) {
      setTimeout(checkForMatch, 500)
    }
  }

  createBoard()
})