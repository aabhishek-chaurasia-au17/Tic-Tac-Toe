
let PLAYER_X = "X"
let PLAYER_O = "O"
let nextTurn 

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


const cellElements = document.querySelectorAll(".cell");
const btnRestart = document.querySelector(".game-restart");

function startListenningForClick(){
    cellElements.forEach(function (cell) {
        return cell.addEventListener("click", onButtonClick, {once: true})
    })
}


function onButtonClick(e) {
    let cell = e.target
    
    let currentPlayer
    if (nextTurn) {
       currentPlayer = this.innerHTML = PLAYER_X
       nextTurn = false
    }else{
       currentPlayer = this.innerHTML = PLAYER_O
       nextTurn = true
    }
    placeMark(cell, currentPlayer)
    if (checkwin(currentPlayer)) {
        alert(`winner ${currentPlayer}`)
        setTimeout(() => {
            window.location.reload()
        }, 1000);
        
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