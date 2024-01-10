

var playerMaroon = "M";
var playerOrange = "Y";
var currPlayer = playerMaroon;

var gameOver = false;
var board;

var rows = 6;
var columns = 7;

// When Page loads, do this function
window.onload = function() {
    setGame();
}

// Sets up game and populates tiles on the board
function setGame() {
    board = [];

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
            // <div id="0-0" class="tile"></div>
            /* This line appends this HTML code automatically
                for us in the board tag */
            document.getElementById("board").append(tile); 
        }
        board.push(row);
    }
}