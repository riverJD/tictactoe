
// Create player objects
const Player = (player, letter, difficulty) => {

    let defLetter = 'X';
    let winMod = 1;
    let isTurn = true;
    let bot = false;

    if (letter != defLetter) winMod = -1;

    const playerName = player;
    const playerLetter = letter;


    // AI Opponent
    if (difficulty != null){
        //gameDifficulty = difficulty;

        switch (difficulty){




        }

    } 

    const turn = () => {

        if (bot){
            // Wait a second or two for better UE
            const delay = (Math.random() * 2000) + 1000; 
            setTimeout(() => { bot.turn(); }, delay)       
        }
        else{

        }
    }


    const AI = (difficulty) => {

        const mode = difficulty;
        let movesMade = 0;
        const readBoard = () => {
            const squares = document.querySelectorAll(".game-square")
            return squares;
        }

        // Select a square, unselected square
        const selectSquare = () => {
            console.log(mode)
            let selection = ""
            switch(mode){

                case 'Easy':
                    // Just randomly pick a square
                    console.log("Ez")
                    selection = readBoard()[Math.floor(Math.random() * readBoard().length)];
                    break;
                case 'Medium':
                    // Pick a square based on row/col with lowest count.
                    //selection = readBoard()[Math.floor(Math.random() * readBoard().length)];
                    
                    // Will find position in row and columns that has lowest value, either empty or mostly AI's position on board.
                    // Ex: in the array row[-2, 0, 1], row[0] is the lowest value and also represents the coordinate on the grid.
                 
                    


                    selection = gameBoard.getSquare(row, col);
                    
                    console.log(selection);

                    
                    break;
                case 'Hard':
                    //hard AI
                    break;
                case 'Impossible':
                    //impossible AI
                    break;
            }
  

            if (!gameBoard.getSelected(selection)){
                return selection
            }

            return selectSquare();
        
            
        }

        const findNext = (coordinate) => {
            console.log('....')
            console.log(coordinate)
            let tmp = (coordinate + 1) % 3;
            console.log(tmp)
            return tmp;
        }

        // One turn
        const turn = () => {
            gameBoard.clickSquare(selectSquare())
        }       
        return {mode, turn, movesMade}
    }


    if (difficulty != null){
        bot = AI(difficulty);
    }
 
 
    //easyAI.selectSquare();
    return {playerName, letter, winMod, isTurn, bot, turn}

    }




const searchBoard = (square) => {


    // base case


    let tmp;

    let next = square;
    
    const coord = gameBoard.getCoords(square);
    console.log(coord)
    
    const findNeighbors = () => {

        let neighbor;

        for (let i = -1; i <= 1; i++){

            

        }
        

    }


    return coord;
}









// Create game board

const displayGame = (() => {

    // References
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
        setAttributes(square, {"id": `square(${row},${col})`, "data-row": row, "data-col": col, "data-pos": board.childElementCount});
        square.classList.add('game-square');

        // When player selects a square
        square.addEventListener('click', () => {

        if (playerObj.isTurn) gameBoard.clickSquare(square)


        })

        gameBoard.generateSquare(square);
        board.appendChild(square);     
    }   
    
   
    const generateBoard = (size) => {
        
        for (let i = 0; i < size; i++){

            for (let j = 0; j < size; j++){
                _createSquare(i, j)

            }

        }
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

    return { generateBoard, updateBoard}
}

)();
const playerObj = Player("Player A", "X")
const player2Obj = Player("Player B", "O", "Medium")

