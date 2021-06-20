import { getGrid, oppositeMove, showPlayersScores } from './functions';

require('../scss/styles.scss');
require('./functions.js');

import Game from './Game';
import Player from './Player';

const appRoot = document.getElementById('appRoot');
const scoresContainer = document.createElement('div');
scoresContainer.classList.add('scoresContainer');
appRoot.appendChild(scoresContainer);
const buttonsContainer = document.createElement('div');
buttonsContainer.classList.add('buttonsContainer');

const grid = getGrid();
appRoot.appendChild(grid);

const setAnotherPlayer = () => {
    const player = new Player();
    player.setOppositeMark(currentPlayer);
    return player;
}

const currentPlayer = new Player({name: 'Viktor', mark: 'O'});
const secondPlayer = setAnotherPlayer();

let game = new Game(currentPlayer, secondPlayer);
showPlayersScores();

if (game.firstTurn === secondPlayer) {
    oppositeMove();
}

export {currentPlayer, secondPlayer, game, appRoot, scoresContainer};