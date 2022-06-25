
// Create player objects
const Player = (player, letter, difficulty) => {

    let defLetter = 'X';
    let winMod = 1;
    const gameDifficulty = 'medium'


    if (letter != defLetter) winMod = -1;

    const playerName = player;
    const playerLetter = letter;


    // AI Opponent
    if (difficulty != null){
        gameDifficulty = difficulty;

        switch (difficulty){

            case 'easy':
                //easy AI
                break;
            case 'medium':
                //medium AI
                break;
            case 'hard':
                //hard AI
                break;
            case 'impossible':
                //impossible AI
                break;


        }


    }

    const tiles = document.querySelectorAll('.game-square');
    tiles.forEach(tile => console.log("Yum"))
  

    const AI = (difficulty) => {

        // easy AI
       
       
        
        const selectSquare = () => {
            tiles.forEach(square => {
                console.log(square);
                return ("Hmm")
            })
        }
        selectSquare();
        return {tiles, selectSquare}
    }

    const easyAI = AI('easy');
    //easyAI.selectSquare();
    return {playerName, letter, winMod, gameDifficulty, easyAI}

    }




//const player2Obj = Player("Player B", "O")

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
        const row = parseInt(square.getAttribute("data-row"));
        const col = parseInt(square.getAttribute("data-col"));

        if (square.classList.contains("selected-square")) return;
    
        gameBoard.setRowCol(row, col);
      // gameBoard.setOwner(square.id, gameBoard.getTurn())
        updateBoard(square);
        gameBoard.checkWinner();
        gameBoard.switchPlayersTurn();
        
        
    }

    const updateBoard = (square) => {
        
        
        const display = square.querySelector('.square-content');
        square.classList.add("selected-square");
        display.textContent = gameBoard.getTurn().letter;
       
    }
    

    const drawSquare = (square) => {

        square.querySelector('.square-content').textContent = gameBoard.getBoard(square.id).squareOwner.pTeam;
        const squareID = square.querySelector('.squareID');
        squareID.textContent = (`${squareID.textContent} (${gameBoard.getTurn().pName})`);
    }

    const launchGame = document.querySelector("#start-button");
    launchGame.addEventListener('click', () => gameLauncher())


    const gameLauncher = () => {

        const gameSettings = document.querySelector(".modal-container");
        gameSettings.style.display = "flex"
        const gameForm = gameSettings.querySelector("#create-game-form");
        let letterSelection;
        let diffSelection;
        

        const letterX = document.querySelector("#choose-X");
        console.log(letterX)
        const letterO = gameForm.querySelector("#choose-O");
        letterX.addEventListener('click', () => {
            letterX.classList.add("selected-letter");
            letterO.classList.remove("selected-letter");
            letterSelection = "X"
        })
        letterO.addEventListener('click', () => {
            letterO.classList.add("selected-letter");
            letterX.classList.remove("selected-letter");
            letterSelection = "O"
        })

        const diffButton = gameForm.querySelectorAll(".difficulty");
        diffButton.forEach(button => button.addEventListener('click', () => {
           
            console.log("click")
            // remove selection from other buttons
            diffButton.forEach(otherbutton => {
                otherbutton.classList.remove('selected-difficulty')
            });
            diffSelection = button.getAttribute("name");
            console.log(diffSelection)
            button.classList.add('selected-difficulty');

        }))

                                      

        gameForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const gameData = new FormData(gameForm);

            console.log(gameData.get('player_name'));
            

           

        });
    }

    const startGame = (e) => {
        
    }

    return { generateBoard}
}

)();
const playerObj = Player("Player A", "X")

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
    let _diag = []
    let _diagRev = [];
       
  

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
        
        // Top left, bottom right, and center row and cols will all be equal;
        if (row === col) {
            
            _diag[0] += _playerTurn.winMod;
        }

        // The bottom left, atop right and center coordinates of the grid
        // will equal the grid size (zero index count) when adding row + col
        if ((row + col) == (_winCount - 1)) _diagRev[0] += _playerTurn.winMod;
      
        checkWinner();
    }

    const getGridSize = () => _winCount

    
    createWinArray(_row);
    createWinArray(_col);
    createWinArray(_diag);
    createWinArray(_diagRev);


    function endGame(){
        console.log("Game is over");


        // Kill listeners

        // Style board


        // Popup Restart Modal >>>>> Refresh game


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