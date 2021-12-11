function day11Solution1(data) {
    data = data.split('\n');
    for (let i = 0; i < data.length; i++) {
        let string = data[i].split('');
        let newRow = [];
        for (let num of string) {
            newRow.push(parseInt(num));
        }
        data[i] = newRow;
    }
    let numOfSteps = 100;
    let flashCount = 0;
    for (let i = 0; i < numOfSteps; i++) {
        data = incrementEach(data);
        while (anyOver9(data)) {
            for (let y = 0; y < data.length; y++) {
                for (let x = 0; x < data[y].length; x++) {
                    if (data[y][x] > 9) {
                        data[y][x] = 0;
                        flashCount++;
                        let adjacentCells = getAdjacent([x, y], data);
                        for (adjacentCell of adjacentCells) {
                            let aX = adjacentCell[0];
                            let aY = adjacentCell[1];
                            if (data[aY][aX] > 0) {
                                data[aY][aX]++;
                            }
                        }
                    }
                }
            }
        }
    }
    return flashCount;

    function anyOver9(map) {
        for (let row of map) {
            for (let col of row) {
                if (col > 9) {
                    return true;
                }
            }
        }
        return false;
    }

    function incrementEach(map) {
        for (let y = 0; y < map.length; y++) {
            for (let x = 0; x < map[y].length; x++) {
                map[y][x]++;
            }
        }
        return map;
    }

    function getAdjacent(cell, map) {
        let adjacentCells = [];
        let cellX = cell[0];
        let cellY = cell[1];
        if (cellY > 0) {
            if (cellX > 0) {
                adjacentCells.push([cellX-1, cellY-1]);
            }
            if ((cellX + 1) < map[cellY].length) {
                adjacentCells.push([cellX+1, cellY-1]);
            }
            adjacentCells.push([cellX, cellY-1]);
        }
        if ((cellY + 1) < map.length) {
            if (cellX > 0) {
                adjacentCells.push([cellX-1, cellY+1]);
            }
            if ((cellX + 1) < map[cellY].length) {
                adjacentCells.push([cellX+1, cellY+1]);
            }
            adjacentCells.push([cellX, cellY+1]);
        }
        if (cellX > 0) {
            adjacentCells.push([cellX-1, cellY]);
        }
        if ((cellX + 1) < map[cellY].length) {
            adjacentCells.push([cellX+1, cellY]);
        }
        return adjacentCells;
    }
}