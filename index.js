// index.js
const board = document.getElementById("board");
const turnIndicator = document.getElementById("turnIndicator");
const resultModal = document.getElementById("resultModal");
const resultText = document.getElementById("resultText");
const scoreX = document.getElementById("scoreX");
const scoreO = document.getElementById("scoreO");

let currentPlayer = "X";
let gameActive = true;
let gameState = Array(9).fill("");
let scores = { X: 0, O: 0 };

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleCellClick(index) {
  if (!gameActive || gameState[index] !== "") return;

  gameState[index] = currentPlayer;
  renderBoard();

  if (checkWin()) {
    scores[currentPlayer]++;
    updateScore();
    showResult(`${currentPlayer} wins!`);
    gameActive = false;
    return;
  }

  if (!gameState.includes("")) {
    showResult("It's a draw!");
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  turnIndicator.textContent = `Turn: ${currentPlayer}`;
}

function checkWin() {
  return winningConditions.some((condition) => {
    const [a, b, c] = condition;
    return (
      gameState[a] &&
      gameState[a] === gameState[b] &&
      gameState[a] === gameState[c]
    );
  });
}

function renderBoard() {
  board.innerHTML = "";
  gameState.forEach((cell, index) => {
    const cellEl = document.createElement("div");
    cellEl.className =
      "w-24 h-24 bg-white text-3xl font-bold flex items-center justify-center border-2 border-gray-300 cursor-pointer hover:bg-gray-100 transition duration-300 ease-in-out";
    cellEl.textContent = cell;
    cellEl.addEventListener("click", () => handleCellClick(index));
    board.appendChild(cellEl);
  });
}

function showResult(message) {
  resultText.textContent = message;
  resultModal.classList.remove("hidden");
}

function closeModal() {
  resultModal.classList.add("hidden");
  resetGame();
}

function resetGame() {
  gameState = Array(9).fill("");
  gameActive = true;
  currentPlayer = "X";
  turnIndicator.textContent = `Turn: ${currentPlayer}`;
  renderBoard();
}

function newMatch() {
  scores = { X: 0, O: 0 };
  updateScore();
  resetGame();
}

function updateScore() {
  scoreX.textContent = `X: ${scores.X}`;
  scoreO.textContent = `O: ${scores.O}`;
}

renderBoard();
