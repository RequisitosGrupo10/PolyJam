const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
const loader = document.getElementById('loader');
const game = document.getElementById('game');

const nextBtn = document.getElementById('next')
const feedback = document.getElementById('feedback');


let selectedChoice;
let canContinue = false;
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [];

fetch(
    'https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple'
)
    .then((res) => {
        return res.json();
    })
    .then((loadedQuestions) => {
        questions = loadedQuestions.results.map((loadedQuestion) => {
            const formattedQuestion = {
                question: loadedQuestion.question,
            };

            const answerChoices = [...loadedQuestion.incorrect_answers];
            formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;
            answerChoices.splice(
                formattedQuestion.answer - 1,
                0,
                loadedQuestion.correct_answer
            );

            answerChoices.forEach((choice, index) => {
                formattedQuestion['choice' + (index + 1)] = choice;
            });

            return formattedQuestion;
        });

        startGame();
    })
    .catch((err) => {
        console.error(err);
    });

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuesions = [...questions];
    getNewQuestion();
    game.classList.remove('hidden');
    loader.classList.add('hidden');
};

function getNewQuestion()  {
    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        //go to the end page
        return window.location.assign('end.html');
    }
    questionCounter++;
    if (questionCounter >= MAX_QUESTIONS) {
        nextBtn.innerHTML = "End";
    }
    
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    //Update the progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionIndex];
    question.innerHTML = currentQuestion.question;

    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerHTML = currentQuestion['choice' + number];
    });

    availableQuesions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

function nextQuestions(e){
    if (!canContinue) return;
    selectedChoice.classList.remove('correct');
    selectedChoice.classList.remove('incorrect');
    feedback.innerHTML = "";
    feedback.removeAttribute('tabindex');
    getNewQuestion();
    nextBtn.setAttribute('disabled', 'true');
    nextBtn.classList.toggle('btn-disabled');
    canContinue = false;
}

function selectChoice (e) {
    if (!acceptingAnswers) return;
    acceptingAnswers = false;
    selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset['number'];

    const classToApply =
        selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

    if (classToApply === 'correct') {
        incrementScore(CORRECT_BONUS);
        feedback.innerHTML = "CORRECT";
    }

    selectedChoice.classList.add(classToApply);

    if (classToApply === 'incorrect') {
        feedback.innerHTML = "INCORRECT: The correct answer was: " + currentQuestion['choice' + currentQuestion.answer];
    }
    feedback.setAttribute('tabindex', 5);

    nextBtn.removeAttribute('disabled');
    nextBtn.classList.toggle('btn-disabled');
    selectedChoice.parentElement.classList.remove(classToApply);
    canContinue = true;
}


nextBtn.addEventListener('click', nextQuestions);
nextBtn.addEventListener('keypress', (e) => {
    if(e.key === 'Enter')
    nextQuestions(e);
});

choices.forEach((choice) => {
choice.addEventListener('click', selectChoice);
    choice.addEventListener('keypress', (e) => {
        if(e.key === 'Enter')
        selectChoice(e);
    });
});

incrementScore = (num) => {
    score += num;
    scoreText.innerText = score;
};