/*-------------------------------- Constants --------------------------------*/

winningCombos = []


let grid = []

const player1 = 1
const player2 = -1
let  nextTurn, T

/*------------------------ Cached Element References ------------------------*/

const board = document.querySelector('.container')
const theSquares = document.querySelectorAll('.grid-area')
const startGame = document.querySelector('#start-game')
const resetGame = document.querySelector('#reset-game')



/*-------------------------------- Event Listeners --------------------------------*/

// theSquares.forEach((square, idx) => {
//   square.addEventListener('click', handleClick)
// })

board.addEventListener('click', handleClick)

/*-------------------------------- Functions --------------------------------*/

function init() {
  boardSquares = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
  nextTurn = 1
  T = 'tie'
  render()
}
init()

function render() {
  switchTurn()
}

function handleClick(evt) {
const i = (evt.target.id)
if(boardSquares[i] === null) {
  boardSquares[i] = nextTurn
  render()
}
console.log(i)
}


function switchTurn() {
  nextTurn *= -1
}