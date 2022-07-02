
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

    const addToNeighbor = (selection, val) => {

       
        selection.neighbors.forEach(neighbor => {
            let next = gameBoard.getSquare(neighbor.row, neighbor.col);
           
            gameBoard.setSquareValue.addValue(next, val);

            const nextN = gameBoard.getSquare(next.row, next.col);
            gameBoard.setSquareValue.addValue(nextN, val);
            
        })


    }


    const AI = (difficulty) => {

        let description = "";
        const mode = difficulty;
        let movesMade = 0;
        const readBoard = () => {
            const squares = document.querySelectorAll(".game-square")
            return squares;
        }

        // Select a square, unselected square
        const selectSquare = () => {
            const lowValue = 30;
            const highValue = 100;


            
            let selection = ""
            switch(mode){

                          
                case 'Easy':
                       // Pick a square based on row/col with lowest count.
                    //selection = readBoard()[Math.floor(Math.random() * readBoard().length)];
                    
                    // Will find position in row and columns that has lowest value, either empty or mostly AI's position on board.
                    // Ex: in the array row[-2, 0, 1], row[0] is the lowest value and also represents the coordinate on the grid.

                  
                    const select = () => {

                        // Modify some values
                        
                        let value = lowValue;


                        const squareOptions = gameBoard.getArrayHighestValues();
                        console.log((squareOptions))
                        
                        square = squareOptions[Math.floor(Math.random() * squareOptions.length)];
                  
                        const row = parseInt(square.boardPosition.row);
                        const col = parseInt(square.boardPosition.col);
                        selection = gameBoard.getSquare(row, col);
                        
                        console.log(`Choosing square... ${selection.row}, ${selection.col}`)
    
                        addToNeighbor(selection, value);

                      
                        addToNeighbor(selection, value);
                        
                        return selection;
                        }
                       
                        selection = select();
    
                        return selection;
               
            // Future use? //
             case 'Medium':
                   break;
             case 'Hard':
            //hard AI
                    break;
                case 'Impossible':
                    
                bbbbbbb
                    break;
            }
  

            if (!gameBoard.getSelected(selection)){
                return selection
            }

            return selectSquare();
        
            
        }

        const highestValue = () => {

            const temp = Math.max(gameBoard._board.map(e => e.value))
            return temp;
       
        }

        const findNext = (coordinate) => {

            let tmp = (coordinate + 1) % 3;
            console.log(tmp)
            return tmp;
        }

        // One turn
        const turn = () => {
            gameBoard.pickSquare(selectSquare())
        }       
        return {mode, turn, movesMade, highestValue}
    }


    if (difficulty != null){
        bot = AI(difficulty);
    }
 


 
    //easyAI.selectSquare();
    return {playerName, letter, winMod, isTurn, bot, turn, addToNeighbor}

    }


    /*
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


*/




// Create game board

