document.addEventListener('DOMContentLoaded', () => {
  let canFlipCard = true;

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

  const difficulty = document.getElementById("difficulty")
  let tiempoEspera = 5000;
  opcionCambiada = () => {
    let index = difficulty.selectedIndex;
    switch (index) {
      case 0:
        tiempoEspera = 5000;
        break;
      case 1:
        tiempoEspera = 1000;
        break;
      case 2:
        tiempoEspera = 500;
        break;
      default:
        break;
    }
  };
  difficulty.addEventListener("change", opcionCambiada);
  opcionCambiada();
  const grid = document.querySelector('#grid')
  const resultDisplay = document.querySelector('#result')
  let cardsChosen = []
  let cardsChosenId = []
  let cardsWon = []

  const highScoresModal = new bootstrap.Modal(document.getElementById('highScoresModal'));
  let highScoreDiv = document.getElementById('highScoresDiv');
  const saveHighscoreButton = document.getElementById('saveHighscore');
  saveHighscoreButton.addEventListener("click", function () { saveHighscore() });

  function updateHighScoresList(userName, score) {
    if (userName != "") {

      addNewScore(userName, score);

      //Local storage update
      auxListItem = highScoreDiv.firstElementChild.firstElementChild;
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
    
    let highScoresList = highScoreDiv.firstElementChild;

    if (highScoresList == null){
      let newList = document.createElement("ol");
      highScoreDiv.appendChild(newList);
      highScoresList = highScoreDiv.firstElementChild;
    }

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
        auxScore = auxListItem.lastElementChild.textContent;
      }
      if (score < auxScore) {
        highScoresList.insertBefore(newItem, auxListItem);
        highScoresList.insertBefore(auxListItem, newItem);
      } else {
        highScoresList.insertBefore(newItem, auxListItem);
      }

      if (highScoresList.childElementCount >= 10) {
        highScoresList.removeChild(highScoresList.lastElementChild);
      }
    } else {
      highScoresList.appendChild(newItem);
    }
  }

  //create your board
  function createBoard() {
    loadFromLocalStorage();

    for (let i = 0; i < cardArray.length; i++) {
      const card = document.createElement('img')
      card.setAttribute('src', 'js/images/blank.png')
      card.setAttribute('alt', 'card number '+(i+1)+', value: blank');
      card.setAttribute('width', '175')
      card.setAttribute('height', '175')
      card.setAttribute('data-id', i)
      card.setAttribute('tabindex', '0');
      card.addEventListener('keyup', e => {if (e.code === "Enter" || e.code == "Space") {
        card.click();
       }});
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
      canFlipCard = true
      cards[optionOneId].setAttribute('src', 'js/images/blank.png')
      cards[optionOneId].setAttribute('alt', 'card number '+(parseInt(optionOneId)+1)+', value: blank');
      cards[optionTwoId].setAttribute('src', 'js/images/blank.png')
      cards[optionTwoId].setAttribute('alt', 'card number '+(parseInt(optionTwoId)+1)+', value: blank');
    }
    else if (cardsChosen[0] === cardsChosen[1]) {
      cards[optionOneId].setAttribute('src', 'js/images/white.png')
      cards[optionOneId].setAttribute('alt', 'card number '+(parseInt(optionOneId)+1)+', value: white');
      cards[optionTwoId].setAttribute('src', 'js/images/white.png')
      cards[optionTwoId].setAttribute('alt', 'card number '+(parseInt(optionTwoId)+1)+', value: white');
      cards[optionOneId].removeEventListener('click', flipCard)
      cards[optionTwoId].removeEventListener('click', flipCard)
      cardsWon.push(cardsChosen)
      resultDisplay.textContent = (resultDisplay.textContent == "" ? 0 : parseInt(resultDisplay.textContent)) + 5;
    } else {
      cards[optionOneId].setAttribute('src', 'js/images/blank.png')
      cards[optionOneId].setAttribute('alt', 'card number '+(parseInt(optionOneId)+1)+', value: blank');
      cards[optionTwoId].setAttribute('src', 'js/images/blank.png')
      cards[optionTwoId].setAttribute('alt', 'card number '+(parseInt(optionTwoId)+1)+', value: blank');
      //alert('Sorry, try again')
      resultDisplay.textContent = (resultDisplay.textContent == "" ? 0 : parseInt(resultDisplay.textContent)) - 1;
    }
    canFlipCard = true
    cardsChosen = []
    cardsChosenId = []
    //resultDisplay.textContent = cardsWon.length
    if (cardsWon.length === cardArray.length / 2) {
      //Create a modal to store the high score
      if (highScoreDiv.childElementCount <= 10) {
        // Añadimos el highscore directamente
        highScoresModal.show();
      } else {
        if (parseInt(resultDisplay.textContent) > highScoreDiv.lastElementChild.firstElementChild.firstElementChild) {
          highScoresModal.show();
        }
      }
      resultDisplay.textContent += ' Congratulations! You found them all!'
    }
  }

  //flip your card
  function flipCard() {
    if (!canFlipCard) return;
    let cardId = this.getAttribute('data-id')
    cardsChosen.push(cardArray[cardId].name)
    cardsChosenId.push(cardId)
    this.setAttribute('src', cardArray[cardId].img)
    this.setAttribute('alt', 'card number '+(parseInt(cardId)+1)+', value: '+cardArray[cardId].name);
    if (cardsChosen.length === 2) {
      canFlipCard = false;
      if (tiempoEspera == undefined)
        checkForMatch();
      else
        setTimeout(checkForMatch, tiempoEspera);
    }
  }

  createBoard()
})