const grid = document.getElementById("grid");
let solution = null;
let seconds = 0;
let timerInterval;

// Create grid
for (let i = 0; i < 81; i++) {
  let input = document.createElement("input");
  input.maxLength = 1;

  input.addEventListener("input", () => {
    input.value = input.value.replace(/[^1-9]/g, "");
    checkWin();
  });

  grid.appendChild(input);
}

// Timer
function startTimer() {
  clearInterval(timerInterval);
  seconds = 0;

  timerInterval = setInterval(() => {
    seconds++;
    let m = String(Math.floor(seconds / 60)).padStart(2, '0');
    let s = String(seconds % 60).padStart(2, '0');
    document.getElementById("timer").innerText = `Time: ${m}:${s}`;
  }, 1000);
}

// Board helpers
function getBoard() {
  let inputs = document.querySelectorAll("#grid input");
  let board = [];
  for (let i = 0; i < 9; i++) {
    let row = [];
    for (let j = 0; j < 9; j++) {
      let val = inputs[i * 9 + j].value;
      row.push(val ? parseInt(val) : 0);
    }
    board.push(row);
  }
  return board;
}

function setBoard(board) {
  let inputs = document.querySelectorAll("#grid input");
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      let val = board[i][j];
      inputs[i * 9 + j].value = val || "";
    }
  }
}

// Validation
function isValid(board, num, row, col) {
  for (let i = 0; i < 9; i++)
    if (board[row][i] === num || board[i][col] === num) return false;

  let br = Math.floor(row / 3) * 3;
  let bc = Math.floor(col / 3) * 3;

  for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++)
      if (board[br + i][bc + j] === num) return false;

  return true;
}

// Solver
function solve(board) {
  for (let i = 0; i < 9; i++)
    for (let j = 0; j < 9; j++)
      if (board[i][j] === 0) {
        for (let num = 1; num <= 9; num++) {
          if (isValid(board, num, i, j)) {
            board[i][j] = num;
            if (solve(board)) return true;
            board[i][j] = 0;
          }
        }
        return false;
      }
  return true;
}

// Count solutions (for uniqueness)
function countSolutions(board) {
  let count = 0;

  function solveCount(b) {
    for (let i = 0; i < 9; i++)
      for (let j = 0; j < 9; j++)
        if (b[i][j] === 0) {
          for (let num = 1; num <= 9; num++) {
            if (isValid(b, num, i, j)) {
              b[i][j] = num;
              solveCount(b);
              b[i][j] = 0;
            }
          }
          return;
        }
    count++;
  }

  solveCount(JSON.parse(JSON.stringify(board)));
  return count;
}

// Generate full board
function generateFull() {
  let board = Array.from({ length: 9 }, () => Array(9).fill(0));
  solve(board);
  return board;
}

// Remove cells with uniqueness
function removeCells(board, attempts) {
  while (attempts > 0) {
    let r = Math.floor(Math.random() * 9);
    let c = Math.floor(Math.random() * 9);

    let backup = board[r][c];
    board[r][c] = 0;

    let copy = JSON.parse(JSON.stringify(board));
    if (countSolutions(copy) !== 1) {
      board[r][c] = backup;
      attempts--;
    }
  }
  return board;
}

// Generate puzzle
function generatePuzzle() {
  startTimer();
  let difficulty = parseInt(document.getElementById("difficulty").value);

  let full = generateFull();
  solution = JSON.parse(JSON.stringify(full));

  let puzzle = removeCells(full, difficulty);
  setBoard(puzzle);
}

// Solve instantly
function solveSudoku() {
  setBoard(solution);
}

// Hint
function giveHint() {
  let inputs = document.querySelectorAll("#grid input");
  let board = getBoard();

  for (let i = 0; i < 9; i++)
    for (let j = 0; j < 9; j++)
      if (board[i][j] === 0) {
        inputs[i * 9 + j].value = solution[i][j];
        inputs[i * 9 + j].style.background = "lightblue";
        return;
      }
}

// Clear
function clearGrid() {
  document.querySelectorAll("#grid input").forEach(i => i.value = "");
}

// Win check
function checkWin() {
  let board = getBoard();
  if (JSON.stringify(board) === JSON.stringify(solution)) {
    clearInterval(timerInterval);
    alert("🎉 Congratulations! You solved it!");
    saveScore();
  }
}

// Theme toggle
function toggleTheme() {
  document.body.classList.toggle("light");
}

// Leaderboard
function saveScore() {
  let scores = JSON.parse(localStorage.getItem("scores")) || [];
  scores.push(seconds);
  scores.sort((a, b) => a - b);
  localStorage.setItem("scores", JSON.stringify(scores.slice(0, 5)));
  loadLeaderboard();
}

function loadLeaderboard() {
  let scores = JSON.parse(localStorage.getItem("scores")) || [];
  let list = document.getElementById("leaderboard");
  list.innerHTML = "";

  scores.forEach(s => {
    let li = document.createElement("li");
    li.innerText = `${s} sec`;
    list.appendChild(li);
  });
}

loadLeaderboard();