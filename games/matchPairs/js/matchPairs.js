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
  
    //create your board
    function createBoard() {
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
      
      if(optionOneId == optionTwoId) {
        cards[optionOneId].setAttribute('src', 'js/images/blank.png')
        cards[optionTwoId].setAttribute('src', 'js/images/blank.png')
        //alert('You have clicked the same image!')
      }
      else if (cardsChosen[0] === cardsChosen[1]) {
        //alert('You found a match')
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
      if  (cardsWon.length === cardArray.length/2) {
        resultDisplay.textContent += ' Congratulations! You found them all!'
      }
    }
  
    //flip your card
    function flipCard() {
      let cardId = this.getAttribute('data-id')
      cardsChosen.push(cardArray[cardId].name)
      cardsChosenId.push(cardId)
      this.setAttribute('src', cardArray[cardId].img)
      if (cardsChosen.length ===2) {
        setTimeout(checkForMatch, 500)
      }
    }
  
    createBoard()
  })