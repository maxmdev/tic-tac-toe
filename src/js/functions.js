const Main = require('./index');

const getGrid = () => {
    const cellCount = 9;
    const gridContainer = document.createElement('div');
    gridContainer.classList.add('gameContainer');

    for (let i = 0; i < cellCount; i++) {
        const div = document.createElement('div');
        div.classList.add('gridCell');
        div.setAttribute('data-index', i.toString());
        div.addEventListener('click', handleClick, true);
        gridContainer.appendChild(div);
    }

    return gridContainer;
}

const handleClick = (e) => {
    if (Main.game.isActive()) {
        const clickedCell = e.currentTarget;
        const cellIndex = getCellIndex(clickedCell);

        Main.game.changeGameState(cellIndex, Main.currentPlayer);
        markSelectedCell(clickedCell, Main.currentPlayer);

        Main.game.checkResults();
        return oppositeMove();
    }
}

const oppositeMove = () => {
    if (Main.game.isActive()) {
        const randomIndex = Main.game.getRandomCellIndex();
        const chosenCell = document.querySelector('[data-index=\'' + randomIndex + '\']');

        Main.game.changeGameState(randomIndex, Main.secondPlayer);
        markSelectedCell(chosenCell, Main.secondPlayer);

        Main.game.checkResults();
    }
}

const getCellIndex = (cell) => {
    return parseInt(cell.getAttribute('data-index'));
}

const markSelectedCell = (cell, player) => {
    cell.innerHTML = player.getMark();
    removeClickEvent(cell);
}

const removeClickEvent = (cell) => {
    cell.removeEventListener('click', handleClick, true);
    return true;
}

const crossOutWinnerCells = (cellsNumbers) => {
    cellsNumbers.forEach(cellNumber => {
        const cell = document.querySelector('[data-index=\'' + cellNumber + '\']');
        cell.classList.add('crossedOut');
    })
}

const showPlayersScores = () => {
    const playerOneScore = document.createElement('div');
    playerOneScore.innerText = '' + Main.game.playerOne.getName() + ': ' +Main.game.playerOne.getScore() + '';
    const playerTwoScore = document.createElement('div');
    playerTwoScore.innerText = '' + Main.game.playerTwo.getName() + ': ' +Main.game.playerTwo.getScore() + '';

    Main.scoresContainer.innerHTML = '';
    Main.scoresContainer.append(playerOneScore, playerTwoScore);
}

const showResultMessage = (winner) => {
    const messageContainer = document.querySelector('.messageContainer') ||
        document.createElement('div');
    messageContainer.classList.add('messageContainer');
    const controlButtons = getControlButtons();
    let winnerMessage;

    if (winner.hasOwnProperty('name')) {
        winnerMessage = ''+ winner.name + ' has won!';
    } else {
        winnerMessage = 'Draw';
    }

    messageContainer.innerText = winnerMessage;
    messageContainer.appendChild(controlButtons);

    Main.appRoot.appendChild(messageContainer);
}

const getControlButtons = () => {
    const controlButtonsContainer = document.createElement('div');
    controlButtonsContainer.classList.add('buttonsContainer');

    const newGameButton = document.createElement('button');
    newGameButton.innerText = 'New game';
    const clearGameButton = document.createElement('button');
    clearGameButton.innerText = 'Clear game';

    newGameButton.addEventListener('click', newGameRound);
    clearGameButton.addEventListener('click', clearGame);

    controlButtonsContainer.append(newGameButton, clearGameButton);

    return controlButtonsContainer;
}

const clearGrid = () => {
    const gridCells = document.querySelectorAll('.gridCell');
    gridCells.forEach(cell => {
        cell.classList.remove('crossedOut');
        cell.innerText = '';
        cell.addEventListener('click', handleClick, true);
    });
}

const newGameRound = () => {
    clearMessageContainer();
    clearGrid();

    Main.game.startNewRound();
    if (Main.game.firstTurn === Main.game.playerTwo) {
        oppositeMove();
    }
}

const clearGame = () => {
    clearMessageContainer();
    clearGrid();
    Main.game.playerOne.setScoreToZero();
    Main.game.playerTwo.setScoreToZero();
    showPlayersScores();

    Main.game.startNewRound();
    if (Main.game.firstTurn === Main.game.playerTwo) {
        oppositeMove();
    }
}

const clearMessageContainer = () => {
    const messageContainer = document.querySelector('.messageContainer');
    messageContainer.remove();
}

export { getGrid, oppositeMove, crossOutWinnerCells, showResultMessage, showPlayersScores };