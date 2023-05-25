'use strict';

// selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnDiceNew = document.querySelector('.btn--new');
const btnDiceRoll = document.querySelector('.btn--roll');
const btnDiceHold = document.querySelector('.btn--hold');
const currScoreP0 = document.getElementById('current--0');
const currScoreP1 = document.getElementById('current--1');

let scores, activePlayer, currScore, playing;

// starting condition
const initialization = function () {
  scores = [0, 0];
  activePlayer = 0;
  currScore = 0;
  playing = true;
  scores[0] = 0;
  scores[1] = 0;

  score0El.textContent = 0;
  score1El.textContent = 0;
  currScoreP0.textContent = 0;
  currScoreP1.textContent = 0;

  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  diceEl.classList.add('hidden');
};

initialization();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// rolling dice functonality
btnDiceRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll
    const diceNumber = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${diceNumber}.png`;

    // 3. Check for rolled 1
    if (diceNumber !== 1) {
      // Add diceNumber to current score
      currScore += diceNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currScore;
    } else {
      // Switch the active player
      switchPlayer();
    }
  }
});

// hold button functionality
btnDiceHold.addEventListener('click', function () {
  if (playing) {
    // 1. add current score to active player total score
    scores[activePlayer] += currScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. check if player's score is >= 100
    // finish the game -> active player wins the game
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // switch the player
      switchPlayer();
    }
  }
});

// reseting the game functionality at any point of time
btnDiceNew.addEventListener('click', initialization);
