function day9Solution2(data) {
    map = data.split('\n')
    for (let i = 0; i < map.length; i++) {
        let numbers = map[i];
        map[i] = []
        for (let number of numbers) {
            map[i].push(parseInt(number));
        }
    }
    let basinSizes = []
    for (var y = 0; y < map.length; y++) {
        for (var x = 0; x < map[y].length; x++) {

            basinSizes.push(floodfill(x, y, map));
        }
    }
    basinSizes.sort(function(a,b) {
        if (a > b) {
            return -1;
        }
        if (a < b) {
            return 1;
        }
        return 0;
    });
    let total = 1;
    for (let b = 0; b < 3; b++) {
        total *= basinSizes[b];
    }
    return total;

    // implemented based on the wikipedia article for floodfill
    function floodfill(x, y, map) {
        let basinSize = 0;
        let queue = [];
        queue.push([x,y]);
        let t = 0;
        while (queue.length > 0) {
            let nodePos = queue[0];
            let tempx = nodePos[0];
            let tempy = nodePos[1];

            queue.shift();
            if (map[tempy][tempx] != 9) {
                map[tempy][tempx] = 9;
                basinSize++;
                if (tempy > 0) {
                    if (map[tempy-1][tempx] != 9) {
                        queue.push([tempx, tempy-1]);
                    }
                }
                if ((tempy + 1) < map.length) {
                    if (map[tempy+1][nodePos[0]] != 9) {
                        queue.push([tempx, tempy+1]);
                    }
                }
                if (tempx > 0) {
                    if (map[tempy][tempx-1] != 9) {
                        queue.push([tempx-1, tempy]);
                    }
                }
                if ((tempx + 1) < map[0].length) {
                    if (map[tempy][tempx+1] != 9) {
                        queue.push([tempx+1, tempy]);
                    }
                }
            }
            t++;
        }
        return basinSize;
    }
}