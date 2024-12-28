import { DICTIONARY } from "./dictionary.js";

// --- Game State ---
let turn = 0;
let stack = [];
let lastMove = null;
let gameInterval = null;

const MAX_TURNS = 6;
const MAX_STACK_DEPTH = 5;
const TURN_INTERVAL = 2000;

// --- DOM Elements ---
const messageEl = document.getElementById("message");
const topOfHandEl = document.getElementById("top-of-hand");
const deleteBtn = document.querySelector(".delete-button");
const guessInputEl = document.getElementById("guess-input");
const turnCounterEl = document.getElementById("turn-counter");
const guessButtonEl = document.getElementById("guess-button");
const startButtonEl = document.getElementById("start-button");
const newGameButtonEl = document.getElementById("new-game-button");

// --- Setup Functions ---
function clearGameState() {
  turn = 0;
  stack = [];
  lastMove = null;
  messageEl.textContent = "";
  guessInputEl.value = "";
}

function updateUI() {
  turnCounterEl.textContent = `Turn: ${turn}/${MAX_TURNS}`;
  topOfHandEl.textContent = lastMove ? lastMove.name : "Get ready...";
}

function getLegalMoves(currentStack) {
  return DICTIONARY.filter((word) => {
    const netEffect = word.after - word.before;
    const nextStackSize = currentStack.length + netEffect;
    return (
      word.before <= currentStack.length && nextStackSize <= MAX_STACK_DEPTH
    );
  });
}

function randomMove() {
  const moves = getLegalMoves(stack);
  if (!moves.length) throw new Error("No legal moves available!");
  const index = Math.floor(Math.random() * moves.length);
  return moves[index];
}

function handleTurn() {
  turn++;
  if (turn > MAX_TURNS) {
    stopGame();
    messageEl.textContent = `${MAX_TURNS} turns complete! Enter your guess for the final hand.`;
    return;
  }

  const card = randomMove();
  card.execute(stack);
  lastMove = card;

  if (turn === MAX_TURNS) {
    stopGame();
    messageEl.textContent = `${MAX_TURNS} turns complete! Enter your guess for the final hand.`;
  }
  updateUI();
}

function startGame() {
  if (gameInterval) return; // Already running
  clearGameState();
  updateUI();
  handleTurn();
  gameInterval = setInterval(handleTurn, TURN_INTERVAL);
}

function stopGame() {
  clearInterval(gameInterval);
  gameInterval = null;
}

function handleGuess() {
  const guess = guessInputEl.value.trim();
  const guessItems = Array.from(guess);
  const actualTopToBottom = stack.map((item) => item.value);

  const isCorrect =
    guessItems.length === actualTopToBottom.length &&
    guessItems.every((g, i) => g === actualTopToBottom[i]);

  if (isCorrect) {
    clearGameState();
    messageEl.textContent = "Correct! You got it exactly right!";
  } else {
    messageEl.textContent = `Incorrect guess! Correct answer: ${actualTopToBottom.join(
      ""
    )}`;
  }
}

// --- Event Listeners ---
startButtonEl.addEventListener("click", startGame);
newGameButtonEl.addEventListener("click", window.location.reload);
guessButtonEl.addEventListener("click", handleGuess);

deleteBtn.addEventListener("click", () => {
  const currentGuess = guessInputEl.value.trim();
  if (!currentGuess) return;
  const guessItems = Array.from(currentGuess);
  guessItems.pop();
  guessInputEl.value = guessItems.join("");
});

// Add event to each literal emoji button in the original HTML
// (We already have them in the DOM, just need to append their click logic.)
Array.from(document.querySelectorAll(".emoji-button")).forEach((btn) => {
  btn.addEventListener("click", () => {
    guessInputEl.value += btn.textContent;
  });
});

// Initial UI update
updateUI();
