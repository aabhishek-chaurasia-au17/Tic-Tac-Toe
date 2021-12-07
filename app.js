
const PLAYER_X = "X"
const PLAYER_O = "O"
let nextTurn = false
let boardMoves = 0;

const cellElements = document.querySelectorAll(".cell");
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


function startListenningForClick(){
    cellElements.forEach(function (cell) {
        return cell.addEventListener("click", onButtonClick, {once: true})
    })
}

function playerTurn() {
    nextTurn = !nextTurn
}


function onButtonClick(e) {
    let cell = e.target
    
    let currentPlayer
    if (nextTurn) {
       currentPlayer = this.innerHTML = PLAYER_X
       playerTurn()
       boardMoves++
    }else{
       currentPlayer = this.innerHTML = PLAYER_O
       playerTurn()
       boardMoves++
    }
    placeMark(cell, currentPlayer)
    
    if (checkwin(currentPlayer)) {
        setTimeout(() => {
            winnerText.innerHTML = `${currentPlayer} is winner`
        },);
        
        setTimeout(() => {
            window.location.reload()
        }, 2000);
        
    }

    if (boardMoves === 9) {
        winnerText.innerHTML = `Match is Draw`
    }
}

function placeMark(cell, currentPlayer) {
    cell.classList.add(currentPlayer)
}

function checkwin(currentPlayer){
   return COMBOS.some(combination => {
    return combination.every(index => {
        return cellElements[index].classList.contains(currentPlayer)
    })
   })
}

btnRestart.addEventListener("click", function(){
    window.location.reload()
})


startListenningForClick()