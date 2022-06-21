

// Array for tic tac toe board





// Player factory ?




// Create player objects

const playerObj = {

    //for testing
    pName: "Player One",
    pTeam: "X",
    
   

}
const player2Obj = {

    //for testing
    pName: "Player Two",
    pTeam: "O",
    
   

}


// Create game board
const gameBoard = (() => {

    const boardSize = 9;

    let _playerTurn = playerObj
    let _board = [];

    



    const switchPlayersTurn = () => {

            _playerTurn == playerObj? _playerTurn = player2Obj: _playerTurn = playerObj  
            
    }

    const getTurn = () => {
        //onsole.log(_playerTurn);
        return _playerTurn;
    }

    // Generate board
    const createBoard = (playerCount) => {

        // One gameboard unit
        let BoardSquare = (position) => {

            // position 0-8
            const boardPosition = position;
            let squareOwner = null; 
           
            return {boardPosition, squareOwner}
        }
    
        for (let i = 0; i < boardSize;  i++){ 
            _board[i] = BoardSquare(i)
        }
    }


    const setOwner = (pos, player) => {
        _board[pos].squareOwner = player;
    }

    // Returns square at pos, otherwise entire board
    const getBoard = (pos) => {
       return pos != null ? _board[pos] : _board;
    }


    const winningConditions = () => {



    }
    

    
    return {createBoard, setOwner, getBoard, switchPlayersTurn, getTurn};

})();

gameBoard.createBoard();

const displayGame = (() => {

    const game = document.querySelector('.game');
    const board = document.querySelector('.game-board');
    const scoreBoard = document.querySelector('#scoreboard');
    const turnHeader = document.querySelector('#turn-header');
    const turnText = document.querySelector('#turn-text')



    const _createSquare = (square) => {
        
        
        const cell = document.createElement('div');
        const cellID = document.createElement('div');
        const cellContent = document.createElement('div');
        
    
        cellContent.classList.add("cell-content");
        cell.setAttribute('id', square);
        cellID.textContent = square;
        cellID.classList.add('cellID')
        cell.appendChild(cellID);
        cell.appendChild(cellContent);
        cell.addEventListener('click', clickSquare.bind(playerObj, cell))
        cell.classList.add('game-square');
        board.appendChild(cell);     
    }   
    
    const generateBoard = (size) => {
       
        for (square in size){
            _createSquare(square);
        }

    }
    
    const clickSquare = (cell) => {
        console.log(gameBoard.getBoard(cell.id).squareOwner);
        if (gameBoard.getBoard(cell.id).squareOwner != null) {
            alert("Pick an empty square");
            return;
        }

        gameBoard.setOwner(cell.id, gameBoard.getTurn())
        
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






displayGame.generateBoard(gameBoard.getBoard())

// Mark spot (look at color.js)




// Detect winner

// Thought --  create object for every row/column
// that could win.  When an object is filled call a win method?