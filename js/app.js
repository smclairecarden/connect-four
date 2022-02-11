/*-------------------------------- Constants --------------------------------*/

const winningCombos = [
  [0, 1, 2, 3], [1, 2, 3, 4], [2, 3, 4, 5], [3, 4, 5, 6],
  [7, 8, 9, 10], [8, 9, 10, 11], [9, 10, 11, 12], [10, 11, 12, 13], [14, 15, 16, 17], [15, 16, 17, 18], [16, 17, 19, 19], [17, 18, 19, 20], [21, 22, 23, 24], [22, 23, 24, 25], [23, 24, 25, 26], [24, 25, 26, 27], [28, 29, 30 ,31], [29, 30, 31, 32], [30, 31, 32, 33], [31, 32, 33, 34], [35, 36, 37, 38], [36, 37, 38, 39], [37, 38, 39, 40], [38, 39, 40, 41], [0, 7, 14, 21], [7, 14, 21, 28], [14, 21, 28, 35], [1, 8, 15, 22], [8, 15, 22, 29], [15, 22, 29, 36], [2, 9, 16, 23], [9, 16, 23, 30], [16, 23, 30, 37], [3, 10, 17, 24], [10, 17, 24, 31], [17, 24, 31, 38], [4, 11, 18, 25], [11, 18, 25, 32], [18, 25, 32, 39],
  [5, 12, 19, 26], [12, 19, 26, 33], [19, 26, 33, 40],
  [6, 13, 20, 27], [13, 20, 27, 34], [20, 27, 34, 41],
  [3, 9, 15, 21], [28, 22, 16, 10], [35, 29, 23, 17], [29, 23, 17, 11], [23, 17, 11, 5], [36, 30, 24, 18], [30, 24, 18, 12], [24, 18, 12, 6], [37, 31, 25, 19], [31, 25, 19, 13], [38, 32, 26, 20], [27, 19, 11, 3], [34, 26, 18, 10], [26, 18, 10, 2], [41, 33, 25, 17], [33, 25, 17, 9], [25, 17, 9, 1], [40, 32, 24, 16], [32, 24, 16, 8], [24, 16, 8, 0], [39, 31, 23, 15], [31, 23, 15, 7], [38, 30, 22, 14]
]


let grid = []

const player1 = 1
const player2 = -1
let  nextTurn = 1
let T, winner

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
resetGame.addEventListener('click', init)

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
  getWinner()
  renderWinningMessage()
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

function getWinner() {
winningCombos.forEach(function(combo){
  let youWin = Math.abs(gameSquares[combo[0]] + gameSquares[combo[1]] + gameSquares[combo[2]] + gameSquares[combo[3]])
  if(youWin === 4) {
    return winner = nextTurn
  }
})
  if(!gameSquares.includes(null) && winner === null) winner = T
}

function renderWinningMessage() {
  if(winner === 1) {
    return message.textContent = `Player 1 is the winner! Amazing job!`
  } else if(winner === -1) {
    return message.textContent = `Player 2 is the winner! Congratulations!`
  } else if(winner === T) {
    return message.textContent = `'It's a tie! Try again?`
  }
}