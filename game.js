
// Create player objects
const Player = (player, letter) => {

    let defLetter = 'X';
    let winMod = 1;
    
    if (letter != defLetter) winMod = -1;

    const playerName = player;
    const playerLetter = letter;
    console.log(winMod);

    return {playerName, letter, winMod}

}

const playerObj = Player("Player A", "X")
const player2Obj = Player("Player B", "O")

// Create game board

const displayGame = (() => {

    // references
    const game = document.querySelector('.game');
    const board = document.querySelector('.game-board');
    const scoreBoard = document.querySelector('#scoreboard');
    const turnHeader = document.querySelector('#turn-header');
    const turnText = document.querySelector('#turn-text')


    const _createSquare = (row, col) => {
        
        
        const square = document.createElement('div');
        const squareID = document.createElement('div');
        const squareContent = document.createElement('div');
        
    
        squareContent.classList.add("square-content");
        squareID.textContent = `${row} / ${col}`;
        squareID.classList.add('squareID')

        square.appendChild(squareID);
        square.appendChild(squareContent);
        setAttributes(square, {"id": "square", "data-row": row, "data-col": col, "data-pos": board.childElementCount});
        square.classList.add('game-square');

        // When player selects a square
        square.addEventListener('click', clickSquare.bind(playerObj, square))
        
        board.appendChild(square);     
    }   
    
   
    const generateBoard = (size) => {
        
        for (let i = 0; i < size; i++){

            for (let j = 0; j < size; j++){
                _createSquare(i, j)
            }

        }
    }
    
    const clickSquare = (square) => {
        const row = square.getAttribute("data-row");
        const col = square.getAttribute("data-col");

        if (square.classList.contains("selected-square")) return;
    
        gameBoard.setRowCol(row, col);
      // gameBoard.setOwner(square.id, gameBoard.getTurn())
        updateBoard(square);
        gameBoard.checkWinner();
        gameBoard.switchPlayersTurn();
        
        
    }

    const updateBoard = (square) => {
        
        
        const display = square.querySelector('.square-content');
        console.log(display);
        square.classList.add("selected-square");
        display.textContent = gameBoard.getTurn().letter;
       
    }
    

    const drawSquare = (square) => {

        square.querySelector('.square-content').textContent = gameBoard.getBoard(square.id).squareOwner.pTeam;
        const squareID = square.querySelector('.squareID');
        squareID.textContent = (`${squareID.textContent} (${gameBoard.getTurn().pName})`);
    }

    return {generateBoard}
}

)();

const gameBoard = (() => {

    const boardSize = 9;
    const _winCount = 3;

    let _playerTurn = playerObj;

    // storage of rows/columns/diagnals
    let _board = [];
    
    // Victory logic: 
    // _Everytime user clicks a square, 1 will be added (or subtracted) from 
    // the row/col/diagnal arrays. If a row, col, or diagnal reaches 3 (or -3)
    // that line must be filled, so the game is over.  
    let _row = []
    let _col = []
    let _diag1 = []
    let _diag2 = []
       
  

    const switchPlayersTurn = () => {

        _playerTurn == playerObj ? _playerTurn = player2Obj : _playerTurn = playerObj  
            
    }

    // returns player object, not player name
    const getTurn = () => _playerTurn;

    // Generate board


    // Create arrays we will check for victory condition
    const createWinArray = (array) => {
        
        array.length = _winCount;
        array.fill(0);
        _board.push(array)
      }  

    // When win condition array contents add up to 3 (or -3)
    // A line must be filled, so game ends in a win for that player
    const checkWinner = (row, col) => {

       for (arr of _board){
            console.log(arr);
            if (arr.includes(_winCount) || arr.includes(-_winCount)){

                console.log(`${_playerTurn.playerName} wins!`)
                endGame();
            }
       }
            

      
    };

    // Returns winner if there is one, false if not. 

       
    
    const setOwner = (pos, player) => {
        _board[pos].squareOwner = player;
    }

    // Returns square at pos, otherwise entire board
    const getBoard = (pos) => {
       return pos != null ? _board[pos] : _board;
    }

    const getRow = (row) => _row[row];
    const getCol = (col) => _col[col];

    const setRowCol = (row, col) => {
        _row[row] += _playerTurn.winMod;
        _col[col] += _playerTurn.winMod;
        checkWinner(row, col);
    }

    const getGridSize = () => _winCount

    
    createWinArray(_row);
    createWinArray(_col);
    createWinArray(_diag1);
    createWinArray(_diag2);

    function endGame(){
        console.log("Game is over");


    }
    
    return {_row, _board, setRowCol, getRow, getCol, setOwner, getBoard, switchPlayersTurn, getTurn, checkWinner, getGridSize}

})();


displayGame.generateBoard(gameBoard.getGridSize());
// Mark spot (look at color.js)




// Detect winner

// Thought --  create object for every row/column
// that could win.  When an object is filled call a win method?

//helpers

// Set multiple attributes from one function call
function setAttributes(element, attributes)
{
    Object.entries(attributes).forEach(([key, value]) => {
        element.setAttribute(key, value)
    });
}