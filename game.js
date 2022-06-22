
// Create player objects
const Player = (player, letter) => {

    let defLetter = 'X';
    let winMod = 1;
    
    if (letter != defLetter) winMod = -1;

    const playerName = player;
    const playerLetter = letter;
    console.log(winMod);

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
        
        
        const cell = document.createElement('div');
        const cellID = document.createElement('div');
        const cellContent = document.createElement('div');
        
    
        cellContent.classList.add("square-content");
        cellID.textContent = `${row} / ${col}`;
        cellID.classList.add('cellID')

        cell.appendChild(cellID);
        cell.appendChild(cellContent);
        setAttributes(cell, {"id": "square", "data-row": row, "data-col": col, "data-pos": board.childElementCount});
        cell.classList.add('game-square');

        // When player selects a square
        cell.addEventListener('click', clickSquare.bind(playerObj, cell))
        
        board.appendChild(cell);     
    }   
    
   
    const generateBoard = (size) => {
        
        for (let i = 0; i < size; i++){

            for (let j = 0; j < size; j++){
                _createSquare(i, j)
            }

        }
    }
    
    const clickSquare = (cell) => {
        const row = cell.getAttribute("data-row");
        const col = cell.getAttribute("data-col");

        if (gameBoard.getRow(row) != 0) {
            alert("Pick an empty square");
            return;
        }

       // gameBoard.setOwner(cell.id, gameBoard.getTurn())
        
        drawSquare(cell);
        updateBoard();
        gameBoard.switchPlayersTurn();
        
    }

    const updateBoard = () => {
        
        turnText.textContent = gameBoard.getTurn().pName;
    }
    

    const drawSquare = (cell) => {

        cell.querySelector('.cell-content').textContent = gameBoard.getBoard(cell.id).squareOwner.pTeam;
        const cellID = cell.querySelector('.cellID');
        cellID.textContent = (`${cellID.textContent} (${gameBoard.getTurn().pName})`);
    }

    return {generateBoard}
}

)();

const gameBoard = (() => {

    const boardSize = 9;
    const _winCount = 3;

    let _playerTurn = playerObj

    // storage of each square in order for visuals
    let _board = [];
    
    // _row[x,y,z] / _col[x,y,z] coordinates of player choices
    // if any one row, or column (or diag) fills up, that player wins
    let _row = []
    let _col = []
    let _diag1 = []
    let _diag2 = []
       
  

    const switchPlayersTurn = () => {

            _playerTurn == playerObj? _playerTurn = player2Obj: _playerTurn = playerObj  
            
    }

    // returns player object, not player name
    const getTurn = () => _playerTurn;

    // Generate board
    const createBoard = () => {
      
       
        // One gameboard unit
        const BoardSquare = (coord) => {

            
            const boardPosition = coord;
            let squareOwner = null; 
           
            return {boardPosition, squareOwner}
        }

    }

    // Create arrays we will check for victory condition
    const createWinArray = (array) => {
        
        array.length = _winCount;
        array.fill(0);
      }  

    // When win condition array contents add up to 3 (or -3)
    // A line must be filled, so game ends in a win for that player
    const checkWinner = () => {

       const winner = _row.reduce( 
        (prev, cur) => prev + cur);

        return winner === _winCount;
       };
        
    
    const setOwner = (pos, player) => {
        _board[pos].squareOwner = player;
    }

    // Returns square at pos, otherwise entire board
    const getBoard = (pos) => {
       return pos != null ? _board[pos] : _board;
    }

    const getRow = (row) => _row[row];
    const setRow = (row) =>  _row[row] += _playerTurn.winMod;

    displayGame.generateBoard(_winCount);
    createWinArray(_row);
    createWinArray(_col);
    createWinArray(_diag1);z
    createWinArray(_diag2);
    
    return {_board, _col, getRow, createBoard, setOwner, getBoard, switchPlayersTurn, getTurn, checkWinner,}

})();

gameBoard.createBoard();
gameBoard.checkWinner();
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