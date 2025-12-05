const squares = document.querySelectorAll('.square');
const scoreDisplay = document.querySelector('#score');
const timeLeftDisplay = document.querySelector('#time-left');
const startButton = document.querySelector('#start-button');

let score = 0;
let timeLeft = 10;
let molePosition;
let timerId = null;
let moleTimerId = null;

function randomSquare() {
    squares.forEach(square => {
        square.classList.remove('mole-up');
    });

    let randomPosition = squares[Math.floor(Math.random() * 9)];
    randomPosition.classList.add('mole-up');

    molePosition = randomPosition.id;
}

squares.forEach(square => {
    square.addEventListener('mousedown', () => {
        if(square.id == molePosition) {
            score++;
            scoreDisplay.textContent = score;
            molePosition = null;
            square.classList.remove('mole-up');
        }
    });
});

function moveMole() {
    let randomTime = Math.random() * 600 + 400; // Random time between 400ms and 1000ms
    moleTimerId = setTimeout(() => {
        randomSquare();
        if(timeLeft > 0) {
            moveMole();
        }
    }, randomTime);
}

function countDown() {
    timeLeft--;
    timeLeftDisplay.textContent = timeLeft;

    if (timeLeft == 0) {
        clearInterval(timerId);
        clearTimeout(moleTimerId);
        alert('Game Over! Your final score is ' + score);
    }
}

startButton.addEventListener('click', () => {
    // Reset game
    score = 0;
    timeLeft = 10;
    scoreDisplay.textContent = score;
    timeLeftDisplay.textContent = timeLeft;
    clearInterval(timerId);
    clearTimeout(moleTimerId);

    // Start game
    moveMole();
    timerId = setInterval(countDown, 1000);
});