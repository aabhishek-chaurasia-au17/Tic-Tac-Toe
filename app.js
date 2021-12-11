
const PLAYER_X = "X"
const PLAYER_O = "O"
let nextTurn = false
let boardMoves = 0;

const cellElements = document.querySelectorAll(".cell")
const btnRestart = document.querySelector(".game-restart");
const winnerText = document.querySelector(".winner-name");

let COMBOS = [
    [0, 1, 2],  
    [3, 4, 5],   
    [6, 7, 8],  
    [0, 3, 6], 
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let board = [null, null, null, null, null, null, null, null, null];

function startListenningForClick(){
    cellElements.forEach(function (cell) {
        cell.addEventListener("click", onButtonClick, {once: true})
    })
}

function playerTurn() {
    nextTurn = !nextTurn
}

function onButtonClick(e) {
    let cell = e.target
    let divId = cell.id
    let currentPlayer 

    this.innerHTML = nextTurn ? PLAYER_X : PLAYER_O
    currentPlayer = this.innerHTML
    playerTurn()
    board[divId -1] = currentPlayer
    boardMoves++
    placeMark(cell, currentPlayer)
    const {isWin, combo} = checkwin(currentPlayer) 
    if (isWin) return winnerText.innerHTML = `${currentPlayer} is winner`
    checkDraw(boardMoves)    
    ListenningForRestart()
}

function checkDraw(boardMoves) {
    if (boardMoves === 9) return winnerText.innerHTML = `Match is Draw`
}


function placeMark(cell, currentPlayer) {
    cell.classList.add(currentPlayer)
}

function checkwin(currentPlayer){
    let isWin
    for (let i = 0; i < COMBOS.length; i++) {
        let combo = COMBOS[i];
        isWin = true
        for (let j = 0; j < combo.length; j++) {
            let indexNum = combo[j];
            if(board[indexNum] !== currentPlayer){
                isWin = false
            }
        }if(isWin){
           return {isWin, combo}
        }
    }return {isWin}
    
}

function ListenningForRestart(){
    btnRestart.addEventListener("click", restartGame)
}

function restartGame() {
    
    board.forEach((board) => {
      board = null;
    });

    cellElements.forEach((cell) => {
        cell.innerHTML = '';
    });
      winnerText.innerText = `Play`;

}

startListenningForClick()