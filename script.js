const gameBoard = document.getElementById('gameBoard');
const cells = document.querySelectorAll('[data-cell]');
const restartBtn = document.getElementById('restartBtn');
const messageElement = document.getElementById('message');

let currentPlayer = 'X';
let gameState = Array(9).fill(null);
let gameActive = true;

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

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);

function handleCellClick(e) {
    const cell = e.target;
    const cellIndex = Array.from(cells).indexOf(cell);

    if (gameState[cellIndex] !== null || !gameActive) {
        return;
    }

    cell.innerHTML = currentPlayer;
    gameState[cellIndex] = currentPlayer;

    if (checkWin()) {
        gameActive = false;
        messageElement.innerHTML = `Player ${currentPlayer} wins!`;
    } else if (!gameState.includes(null)) {
        gameActive = false;
        messageElement.innerHTML = `It's a draw!`;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkWin() {
    return winningConditions.some(condition => {
        return condition.every(index => gameState[index] === currentPlayer);
    });
}

function restartGame() {
    gameState = Array(9).fill(null);
    gameActive = true;
    currentPlayer = 'X';
    cells.forEach(cell => (cell.innerHTML = ''));
    messageElement.innerHTML = '';
}