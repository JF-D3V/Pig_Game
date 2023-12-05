"use strict";

// Selecting elements
const player0El = document.querySelector(`.player--0`);
const player1El = document.querySelector(`.player--1`);

const score0El = document.getElementById(`score--0`);
const score1El = document.getElementById(`score--1`);

const current0El = document.getElementById(`current--0`);
const current1El = document.getElementById(`current--1`);

const diceEl = document.querySelector(`.dice`);

const btnNew = document.querySelector(`.btn--new`);
const btnRoll = document.querySelector(`.btn--roll`);
const btnHold = document.querySelector(`.btn--hold`);

let scores, currentScore, activePlayer;

const init = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;

  diceEl.classList.add(`hidden`);

  player0El.classList.add(`player--active`);
  player1El.classList.remove(`player--active`);
  player0El.classList.remove(`player--winner`);
  player1El.classList.remove(`player--winner`);
};

init();

// Stating conditions

//Functions

// Active Player Function
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle(`player--active`);
  player1El.classList.toggle(`player--active`);
};

// Dice functionality
btnRoll.addEventListener(`click`, function () {
  // 1. Generating dice roll
  const dice = Math.trunc(Math.random() * 6) + 1;

  // 2. Display dice
  diceEl.classList.remove(`hidden`);
  diceEl.src = `dice-${dice}.png`;

  // 3. Check roll 1: If true - switch player
  if (dice !== 1) {
    // Add to current score
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
  } else {
    // Switch player
    switchPlayer();
  }
});

// Hold Button Event
btnHold.addEventListener(`click`, function () {
  //1 Add to current score
  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

  //2 Check if platers score is >= 100 - Finish the game
  if (scores[activePlayer] >= 10) {
    document.querySelector(`.player--${activePlayer}`).classList.add(`player--winner`);
    document.querySelector(`.player--${activePlayer}`).classList.remove(`player--active`);
  } else {
    //3 Switch to next player
    switchPlayer();
  }
});

btnNew.addEventListener(`click`, init);
