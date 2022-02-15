/*-------------------------------- Constants --------------------------------*/

const winningCombos = [
  [0, 1, 2, 3], [1, 2, 3, 4], [2, 3, 4, 5], [3, 4, 5, 6],
  [7, 8, 9, 10], [8, 9, 10, 11], [9, 10, 11, 12], [10, 11, 12, 13], [14, 15, 16, 17], [15, 16, 17, 18], [16, 17, 19, 19], [17, 18, 19, 20], [21, 22, 23, 24], [22, 23, 24, 25], [23, 24, 25, 26], [24, 25, 26, 27], [28, 29, 30 ,31], [29, 30, 31, 32], [30, 31, 32, 33], [31, 32, 33, 34], [35, 36, 37, 38], [36, 37, 38, 39], [37, 38, 39, 40], [38, 39, 40, 41], [0, 7, 14, 21], [7, 14, 21, 28], [14, 21, 28, 35], [1, 8, 15, 22], [8, 15, 22, 29], [15, 22, 29, 36], [2, 9, 16, 23], [9, 16, 23, 30], [16, 23, 30, 37], [3, 10, 17, 24], [10, 17, 24, 31], [17, 24, 31, 38], [4, 11, 18, 25], [11, 18, 25, 32], [18, 25, 32, 39], [5, 12, 19, 26], [12, 19, 26, 33], [19, 26, 33, 40],
  [6, 13, 20, 27], [13, 20, 27, 34], [22, 16, 10, 4], [20, 27, 34, 41], [3, 9, 15, 21], [28, 22, 16, 10], [35, 29, 23, 17], [29, 23, 17, 11], [23, 17, 11, 5], [36, 30, 24, 18], [30, 24, 18, 12], [24, 18, 12, 6], [37, 31, 25, 19], [31, 25, 19, 13], [38, 32, 26, 20], [27, 19, 11, 3], [34, 26, 18, 10], [26, 18, 10, 2], [41, 33, 25, 17], [33, 25, 17, 9], [25, 17, 9, 1], [40, 32, 24, 16], [32, 24, 16, 8], [24, 16, 8, 0], [39, 31, 23, 15], [31, 23, 15, 7], [38, 30, 22, 14], [42, 43, 44, 45], [43, 44, 45, 46], [44, 45, 46, 47], [45, 46, 47, 48], [42, 36, 30, 24], [42, 35, 28, 21], [43, 36, 29, 22], [44, 37, 30, 23], [45, 38, 31, 24], [46, 39, 32, 25], [47, 40, 33, 26], [48, 41, 34, 27], [43, 37, 31, 25], [44, 38, 32, 26], [45, 39, 33, 27], [48, 40, 32, 24], [47, 39, 31, 23], [46, 38, 30, 22], [45, 37, 29, 21]
]


const player1 = 1
const player2 = -1
let winner = null
let T, nextTurn
let columns = []

/*------------------------ Cached Element References ------------------------*/

const board = document.querySelector('.container')
const startGame = document.querySelector('#start-game')
const resetGame = document.querySelector('#reset-game')
const message = document.querySelector('#message')


/*-------------------------------- Event Listeners --------------------------------*/

board.addEventListener('click', handleClick)
resetGame.addEventListener('click', init)

/*-------------------------------- Functions --------------------------------*/


function init() {
  message.className = ""
  message.innerHTML = "Welcome! Player 1 starts the game!"
  gameSquares = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
  columns = [[42, 35, 28, 21, 14, 7, 0], [43, 36, 29, 22, 15, 8, 1], [44, 37, 30, 23, 16, 9, 2], [45, 38, 31, 24, 17, 10, 3], [46, 39, 32, 25, 18, 11, 4], [47, 40, 33, 26, 19, 12, 5], [48, 41, 34, 27, 20, 13, 6]]
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
      board.children[idx].style.backgroundColor = 'red';
    } else if(cir === 1) {
      board.children[idx].style.backgroundColor = 'yellow';
    } else if(cir === null) {
      board.children[idx].style.backgroundColor = ''
    }
  })
}


function handleClick(evt) {
const id = (evt.target.id)
if(gameSquares[id] === null) {
  clickHere(id)
  resetGame.removeAttribute('hidden')
  render()
}
}

function clickHere(id) {
  for(let i = 0; i < columns.length; i++) {
    if(columns[i].includes(parseInt(id))) {
      columns[i].forEach(function(col, id) {
        if(id === null) {
          gameSquares[Math.max(...columns[i])] = nextTurn
        } else if(id === 1 || id === -1) {
          gameSquares[Math.max(...columns[i])] = nextTurn
          columns[i].shift(id)
        }   
      })
    } 
  }
}

function switchTurn() {
  nextTurn *= -1
  renderTurn()
}

function renderTurn() {
  if(nextTurn === 1) {
    message.innerHTML = "Your turn, <span class='player2'>Player 2</span>!"
    } else if(nextTurn === -1) {
    message.innerHTML = "Your turn, <span class='player1'>Player 1</span>!"
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
    confetti.start(4000)
    return winner = nextTurn  
  }
  })
  if(!gameSquares.includes(null) && winner === null) {
    return winner = T
  }
}

function renderWinningMessage() {
  if(winner === 1) {
    message.innerHTML = "<span class='player1'>Player 1</span> is the winner! Amazing job!"
  } else if(winner === -1) {
    message.innerHTML = "<span class='player2'>Player 2</span> is the winner! Congratulations!"
  } else if(winner === T) {
    message.className = "tie"
    message.innerHTML = "It's a tie! Try again?"
  }
}
