const cellElement = document.querySelectorAll(".cell")
const showResult = document.querySelector(".winner-name")
const restartBtn = document.querySelector(".game-restart")
const Player_symbol = {
    X : "X",
    O : "O"
}

let winingCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

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
    const currentPlayer = nextTurn ? Player_symbol.X : Player_symbol.O
    this.innerText = currentPlayer
    changeTurn()
    gameBoard[cellId -1] = currentPlayer
    moveCount++
    showMessage(currentPlayer)
}

function disableStartGameListening() {
    cellElement.forEach((cell) => {
        cell.removeEventListener("click", onCellclick)
    });
}

function showMessage(currentPlayer) {
    const {isWinner, combo} = checkForWinner(currentPlayer)
    if(isWinner){
        showResult.innerText = `${currentPlayer} is won`
        changeColor(combo)
        disableStartGameListening()
        gameOver()
    }else if(moveCount === 9){
        showResult.innerText = `Match is Draw`
        gameOver()
    }
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
    restartBtn.addEventListener("click", gameReset)
}

function gameReset() {
    // debugger
    cellElement.forEach((cell) => {
        cell.innerText = ""
        cell.style.backgroundColor = "white"
        cell.removeEventListener("click", onCellclick)
        
    })
    winingCombinations = []
    nextTurn = false
    moveCount = 0
    gameBoard = initialgameBoardValue
    showResult.innerText = `Play`;
    restartBtn.classList.add("hide")
    startGameClickListening()
}


startGameClickListening()