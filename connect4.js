var playerMaroon = "M";
var playerOrange = "Y";
var currPlayer = playerMaroon;

var gameOver = false;
var board;
// Height of placeable spaces (Starts at 5 for all)
var currColumns = [];

var rows = 6;
var columns = 7;

// When Page loads, do this function
window.onload = function() {
    setGame();
}

// Sets up game and populates tiles on the board
function setGame() {
    board = [];
    currColumns = [5, 5, 5, 5, 5, 5, 5];

    // Each circle on the board has an id
    // That id corresponds to a 2d array
    // Top left is (0,0), bottom right is (5, 6)
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            //JS
            row.push(' ');

            //HTML
            // Gets the ids and we will update them in JS
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            // When clicking on tile, want to add mar/ora piece
            tile.addEventListener("click", setPiece);

            // <div id="0-0" class="tile"></div>
            /* This line appends this HTML code automatically
                for us in the board tag */
            document.getElementById("board").append(tile); 
        }
        board.push(row);
    }
}

// Function for when a tile is clicked and a piece is placed
function setPiece() {
    // If game is over, nothing happens, nobody can place pieces
    if (gameOver) {
        return;
    }

    // Ex: "0-0" -> ID is split by delimiter ("-") -> Returns array ["0", "0"]
    let coords = this.id.split("-");
    // Array is strings so need to parse as int
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    // Gets info for specific column
    r = currColumns[c];
    // Means column is filled and can't place pieces there
    if (r < 0) {
        return;
    }
    
    // Update board based off new coords (Updates JS)
    board[r][c] = currPlayer;
    // Updates HTML
    let tile = document.getElementById(r.toString() + "-" + c.toString());
    // Determines which color piece to add to board
    if (currPlayer == playerMaroon) {
        tile.classList.add("maroon-piece");
        currPlayer = playerOrange;
    }
    else {
        tile.classList.add("orange-piece");
        currPlayer = playerMaroon;
    }

    // Updates row height for the column so we know piece is there
    r -= 1;
    currColumns[c] = r; // Updates the array

    // Called after end of every turn to see if connect 4
    checkWinner();
}

// Algorithm for checking all possibilities for win
function checkWinner() {
    // Horizontally checking
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            // If space isn't empty do a check for connect 4
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r][c + 1] && board[r][c + 1] == board[r][c + 2]
                    && board[r][c + 2] == board[r][c + 3]) {
                        setWinner(r, c);
                        return;
                    }
            }
        }
    }

    // Vertically checking
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 3; r++) {
            // If space isn't empty do a check for connect 4
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r + 1][c] && board[r + 1][c] == board[r + 2][c]
                    && board[r + 2][c] == board[r + 3][c]) {
                        setWinner(r, c);
                        return;
                    }
            }
        }
    }

    // Diagonally checking
    // Anti diagonally (Negative Slope)
    for (let r = 0; r < rows - 3; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r + 1][c + 1] && board[r + 1][c + 1] == board[r + 2][c + 2]
                    && board[r + 2][c + 2] == board[r + 3][c + 3]) {
                        setWinner(r, c);
                        return;
                    }
            }
        }
    }
    // Diagonally (Positive Slope)
    for (let r = 3; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r - 1][c + 1] && board[r - 1][c + 1] == board[r - 2][c + 2]
                    && board[r - 2][c + 2] == board[r - 3][c + 3]) {
                        setWinner(r, c);
                        return;
                    }
            }
        }
    }
}

// Changes the winner
function setWinner(r, c) {
    let winner = document.getElementById("winner");
    if (board[r][c] == playerMaroon) {
        winner.innerText = "Maroon Wins";
    }
    else {
        winner.innerText = "Orange Wins";
    }

    gameOver = true;
}