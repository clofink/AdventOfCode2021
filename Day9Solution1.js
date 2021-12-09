function day9Solution1(data) {
    data = data.split('\n');
    let lowestPoints = [];
    for (let i = 0; i < data.length; i++) {
        for (let t = 0; t < data[i].length; t++) {
            let currentPoint = parseInt(data[i][t]);
            let adjacentPoints = getAdjacentPoints(t, i, data);
            let lowestPoint = true;
            for (let point of adjacentPoints) {
                // console.log(getAdjacentPoints(t, i, data))
                if (currentPoint >= parseInt(point)) {
                    lowestPoint = false;
                }
            }
            if (lowestPoint) {
                lowestPoints.push(currentPoint);
            }
        }
    }
    let riskLevel = 0;
    for (let score of lowestPoints) {
        riskLevel += (score + 1);
    }
    return riskLevel;

    function getAdjacentPoints(x, y, map) {
        let adjacentPoints = [];
        if (y > 0) {
            adjacentPoints.push(map[y-1][x]);
        }
        if ((y + 1) < map.length) {
            adjacentPoints.push(map[y+1][x]);
        }
        if (x > 0) {
            adjacentPoints.push(map[y][x-1]);
        }
        if ((x + 1) < map[0].length) {
            adjacentPoints.push(map[y][x+1]);
        }
        return adjacentPoints;
    }
}