const cellElement = document.querySelectorAll(".cell")
const showResult = document.querySelector(".winner-name")
const restartBtn = document.querySelector(".game-restart")
const PLAYERS = {
    X : "X",
    O : "O"
}

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

let winCombos = winingCombinations

const initialgameBoardValue = new Array(9).fill(null)
let gameBoard = initialgameBoardValue
let nextTurn = false
let moveCount = 0


function startGameClickListening() {
    cellElement.forEach((cell) => {
        cell.addEventListener("click", onCellclick, {once:true})
    })
    
}

function onCellclick(e) {
    const cellId = e.target.id
    const currentPlayer = nextTurn ? PLAYERS.X : PLAYERS.O
    this.innerText = currentPlayer
    changeTurn()
    gameBoard[cellId -1] = currentPlayer
    moveCount++
    const {isWinner, combo} = checkForWinner(currentPlayer)
    if(isWinner){
        changeColor(combo)
        showMessage(`${currentPlayer} is won`)
        disableStartGameListening()
        gameOver()
        return;
    }
    if(moveCount === 9){
        showMessage(`Match is Draw`)
        gameOver()
    }
    
}

function disableStartGameListening() {
    cellElement.forEach((cell) => {
        cell.removeEventListener("click", onCellclick)
    });
}

function showMessage(massege) {
    showResult.innerText = `${massege}`
}

function showResetBtn() {
    restartBtn.classList.remove("hide")
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

function checkForWinner(currentPlayer) {
    let isWinner 
    for (let i = 0; i < winingCombinations.length; i++) {
        let combo = winingCombinations[i]
        isWinner = true
        for (let j = 0; j < combo.length; j++) {
            let index = combo[j];
            if(gameBoard[index] !== currentPlayer){
                isWinner = false
            }
        }if(isWinner){
            return {isWinner, combo}
        }
    }return {isWinner}
    
}

function gameOver() {
    showResetBtn() 
}

function gameReset() {
    cellElement.forEach((cell) => {
        cell.innerText = ""
        cell.style.backgroundColor = "white"
        cell.removeEventListener("click", onCellclick)
        
    })

    winCombos = []
    nextTurn = false
    moveCount = 0
    gameBoard = initialgameBoardValue
    showResult.innerText = `Play`;
    restartBtn.classList.add("hide")
    startGameClickListening()
}


startGameClickListening()