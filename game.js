
let cellElement = document.querySelectorAll(".cell")
let showResult = document.querySelector(".winner-name")
let restartBtn = document.querySelector(".game-restart")

const PLAYER_X = "X"
const PLAYER_O = "O"
let nextTurn = false
let moveCount = 0

const winingCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

let board = [null, null, null, null, null, null, null, null, null]

function listeningForstart() {
    cellElement.forEach((cell) => {
        cell.addEventListener("click", onCellclick, {once:true})
    })
}

function onCellclick(e) {
    let cellId = e.target.id
    let currentPlayer = nextTurn ? PLAYER_X : PLAYER_O
    this.innerText = currentPlayer
    changeTurn()
    board[cellId -1] = currentPlayer
    moveCount++
    checkDrow()
    messageShow(currentPlayer)
    listeningForReset()
}

function stopListeing() {
    cellElement.forEach((cell) => {
        cell.removeEventListener("click", onCellclick)
    });
}

function messageShow(currentPlayer) {
    const {iswin, combo} = checkWin(currentPlayer)
    if(iswin){
       showResult.innerText = `${currentPlayer} is won`
       changeColor(combo)
       stopListeing()
    }
}

function changeColor(combo) {
    combo.forEach((element) => {
       let winBox = document.getElementById(`${element +1}`) 
       winBox.style.backgroundColor = "red"
    })
}

function changeTurn() {
    nextTurn = !nextTurn
}

function checkDrow() {
    if(moveCount === 9){
        showResult.innerText = `Match is Drow`
    }
}

function checkWin(currentPlayer) {
    let iswin 
    for (let i = 0; i < winingCombinations.length; i++) {
        let combo = winingCombinations[i]
        iswin = true
        for (let j = 0; j < combo.length; j++) {
            let index = combo[j];
            if(board[index] !== currentPlayer){
                iswin = false
            }
        }if(iswin){
            return {iswin, combo}
        }
    }return {iswin}
    
}

function listeningForReset() {
    restartBtn.addEventListener("click", gameReset)
}

function gameReset() {
    cellElement.forEach((cell) => {
        cell.innerText = ""
    })
    board.forEach((board) =>{
        board = null
    })
}


listeningForstart()