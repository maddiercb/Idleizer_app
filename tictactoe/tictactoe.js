const tiles = document.querySelectorAll(".tile");
const PLAYER_X = "X";
const PLAYER_O = "O";
let turn = PLAYER_X;

const boardState = Array(tiles.length);
boardState.fill(null);

//Elements
const strike = document.getElementById("strike");
const gameOverArea = document.getElementById("game-over-area");
const gameOverText = document.getElementById("game-over-text");
const playAgain = document.getElementById("play-again");
let availableTiles = [1, 2, 3, 4, 5, 6, 7, 8, 9];
playAgain.addEventListener("click", startNewGame);


tiles.forEach((tile) => tile.addEventListener("click", tileClick));

function setHoverText() {
  //remove all hover text
  tiles.forEach((tile) => {
    tile.classList.remove("x-hover");
    tile.classList.remove("o-hover");
  });

  const hoverClass = `${turn.toLowerCase()}-hover`;

  tiles.forEach((tile) => {
    if (tile.innerText == "") {
      tile.classList.add(hoverClass);
    }
  });
}

setHoverText();

function tileClick(event) {
  if (gameOverArea.classList.contains("visible")) {
    return;
  }

  const tile = event.target; // const to let
  const tileNumber = tile.dataset.index;  // const to let
  if (tile.innerText != "") {
    return;
  }

  if (turn === PLAYER_X) {
    tile.innerText = PLAYER_X;
    boardState[tileNumber - 1] = PLAYER_X;
    availableTiles.splice(tileNumber - 1, tileNumber - 1);
    console.log(availableTiles);
    turn = PLAYER_O;
  } else {
    tile.innerText = PLAYER_O;
    boardState[tileNumber - 1] = PLAYER_O;
    turn = PLAYER_X;
  }
  // [O_Move] == 4){
  //   boardState[tileNumber - 1] = PLAYER_O;
  //   computerMovefour.className = "visible";
  // }
  // if(availableTiles[O_Move] == 5){
  //   boardState[tileNumber - 2] = PLAYER_O;
  //   computerMovefive.className = "visible";
  // }
  // if(availableTiles[O_Move] == 6){
  //   boardState[tileNumber - 3] = PLAYER_O;
  //   computerMovesix.className = "visible";
  // }
  // if(availableTiles[O_Move] == 7){
  //   boardState[tileNumber - 1] = PLAYER_O;
  //   computerMoveseven.className = "visible";
  // }
  // if(availableTiles[O_Move] == 8){
  //   boardState[tileNumblet O_Move = Math.floor(Math.random() * availableTiles.length);
  // console.log(availableTiles[O_Move]);
  // if(availableTiles[O_Move] == 1){
  //   boardState[tileNumber - 1] = PLAYER_O;
  //   computerMoveone.className = "visible";
  // }
  // if(availableTiles[O_Move] == 2){
  //   boardState[tileNumber - 1] = PLAYER_O;
  //   computerMovetwo.className = "visible";
  // }
  // if(availableTiles[O_Move] == 3){
  //   boardState[tileNumber - 1] = PLAYER_O;
  //   computerMovethree.className = "visible";
  // }
  // if(availableTileser - 2] = PLAYER_O;
  //   computerMoveeight.className = "visible";
  // }
  // if(availableTiles[O_Move] == 9){
  //   boardState[tileNumber - 3] = PLAYER_O;
  //   computerMovenine.className = "visible";
  // }
  // turn = PLAYER_X;


  setHoverText();
  checkWinner();
}

function checkWinner() {
  //Check for a winner
  for (const winningCombination of winningCombinations) {
    //Object Destructuring
    const { combo, strikeClass } = winningCombination;
    const tileValue1 = boardState[combo[0] - 1];
    const tileValue2 = boardState[combo[1] - 1];
    const tileValue3 = boardState[combo[2] - 1];

    if (
      tileValue1 != null &&
      tileValue1 === tileValue2 &&
      tileValue1 === tileValue3
    ) {
      strike.classList.add(strikeClass);
      gameOverScreen(tileValue1);
      return;
    }
  }

  //Check for a draw
  const allTileFilledIn = boardState.every((tile) => tile !== null);
  if (allTileFilledIn) {
    gameOverScreen(null);
  }
}

function gameOverScreen(winnerText) {
  let text = "Draw!";
  if (winnerText != null) {
    text = `Winner is ${winnerText}!`;
  }
  gameOverArea.className = "visible";
  connect.className = "visible";
  gameOverText.innerText = text;
}



function startNewGame() {
  strike.className = "strike";
  gameOverArea.className = "hidden";
  boardState.fill(null);
  tiles.forEach((tile) => (tile.innerText = ""));
  turn = PLAYER_X;
  setHoverText();
  availableTiles = [1, 2, 3, 4, 5, 6, 7, 8, 9];
}

const winningCombinations = [
  //rows
  { combo: [1, 2, 3], strikeClass: "strike-row-1" },
  { combo: [4, 5, 6], strikeClass: "strike-row-2" },
  { combo: [7, 8, 9], strikeClass: "strike-row-3" },
  //columns
  { combo: [1, 4, 7], strikeClass: "strike-column-1" },
  { combo: [2, 5, 8], strikeClass: "strike-column-2" },
  { combo: [3, 6, 9], strikeClass: "strike-column-3" },
  //diagonals
  { combo: [1, 5, 9], strikeClass: "strike-diagonal-1" },
  { combo: [3, 5, 7], strikeClass: "strike-diagonal-2" },
];
