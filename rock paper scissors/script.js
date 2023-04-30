'use strict';

const hands = document.querySelectorAll('.game-hand');
const userScore = document.querySelector('#user-score');
const compScore = document.querySelector('#comp-score');
const currRndStats = document.querySelector('.current-round-status');
const currRndMsg = document.querySelector('#round-message');

//////////////////////////////////////////////////////////////////////////
const arrowSign = '&#8594;';
const moveArr = [hands[0].id, hands[1].id, hands[2].id];
const ogHandBackground = getComputedStyle(hands[0]).backgroundColor;
let userHand;
let compHand;
let currResult;
let moveConc;
let roundMsg;

//////////////////////////////////////////////////////////////////////////
//random number from 0 to 2
const calcCompMove = function () {
  return Math.round(Math.random() * 2);
};

//details all possible outcomes through comparisons
const calcOutcome = function () {
  if (userHand === compHand) {
    return 'draw';
  } else if (
    (userHand === moveArr[0] && compHand === moveArr[2]) ||
    (userHand === moveArr[1] && compHand === moveArr[0]) ||
    (userHand === moveArr[2] && compHand === moveArr[1])
  ) {
    return 'user';
  } else if (
    (userHand === moveArr[2] && compHand === moveArr[0]) ||
    (userHand === moveArr[0] && compHand === moveArr[1]) ||
    (userHand === moveArr[1] && compHand === moveArr[2])
  ) {
    return 'comp';
  }
};

//changes display based on inputted outcome: end message, colour changes and score tally
const calcCurrDisplay = function (target) {
  switch (currResult) {
    case 'user':
      userScore.textContent++;
      moveConc = 'beats';
      roundMsg = 'You win!';
      target.classList.toggle('user-hand-win');
      setTimeout(() => {
        target.classList.toggle('user-hand-win');
      }, 1500);
      break;
    case 'comp':
      compScore.textContent++;
      moveConc = 'loses to';
      roundMsg = 'You lose!';
      target.classList.toggle('user-hand-lose');
      setTimeout(() => {
        target.classList.toggle('user-hand-lose');
      }, 1500);
      break;
    case 'draw':
      userScore.textContent++;
      compScore.textContent++;
      moveConc = 'draws with';
      roundMsg = 'Draw!';
      target.classList.toggle('user-hand-draw');
      setTimeout(() => {
        target.classList.toggle('user-hand-draw');
      }, 1500);
      break;
  }

  userHand = userHand[0].toUpperCase() + userHand.slice(1);
  compHand = compHand[0].toUpperCase() + compHand.slice(1);

  currRndMsg.textContent = roundMsg;
  currRndStats.innerHTML = `${userHand} ${moveConc} ${compHand} ${arrowSign} ${currRndMsg.outerHTML}`;
};

//after users choice: store move of both sides, store outcome and change display accordingly
const usersMove = e => {
  compHand = moveArr[calcCompMove()];
  userHand = e.target.id;
  currResult = calcOutcome();
  calcCurrDisplay(e.target);
};

hands.forEach(e => e.addEventListener('click', usersMove));
