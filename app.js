
const PLAYER_X = "X"
const PLAYER_O = "O"
let nextTurn = false
let boardMoves = 0;


const cellElements = document.querySelectorAll(".cell")
const btnRestart = document.querySelector(".game-restart");
const winnerText = document.querySelector(".winner-name");

let COMBOS = [
    [0, 1, 2],  //combos [0] = //[0,1,2] 
    [3, 4, 5],                 //[2,5,8]
    [6, 7, 8],  //a = combos[0]
    [0, 3, 6],  //[0,1,2]
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
    let divId = e.target.id
    // console.log(divId);

    let currentPlayer
    if (nextTurn) {
       
       this.innerHTML = PLAYER_X 
       currentPlayer = this.innerHTML
       playerTurn()

       board[divId -1] = currentPlayer
       boardMoves++
       
    }else{
       
       this.innerHTML = PLAYER_O
       currentPlayer = this.innerHTML
       playerTurn()
       board[divId -1] = currentPlayer
       boardMoves++
    }
    // console.log(board);

    placeMark(cell, currentPlayer)
    const {isWinner, combo} = checkwin(currentPlayer)

    if (isWinner) {
        setTimeout(() => {
            winnerText.innerHTML = `${currentPlayer} is winner`
           //[0,1,2]
        },);
        setTimeout(() => {
            window.location.reload()
        }, 2000);
    }
    checkDraw(boardMoves)    
}

function checkDraw(boardMoves) {
    if (boardMoves === 9) {
        winnerText.innerHTML = `Match is Draw`
    }
}


function placeMark(cell, currentPlayer) {
    cell.classList.add(currentPlayer)
}

function checkwin(currentPlayer){
    
    for (let i = 0; i < COMBOS.length; i++) {
        let combo = COMBOS[i] //[0,1,2]
        let isWinner = true
        for (let j = 0; j < combo.length; j++) {
            let index = combo[j]
            if(board[index] !== currentPlayer){ //
                isWinner = false
            }
            if(isWinner){
                return {isWinner, combo}
            }
            
            
        }
    }
    return {isWinner}

}


btnRestart.addEventListener("click", function(){
    window.location.reload()
})


startListenningForClick()