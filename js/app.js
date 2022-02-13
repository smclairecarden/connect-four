/*-------------------------------- Constants --------------------------------*/

const winningCombos = [
  [0, 1, 2, 3], [1, 2, 3, 4], [2, 3, 4, 5], [3, 4, 5, 6],
  [7, 8, 9, 10], [8, 9, 10, 11], [9, 10, 11, 12], [10, 11, 12, 13], [14, 15, 16, 17], [15, 16, 17, 18], [16, 17, 19, 19], [17, 18, 19, 20], [21, 22, 23, 24], [22, 23, 24, 25], [23, 24, 25, 26], [24, 25, 26, 27], [28, 29, 30 ,31], [29, 30, 31, 32], [30, 31, 32, 33], [31, 32, 33, 34], [35, 36, 37, 38], [36, 37, 38, 39], [37, 38, 39, 40], [38, 39, 40, 41], [0, 7, 14, 21], [7, 14, 21, 28], [14, 21, 28, 35], [1, 8, 15, 22], [8, 15, 22, 29], [15, 22, 29, 36], [2, 9, 16, 23], [9, 16, 23, 30], [16, 23, 30, 37], [3, 10, 17, 24], [10, 17, 24, 31], [17, 24, 31, 38], [4, 11, 18, 25], [11, 18, 25, 32], [18, 25, 32, 39], [5, 12, 19, 26], [12, 19, 26, 33], [19, 26, 33, 40],
  [6, 13, 20, 27], [13, 20, 27, 34], [22, 16, 10, 4], [20, 27, 34, 41], [3, 9, 15, 21], [28, 22, 16, 10], [35, 29, 23, 17], [29, 23, 17, 11], [23, 17, 11, 5], [36, 30, 24, 18], [30, 24, 18, 12], [24, 18, 12, 6], [37, 31, 25, 19], [31, 25, 19, 13], [38, 32, 26, 20], [27, 19, 11, 3], [34, 26, 18, 10], [26, 18, 10, 2], [41, 33, 25, 17], [33, 25, 17, 9], [25, 17, 9, 1], [40, 32, 24, 16], [32, 24, 16, 8], [24, 16, 8, 0], [39, 31, 23, 15], [31, 23, 15, 7], [38, 30, 22, 14]
]

let grid = []

const player1 = 1
const player2 = -1
let winner = null
let T, nextTurn

// let row1 = [35, 36, 37, 38, 39, 40, 41]
// let row2 = [28, 29, 30, 31, 32, 33, 34]
// let row3 = [21, 22, 23, 24, 25, 26, 27]
// let row4 = [14, 15, 16, 17, 18, 19, 20]
// let row5 = [7, 8, 9, 10, 11, 12, 13]
// let row6 = [0, 1, 2, 3, 4, 5, 6]

// console.log(row1)

/*------------------------ Cached Element References ------------------------*/

const board = document.querySelector('.container')
const theSquares = document.querySelectorAll('.grid-area')
const startGame = document.querySelector('#start-game')
const resetGame = document.querySelector('#reset-game')
const message = document.querySelector('#message')
const row0 = document.querySelectorAll('.row0')
const row1 = document.querySelectorAll('.row1')
const row2 = document.querySelectorAll('.row2')
const row3 = document.querySelectorAll('.row3')
const row4 = document.querySelectorAll('.row4')
const row5 = document.querySelectorAll('.row5')
const column0 = document.querySelectorAll('.column0')
const column1 = document.querySelectorAll('.column1')
const column2 = document.querySelectorAll('.column2')
const column3 = document.querySelectorAll('.column3')
const column4 = document.querySelectorAll('.column4')
const column5 = document.querySelectorAll('.column5')
const column6 = document.querySelectorAll('.column6')

// let columns = [[35, 28, 21, 14, 7, 0], [36, 29, 22, 15, 8, 1], [37, 30, 23, 16, 9, 2], [38, 31, 24, 17, 10, 3], [39, 32, 25, 18, 11, 4], [40, 33, 26, 19, 12, 5], [41, 34, 27, 20, 13, 6]]

let columns = [column0, column1, column2, column3, column4, column5, column6]


/*-------------------------------- Event Listeners --------------------------------*/

// function handleCellMouseOver(e) {
//   const cell = e.target

//  const [rowIndex, columnIndex] = getCellLocation(cell)

//  console.log(rowIndex, columnIndex)
  
// }


board.addEventListener('click', handleClick)
resetGame.addEventListener('click', init)

/*-------------------------------- Functions --------------------------------*/


function init() {
  message.className = ""
  message.textContent = "Welcome! Press start to begin!"
  gameSquares = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
  resetGame.setAttribute('hidden', true)
  nextTurn = 1
  winner = null
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
      board.children[idx].classList.add('player1')
      board.children[idx].style.backgroundColor = 'red';
    } else if(cir === 1) {
      board.children[idx].classList.add('player2')
      board.children[idx].style.backgroundColor = 'yellow';
    } else if(cir === null) {
      board.children[idx].style.backgroundColor = ''
    }
  })
}


function handleClick(evt) {
const i = (evt.target.id)
if(gameSquares[i] === null) {
  gameSquares[i] = nextTurn
  resetGame.removeAttribute('hidden')
  render()
  clickHere()
}
}

function clickHere() {
  let column = columns[parseInt(event.target.id)]
  for(let i = 0; i < column.length; i++) {
    if(winner === null) {
      return
    } else if(gameSquares[column[i]] === null) {
      gameSquares[column[i]] === nextTurn
    } 
  }
  getWinner()
  switchTurn()
  render()
  return

  }

function switchTurn() {
  nextTurn *= -1
  renderTurn()
}

function renderTurn() {
  if(nextTurn === 1) {
    message.className = "player1"
    message.textContent = "Your turn, player 2!"
  } else if(nextTurn === -1) {
    message.className = "player2"
    message.textContent = "Your turn, player 1!"
    } 
}

// function getWinner() {
// for(let i = 0; i < winningCombos.length; i++) {
//   let winningNum = winningCombos[i]
//   let num1 = winningCombos[i][0]
//   let num2 = winningCombos[i][1]
//   let num3 = winningCombos[i][2]
//   let num4 = winningCombos[i][3]
//  }
// }

function getWinner() {
winningCombos.forEach(function(combo){
  let youWin = Math.abs(gameSquares[combo[0]] + gameSquares[combo[1]] + gameSquares[combo[2]] + gameSquares[combo[3]])
  if(youWin === 4) {
    return winner = nextTurn
  }
})
  if(!gameSquares.includes(null) && winner === null) {
    return winner = T
  }
}

function renderWinningMessage() {
  if(winner === 1) {
    message.className = "winner"
    message.textContent = "Player 1 is the winner! Amazing job!"
  } else if(winner === -1) {
    message.className = "winner"
    message.textContent = "Player 2 is the winner! Congratulations!"
  } else if(winner === T) {
    message.className = "tie"
    message.textContent = "It's a tie! Try again?"
  }
}

