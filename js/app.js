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
const message = document.querySelector('#message')


/*-------------------------------- Event Listeners --------------------------------*/

// theSquares.forEach((square, idx) => {
//   square.addEventListener('click', handleClick)
// })

board.addEventListener('click', handleClick)

/*-------------------------------- Functions --------------------------------*/

function init() {
  gameSquares = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
  message.textContent = 'Welcome, Press Start to Begin!'
  nextTurn = 1
  T = 'tie'
  render()
}
init()

function render() {
  switchTurn()
  gameSquares.forEach(function(cir, idx){
    if(cir === -1) {
      message.textContent = 'Your turn, player 2!'
      board.children[idx].textContent = ''
      board.children[idx].style.backgroundColor = 'red';
    } else if(cir === 1) {
      message.textContent = 'Your turn, player 1!'
      board.children[idx].textContent = ''
      board.children[idx].style.backgroundColor = 'yellow';
    } else if(cir === null) {
      board.children[idx].textContent = ''
      board.children[idx].style.backgroundColor = ''
    }
   }); 
  }


function handleClick(evt) {
const i = (evt.target.id)
if(gameSquares[i] === null) {
  gameSquares[i] = nextTurn
  render()
}
console.log(i)
}


function switchTurn() {
  nextTurn *= -1
}