const displayGame = (() => {

    // References
    const game = document.querySelector('.game');
    const board = document.querySelector('.game-board');
    const scoreBoard = document.querySelector('#scoreboard');
    const turnHeader = document.querySelector('#turn-header');
    const turnText = document.querySelector('#turn-text')
    const description = document.querySelector("#description")

              description.textContent = `EasyBot is just learning the game.
                                        It might beat you if you don't pay attention.
                                        Can you spot its weakness?`

    // Button to start game
    const launchGame = document.querySelector("#start-button");
    launchGame.addEventListener('click', () => gameLauncher())

    const gameLauncher = () => {


    
        // Popup Settings Form
        const gameSettings = document.querySelector(".modal-container");
        const gameForm = gameSettings.querySelector("#create-game-form");
        const name = gameSettings.querySelector('#name-input')
        
        let letterSelection;
        let botLetter;
        let difficulSelection;
        
        gameSettings.style.display = "flex";

 
        
        const letterX = document.querySelector("#choose-X");
        letterX.addEventListener('click', () => {
            letterX.classList.add("selected-letter");
            letterO.classList.remove("selected-letter");
            letterSelection = "X"
            botLetter = "O"
        })
        const letterO = gameForm.querySelector("#choose-O");
        letterO.addEventListener('click', () => {
            letterO.classList.add("selected-letter");
            letterX.classList.remove("selected-letter");
            letterSelection = "O"
            botLetter = "X"
        })

        const diffButton = gameForm.querySelectorAll(".difficulty");
        diffButton.forEach(button => button.addEventListener('click', () => {
           
            // Swaps highlighted button
            diffButton.forEach(otherbutton => {
                otherbutton.classList.remove('selected-difficulty')
            });
            diffSelection = button.value;

            button.classList.add('selected-difficulty');

            if (button.id === "easy-button"){
                
                description.textContent = `EasyBot is just learning the game.
                                        It might beat you if you don't pay attention.
                                        Can you spot its weakness?`
            }
            else{
                description.textContent = `HardBot only sees the grid. Make the wrong move, and you'll lose.
                                        The only winning move is not to play.`
            }
        }))

        const closeForm = document.querySelector("#close-form");
        closeForm.addEventListener("click", () => gameSettings.style.display = "none");

        gameForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const gameData = new FormData(gameForm);
            console.log(gameData)
            console.log(name.value)
            console.log(letterSelection)
            console.log(diffSelection)
            gameSettings.style.display = "none";
            gameBoard.gameActive = true;
            gameBoard.generateBoard(gameBoard.getGridSize());
            window.const = playerObj = Player(name.value, letterSelection);
            window.const = player2Obj = Player(`${diffSelection}Bot`, botLetter, diffSelection);
            
        });
    }



                ///////////////


    const createSquare = (newSquare) => {
        
    
        
        const square = document.createElement('div');
        const squareID = document.createElement('div');
        const squareContent = document.createElement('div');
        const squareValue = document.createElement('div');
    
        squareValue.classList.add('square-value')
        squareContent.classList.add("square-content");
        squareID.textContent = `${newSquare.row} / ${newSquare.col}`;
        squareID.classList.add('squareID')
       
        square.appendChild(squareID);
        square.appendChild(squareContent);
        square.appendChild(squareValue);
        setAttributes(square, {"id": `square(${newSquare.row},${newSquare.col})`, "data-row": newSquare.row, "data-col": newSquare.col, "data-pos": board.childElementCount});
        square.classList.add('game-square');

        // When player selects a square
        square.addEventListener('click', () => {

        if (playerObj.isTurn) gameBoard.clickSquare(square)


        })

        //gameBoard.generateSquare(square);
        board.appendChild(square);     
    }   
    
  
    

    const updateBoard = (square) => {
        
        dom = squareToDOM(square);
        const display = dom.querySelector('.square-content');
        dom.classList.add("selected-square");
        display.textContent = gameBoard.getTurn().letter;
       
    }
    
    // Returns the DOM associated with a given square on the board
    const squareToDOM = (square) => {
        

        const dom = document.querySelector(`[data-row="${square.row}"][data-col="${square.col}"]`);

        return dom;

    }

    const drawSquare = (square) => {

        square.querySelector('.square-content').textContent = gameBoard.getBoard(square.id).squareOwner.pTeam;
        const squareID = square.querySelector('.squareID');
        squareID.textContent = (`${squareID.textContent} (${gameBoard.getTurn().pName})`);
    }






    const startGame = (e) => {
        
    }

    return {updateBoard, createSquare, squareToDOM}
}

)();


// REPLACE WITH FORM

//const player2Obj = Player("Player B", "O", "Easy")

