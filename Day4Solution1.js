function day4Solution1(result) {
    return solve(result.split('\n'));

    function solve(data) {
        let parsedData = parseInput(data);
        let drawnNumbers = parsedData.splice(0, 1)[0][0][0].split(',');
        let bingoBoards = parsedData;
        //for (let board of bingoBoards) {
            for (let i = 0; i < drawnNumbers.length; i++) {
                for (let board of bingoBoards) {
                    let drawnSoFar = drawnNumbers.slice(0, i);
                    if (checkBoardForWin(drawnSoFar, board)) {
                        let unmarkedTotal = sumUnmarked(board, drawnSoFar);
                        let numberCalled = parseInt(drawnSoFar[drawnSoFar.length - 1]);
                        // console.log(unmarkedTotal * numberCalled);
                        return (unmarkedTotal * numberCalled);
                    };
                }
            }
        //}
    }

    function parseInput(data) {
        let parsedInput = [];
        let currentPuzzle = [];
        for (let i = 0; i < data.length; i++) {
            let row = data[i];
            if (row == "") {
                parsedInput.push(currentPuzzle);
                currentPuzzle = [];
            }
            else {
                currentPuzzle.push(parseRow(row));
            }
            if (i == (data.length - 1)) {
                parsedInput.push(currentPuzzle);
            }
        }
        return parsedInput;
    }

    function parseRow(row) {
        // takes the string of a row and returns the array for it
        let parsedRow = row.split(' ');
        for (let i = (parsedRow.length - 1); i >= 0; i--) {
            if (parsedRow[i] === '') {
                parsedRow.splice(i, 1);
            }
        }
        return parsedRow;
    }

    function checkBoardForWin(numbersCalled, board) {
        // checks for a matching row
        for (let row of board) {
            for (let i = 0; i < row.length; i++) {
                if (numbersCalled.indexOf(row[i]) == -1) {
                    // then there is no match
                    break;
                }
                if (i == (row.length - 1)) {
                    return true;
                }
            }
        }
        // checks for a matching column
        for (let i = 0; i < 5; i++) {
            for (let r = 0; r < board.length; r++) {
                let row = board[r];
                if (numbersCalled.indexOf(row[i]) == -1) {
                    // then there is no match
                    break;
                }
                if (r == (board.length - 1)) {
                    return true;
                }
            }
        }
    }

    function sumUnmarked(board, numbersCalled) {
        let score = 0;
        for (let row of board) {
            for (let column of row) {
                if (numbersCalled.indexOf(column) == -1) {
                    score += parseInt(column);
                }
            }
        }
        return score;
    }
}