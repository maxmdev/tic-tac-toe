import Player from './Player';
import {crossOutWinnerCells, showPlayersScores, showResultMessage} from './functions';

export default class Game {
    constructor(playerOne, playerTwo = this.createPlayerAI()) {
        this.playerOne = playerOne;
        this.playerTwo = playerTwo;
        this.winner = {};
        this.round = 0;
        this.active = true;
        this.firstTurn = Math.round(Math.random()) ? this.playerOne : this.playerTwo;
        this.gameCells = this.setCellsToDefault();
    }

    startNewRound() {
        this.firstTurn = Math.round(Math.random()) ? this.playerOne : this.playerTwo;
        this.round++;
        this.gameCells = this.setCellsToDefault();
        this.winner = {};
        this.active = true;
    }

    isActive(){
        return this.active;
    }

    createPlayerAI() {
        return new Player({name: 'AI'});
    }

    changeGameState(index, player) {
        this.gameCells[index] = player;
    }

    getRandomCellIndex() {
        const freeCellsIndexes = [];
        for (let i = 0; i < this.gameCells.length; i++) {
            if (this.gameCells[i] === '') {
                freeCellsIndexes.push(i);
            }
        }

        const randomIndex = Math.floor(Math.random() * freeCellsIndexes.length);

        return freeCellsIndexes[randomIndex];
    }

    checkResults() {
        const winningConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (let i = 0; i < this.gameCells.length - 1; i++) {
            const winning = winningConditions[i];
            let a = this.gameCells[winning[0]];
            let b = this.gameCells[winning[1]];
            let c = this.gameCells[winning[2]];

            if (a === '' || b === '' || c === '') {
                continue;
            }

            if (a === b && b === c) {
                this.active = false;
                this.winner = a;
                a.addWin();
                crossOutWinnerCells(winning);
                showResultMessage(this.winner);
                showPlayersScores();
                return 1;
            }
        }

        if (!this.gameCells.includes('')) {
            this.active = false;
            this.winner = 'draw';
            this.playerOne.addWin();
            this.playerTwo.addWin();
            showResultMessage(this.winner);
            showPlayersScores();
            return 0;
        }
    }

    setCellsToDefault() {
        return ['', '', '', '', '', '', '', '', ''];
    }
}