const gameBoard = (() => {


    
    const boardSize = 9;
    const _winCount = 3;
    let highestValue = 0;
    let gameActive;

    if (!gameActive) return;

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
       
   
    const generateBoard = (size) => {
        
        for (let i = 0; i < size; i++){

            for (let j = 0; j < size; j++){
                
                generateSquare(i, j);
                
            }

        }

        // Attach neighbors to square.
        for (square in _board){
            _board[square].neighbors = findNeighbors(_board[square]);

        }

        
    }

  const generateSquare = (setRow, setCol) => {


    const NewSquare = () => {

        const row = setRow; 
        const col = setCol;
        const boardPosition = {row, col}
        let squareOwner = null;
        let value = 0;
        const neighbors = [];


        return {row, col, boardPosition, squareOwner, value, neighbors}
    }
    
    square = NewSquare();
    square.value = initialSquareValue(square);
    getSquareValue(square);
    _board.push(square);
    if (square.row === square.col){
        _diag.push(square);
    }
    displayGame.createSquare(square)

  }

  const findNeighbors = (square) => {

   
    const min = 0;
    const max = 2;

    CurRow = square.boardPosition.row;
    CurCol = square.boardPosition.col;
    let array = [];

    const findNeighbor = () => {
 
        let row = CurRow;
        let col = CurCol;
        let newCord = {};
        for (let i = -1; i <= 1; i += 2){
            
           
           if (CurRow + i >= min && CurRow + i <= max){
            row = CurRow;
            col = CurCol;

            row =  (CurRow + i)


            const neighbor = {row, col}



            
            const neighborP = _board.find( element => (element.boardPosition.col == col && element.boardPosition.row == row))


            array.push(neighbor)
           }

         
           if (CurCol + i >= min && CurCol + i <= max){
            row = CurRow;
            col = CurCol;

            col =  (CurCol + i)



            const neighbor = {row, col}
     
            
            const neighborP = _board.find( element => element.boardPosition.col == col && element.boardPosition.row == row)
 
            array.push(neighbor)
           }

        }

        const neighborP = {row: 1, col: 1}
        array.push(neighborP);

    }
    findNeighbor();

    return array;
}


  const initialSquareValue = (square) => {

    const baseValue = 5; 
    const bonusValue = 2;
    let value = 0; 
    
    //const coords = getCoords(square);
    
    if (square.row == 0){
        value += baseValue;

        
    }

    if (square.col == 0){
        value+=baseValue
    }

    
  
    if (square.row == (_winCount - 1)){
        value += baseValue
        

    }

    if (square.col == (_winCount - 1)){
        value += baseValue
    }

    // Center square
    if (square.row == 1 && square.col == 1){
        value += baseValue + bonusValue;
    
    }



    return value; 

  }



  const setSquareValue = ((square) => {

    let modvalue = 20;
   
    
    // Add specified value, or default mod value
    const addValue = (square, value) => {
       
        if (square.squareOwner != null) return;
        square.value += value;
    
        refreshValues();
  
        //text.forEach(value => value.textContent = square.value )
       // text.textContent = square.value;
    
    }

    const setValue = (square, newValue) => {
 
        
        square.value = newValue;
        refreshValues();

    }

    const addNeighborValues = (square) => {
        let coord = square;
        
  
       if (getTurn().bot) modvalue += 5;

        for (pos of _board){

       // _board.findIndex(pos => {
          
        let newPos = pos;
        
            



        // Add value to squares along shared row/column
        if ( pos.boardPosition.row === coord.row || pos.boardPosition.col === coord.col){    
 
            // High value for blocking a win on row or column
            if (getRow(pos.boardPosition.row) === 2 || getCol(pos.boardPosition.col) == 2 || getRow(pos.boardPosition.row) === -2 || getCol(pos.boardPosition.col) === -2){
              addValue(pos, 1000);
            }

            addValue(pos, modvalue);
    
        }

        // High value for blocking a win on diagnal
        if (_diag[0] == 2){
               
            // The coordinates of squares in diagnal will equal eachother. 
            if (pos.boardPosition.row == pos.boardPosition.col){
                
                addValue(pos, 1000);
            }
        }

        // High value for blocking a win on reverse diagnal
        if (_diagRev[0] == 2){
            console.log('.')
            // The coordinates of squares in reverse diagnal will add up to two (wincount or size of grid - 1)
            if (pos.boardPosition.row + pos.boardPosition.col === (_winCount - 1)){
                addValue(pos, 1000);
            }
        }
    

        // More points for center square
        if (pos.boardPosition.row == 1 && pos.boardPosition.col == 1){
            addValue(pos, modvalue * .75)
        }

        // Points for opposite corner


        if ((pos.boardPosition.row === coord.row) && (pos.boardPosition.col === coord.col)){

            setValue(pos, 0);
        }
        
     
        if (pos.value > highestValue){

        highestValue = pos.value;
        }

        refreshValues();


       
     
}
}

    return {addValue, setValue, addNeighborValues}

})();

    const refreshValues = () => {

        const values = []
        const valueTexts = document.querySelectorAll('.square-value');
        
        valueTexts.forEach(value => {

            const index = value.parentNode.getAttribute('data-pos');
            value.textContent = _board[index].value;
            values.push(_board[index].value);

        })

        highestValue = (Math.max(...values));
        
    }


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

    const clickSquare = (dom) => {

        if (!gameActive) return;
        
        
        if (dom.classList.contains("selected-square")) return false;
      
        square = _board[dom.getAttribute("data-pos")];
        playerObj.addToNeighbor(square, 30);
       
        pickSquare(square);


    }


    const pickSquare = (square) => {
        


        getSelected(square)
        setRowCol(square.row, square.col);
        _selected.push(square);
        displayGame.updateBoard(square);
        square.squareOwner = getTurn();
        setSquareValue.addNeighborValues(square);
        setSquareValue.setValue(square, 0)




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

    const getCoords = (dom) => {

        const row = parseInt(dom.getAttribute('data-row'));
        const col = parseInt(dom.getAttribute('data-col'));

        return {row, col}
    }

    const getHighestValue = () => {
        return highestValue;
    }

    const getSquareValue = (square) => {
        return square.value;
    }

    const getArrayHighestValues = () => {
        const highest = _board.filter(item => item.value === highestValue);
        return highest;
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
              
        const square = _board.find( element => element.boardPosition.col == col && element.boardPosition.row == row);
        return square;
    }

    const getGridSize = () => _winCount

    
    createWinArray(_row);
    createWinArray(_col);
    createWinArray(_diag);
    createWinArray(_diagRev);


    // When win condition array contents add up to 3 (or -3)
    // A line must be filled, so game ends in a win for that player
    const checkWinner = (row, col) => {

        // Check if winner found
       for (arr of _winningValues){
            
            if (arr.includes(_winCount) || arr.includes(-_winCount)){

                endGame(getTurn());
            }
       }
       // Check if board full
      
       if (_selected.length === boardSize){
        endGame(false);
       }

            

      
    }

    function endGame(winner){
       
        const endHeader = document.querySelector("#turn-header")
        const endText = document.querySelector("#turn-text")
  
        console.log(winner)
        if (!winner){
            endHeader.textContent = "DRAW!"
            endText.textContent = "Would you like to play again?"
           
        } 
        
        else{
        
            endHeader.textContent = `${winner.playerName} wins!`
            endText.textContent = "Play another game?"

        }
        // mute listeners

        gameActive = false;
        // Style board


        // Popup Restart Modal >>>>> Refresh game


    }
    
    
    return {gameActive, _winningValues, _selected, _row, _col, _board, generateBoard, getArrayHighestValues ,getHighestValue, setSquareValue, generateSquare, getSquareValue, getCoords, setRowCol, getSquare, getSelected,  getRow, getCol, setOwner, getBoard, switchPlayersTurn, getTurn, checkWinner, getGridSize, pickSquare, clickSquare, highestValue}
})();



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