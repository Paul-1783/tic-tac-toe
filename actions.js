const gameBoard = document.querySelector(".gameBoard");
const startButton = document.querySelector(".newGame");
const screen = document.querySelector(".screen");
const closeDialog = document.querySelector(".closeDialog");
const submitDialog = document.querySelector(".submitDialog");
const dialogUsername = document.querySelector(".dialogUsername");

ticTacToe = (function createGame() {
  let game = [
    ["-1", "-1", "-1"],
    ["-1", "-1", "-1"],
    ["-1", "-1", "-1"],
  ];

  let gameOver = 0;
  let playerNumber = 0;
  let currentPlayer = 2;
  let rowIndex = 0;
  let columnIndex = 2;
  let playerNameOne = "";
  let playerNameTwo = "";

  function buildField() {
    const field = document.createElement("div");
    field.classList.add("field");
    field.setAttribute("fieldIndex", `${rowIndex} ${columnIndex}`);

    field.addEventListener("click", () => {
      if (playerNameOne === "" || playerNameTwo === "") {
        gameOver = 1;
      }
      if (!gameOver) {
        let [currentRowIndex, currentColumnIndex] = field
          .getAttribute("fieldIndex")
          .split(" ");

        let currentSign = currentPlayer === 2 ? "X" : "O";

        if (makeAMove(currentRowIndex, currentColumnIndex)) {
          if (gameOver) {
            field.insertAdjacentHTML("beforeend", `<div>${currentSign}</div>`);
          }
          return;
        } else {
          field.insertAdjacentHTML("beforeend", `<div>${currentSign}</div>`);
        }
      }
    });
    gameBoard.appendChild(field);
  }

  function makeAMove(newRowIndex, newColumnIndex) {
    currentPlayer = (playerNumber % 2) + 1;
    playerNumber++;
    screen.textContent = "";
    let row = newRowIndex;
    let column = newColumnIndex;

    if (game[row][column] !== "-1") {
      screen.textContent = "That spot has already been marked!";
      return 1;
    } else if (currentPlayer === 2) {
      game[row][column] = "O";
    } else {
      game[row][column] = "X";
    }

    //row testing
    game.forEach((elem) => {
      if (elem[0] === elem[1] && elem[1] === elem[2]) {
        if (elem[0] !== "-1") {
          if (currentPlayer === 2) {
            screen.textContent = `Player ${playerNameTwo} has won!`;
          } else {
            screen.textContent = `Player ${playerNameOne} has won!`;
          }
          gameOver = 1;
          return 1;
        }
      }
    });

    //column testing
    for (let d = 0; d < 3; ++d) {
      if (game[0][d] === game[1][d] && game[1][d] === game[2][d]) {
        if (game[0][d] !== "-1") {
          if (currentPlayer === 2) {
            screen.textContent = `Player ${playerNameTwo} has won!`;
          } else {
            screen.textContent = `Player ${playerNameOne} has won!`;
          }
          gameOver = 1;
          return 1;
        }
      }
    }

    // diagonal testing
    if (
      (game[0][0] === game[1][1] && game[1][1] === game[2][2]) ||
      (game[0][2] === game[1][1] && game[2][0] === game[1][1])
    ) {
      if (game[1][1] !== "-1") {
        if (currentPlayer === 2) {
          screen.textContent = `Player ${playerNameTwo} has won!`;
        } else {
          screen.textContent = `Player ${playerNameOne} has won!`;
        }
        gameOver = 1;
        return 1;
      }
    }
    return 0;
  }

  function removeAllChildren(element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
    return;
  }

  function buildGameArray() {
    game.forEach((elem) => {
      elem.forEach((entry) => {
        columnIndex = ++columnIndex % 3;
        buildField();
      });
      ++rowIndex;
    });
  }

  function setAllToStart() {
    gameOver = 0;
    rowIndex = 0;
    columnIndex = 2;
    game = [
      ["-1", "-1", "-1"],
      ["-1", "-1", "-1"],
      ["-1", "-1", "-1"],
    ];
  }

  function setPlayerName(number, name) {
    number === 1 ? (playerNameOne = name) : (playerNameTwo = name);
  }

  return { setPlayerName, setAllToStart, buildGameArray, removeAllChildren };
})();

ticTacToe.buildGameArray();

startButton.addEventListener("click", () => {
  ticTacToe.setAllToStart();
  screen.textContent = "";
  ticTacToe.removeAllChildren(gameBoard);
  ticTacToe.buildGameArray();
  dialogUsername.showModal();
});

closeDialog.addEventListener("click", (e) => {
  e.preventDefault();
  dialogUsername.close();
});

submitDialog.addEventListener("click", () => {
  ticTacToe.setPlayerName(1, document.querySelector(".player1").value);
  ticTacToe.setPlayerName(2, document.querySelector(".player2").value);
});
