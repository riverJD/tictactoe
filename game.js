

// Array for tic tac toe board





// Player factory ?




// Create player objects



// Create game board
const gameBoard = (() => {

    const boardSize = 9; 

    let board = [];

    // Generate board
    const createBoard = (playerCount) => {

        let BoardSquare = (position) => {

            // position 0-8
            const boardPosition = position;
    
            let squareOwner = null; 
           
            return {boardPosition, squareOwner}
        }
       
        for (let i = 0; i < boardSize;  i++){ 
            board[i] = BoardSquare(i)
        }
    }

    const setOwner = (pos, player) => {
        board[pos].squareOwner = player;
    }

    // Returns square at pos, otherwise entire board
    const getBoard = (pos) => {
       return pos != null ? board[pos] : board;
    }
    
    return {createBoard, setOwner, getBoard};

})();

gameBoard.createBoard();
gameBoard.setOwner(0, 'Player 1')

const displayGame = (() => {

    const updateBoard = () => {
        
    }
    const _createSquare = (square) => {
        
        const board = document.querySelector('.game-board');
        const cell = document.createElement('div');
        cell.setAttribute('id', `square:${square}`);
        cell.textContent = square
        cell.classList.add('game-square');
        board.appendChild(cell);     
    }   
    
    const generateBoard = (size) => {
       
        for (square in size){
            _createSquare(square);
            
        }
    }
    
    const drawSquare = (position) => {

    }

    return {generateBoard}
}

)();



displayGame.generateBoard(gameBoard.getBoard())

// Mark spot (look at color.js)




// Detect winner

// Thought --  create object for every row/column
// that could win.  When an object is filled call a win method?