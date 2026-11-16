import Game from './game.js';

const game = new Game();

document.querySelector('.logo').addEventListener('click', () => game.startGame());

game.startGame();