const gameBoard = (() => {


    
    const boardSize = 9;
    const _winCount = 3;

    let _playerTurn = playerObj;

    // storage of rows/columns/diagnals
    let _board = [];
    let _winningValues = []
    let _selected = [];
    
    // Victory logic: 
    // _Everytime user clicks a square, 1 will be added (or subtracted) from 
    // the row/col/diagnal arrays. If a row, col, or diagnal reaches 3 (or -3)
    // that line must be filled, so the game is over.  
    let _row = []
    let _col = []
    let _diag = []
    let _diagRev = [];
       
  
  const generateSquare = (target) => {


    const NewSquare = (target) => {

        const boardPosition = getCoords(target);
        let squareOwner = null;
        let value = initialSquareValue(target); 

        return {boardPosition, squareOwner, value}
    }
    getSquareValue(target)
    square = NewSquare(target);

    _board.push(square);
  }

  const initialSquareValue = (square) => {

    const baseValue = 5; 
    const bonusValue = 3;
    let value = 0; 
    
    const coords = getCoords(square);
    
    if (coords.row == 0){
        value += baseValue;
        console.log(coords.row + "." + coords.col)
        
    }

    if (coords.col == 0){
        value+=baseValue
    }

    
  
    if (coords.row == (_winCount - 1)){
        value += baseValue;

    }

    if (coords.col == (_winCount - 1)){
        value += baseValue;
    }

    if (coords.row == 1 && coords.col == 1){
        value += bonusValue + baseValue;
        console.log(value);
    }

    //console.log(value);

    console.log(`----`)
    console.log("Returning " + value)
    return value; 

  }

  const setSquareValue = (square) => {

    let modvalue = 10;
    let coord = getCoords(square);


    const index = _board.findIndex(pos => {
          
        if ( pos.boardPosition.row === coord.row && pos.boardPosition.col === coord.col){
            return pos.boardPosition;
        } 
 
    })
    
    _board[index].value += modvalue;
    console.log(_board[index].value);

  }

  const getSquareValue = (square) => {





  }

    //    for (let i = 0; i < boardSize;  i++){ 
      //      _board[i] = BoardSquare(i)
      //  }



    const switchPlayersTurn = () => {

        _playerTurn.isTurn = false;
        _playerTurn == playerObj ? _playerTurn = player2Obj : _playerTurn = playerObj  
        _playerTurn.isTurn = true;
    }

    // returns player object, not player name
    const getTurn = () => _playerTurn;

    // Generate board


    // Create arrays we will check for victory condition
    const createWinArray = (array) => {
        
        array.length = _winCount;
        array.fill(0);
        _winningValues.push(array)
      }  

    // When win condition array contents add up to 3 (or -3)
    // A line must be filled, so game ends in a win for that player
    const checkWinner = (row, col) => {

       for (arr of _winningValues){
            
            if (arr.includes(_winCount) || arr.includes(-_winCount)){

                console.log(`${_playerTurn.playerName} wins!`)
                endGame();
            }
       }
            

      
    };

    const clickSquare = (square) => {

        
        const row = parseInt(square.getAttribute("data-row"));
        const col = parseInt(square.getAttribute("data-col"));

        getSelected(square);
        if (square.classList.contains("selected-square")) return false;
        _selected.push(square);
        setRowCol(row, col);
      // gameBoard.setOwner(square.id, gameBoard.getTurn())
        displayGame.updateBoard(square);
        setSquareValue(square);
        checkWinner();
        switchPlayersTurn();
        if (getTurn().isTurn) getTurn().turn();
            
    }

    // returns true if square is already occupied
    const getSelected = (square) => {
        return (_selected.includes(square))
    }
    
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

    const getCoords = (square) => {

        const row = square.getAttribute('data-row')
        const col = square.getAttribute('data-col')

        return {row, col}


    }

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

    // returns DOM object at specified coordinates
    const getSquare = (row, col) => {
        console.log(row + "-" + col)
        const square = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        return square;
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
    
    return {_selected, _row, _col, _board, setSquareValue, generateSquare, getSquareValue, getCoords, setRowCol, getSquare, getSelected,  getRow, getCol, setOwner, getBoard, switchPlayersTurn, getTurn, checkWinner, getGridSize, clickSquare}
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