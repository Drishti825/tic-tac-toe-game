alert("JS is working");
let boxes = document.querySelectorAll(".box");
let statusText = document.getElementById("status");
let resetBtn = document.getElementById("reset");

let currentPlayer = "X";
let gameActive = true;

let winPatterns = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    if (box.innerText !== "" || !gameActive) return;

    box.innerText = currentPlayer;

if (currentPlayer === "X") {
  box.style.color = "#00ffcc";
} else {
  box.style.color = "#ff4d4d";
}
    if (checkWinner()) {
      statusText.innerText = currentPlayer + " Wins!";
      gameActive = false;
      return;
    }

    if (checkDraw()) {
      statusText.innerText = "Draw!";
      gameActive = false;
      return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
  });
});

function checkWinner() {
  for (let pattern of winPatterns) {
    let [a, b, c] = pattern;

    if (
      boxes[a].innerText &&
      boxes[a].innerText === boxes[b].innerText &&
      boxes[a].innerText === boxes[c].innerText
    ) {
      return true;
    }
  }
  return false;
}

function checkDraw() {
  return [...boxes].every(box => box.innerText !== "");
}

resetBtn.addEventListener("click", () => {
  boxes.forEach(box => box.innerText = "");
  currentPlayer = "X";
  gameActive = true;
  statusText.innerText = "";
});