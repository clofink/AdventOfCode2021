function day13Solution1(data) {
    data = data.split('\n');
    let mapData = parseInput(data);
    console.log(mapData)
    // construct a map
    let bounds = getMax(mapData.coords);
    console.log(bounds);
    let map = constructMap(bounds[1] + 1, bounds[0] + 1)
    for (let coord of mapData.coords) {
        let x = coord[0];
        let y = coord[1];
        map[y][x] = '#';
    }

    function getMax(points) {
        let maxY = 0;
        let maxX = 0;
        for (let point of points) {
            if (point[0] > maxX) {
                maxX = point[0];
            }
            if (point[1] > maxY) {
                maxY = point[1];
            }
        }
        return [maxX, maxY];
    }

    // for (let fold of mapData.folds) {
    //     if (fold.direction === 'vertical') {
    //         map = foldVertical(fold.location, map);
    //     }
    //     else {
    //         map = foldHorizontal(fold.location, map);
    //     }
    //     console.log(map)
    // }
    let fold = mapData.folds[0]
    if (fold.direction === 'vertical') {
        map = foldVertical(fold.location, map);
    }
    else {
        map = foldHorizontal(fold.location, map);
    }
    return countDots(map);

    function constructMap(sizeY, sizeX) {
        let map = [];
        for (let y = 0; y < sizeY; y++) {
            let row = [];
            for (let x = 0; x < sizeX; x++) {
                row.push('.');
            }
            map.push(row);
        }
        return map;
    }

    function countDots(map) {
        let dotCount = 0;
        for (let y = 0; y < map.length; y++) {
            for (let x = 0; x < map[0].length; x++) {
                if (map[y][x] === '#') {
                    dotCount++;
                }
            }
        }
        return dotCount;
    }

    function parseInput(data) {
        let coords = [];
        let folds = [];
        for (let row of data) {
            if (row === '') {
                continue;
            }
            if (row.split(' ')[0] === 'fold') {
                let temp = row.split(' ');
                let fold = temp[2].split('=');
                folds.push({direction: fold[0] == 'y' ? 'vertical' : 'horizontal', location: parseInt(fold[1])})
            }
            else {
                let temp = row.split(',');
                coords.push([parseInt(temp[0]), parseInt(temp[1])]);
            }
        }
        return {coords: coords, folds: folds};
    }
    
    function foldVertical(pos, map) {
        // easier than horizontal, since I can split the map
        let bottomHalf = map.slice(pos + 1);
        console.log(bottomHalf)
        let topHalf = map.slice(0, pos);
        console.log(topHalf)
        bottomHalf.reverse();
        for (let y = 0; y < topHalf.length; y++) {
            for (let x = 0; x < topHalf[0].length; x++) {
                // now we have an x/y that can use in both arrays?
                // if the bottomhalf value is #, then it overwrites, otherwise it equals itself
                topHalf[y][x] = bottomHalf[y][x] === '#' ? bottomHalf[y][x] : topHalf[y][x];
            }
        }
        return topHalf;
    }

    function foldHorizontal(pos, map) {
        // need to loop through each line of the map
        // and then for for each line, split, reverse, and combine them
        let newMap = [];
        for (let line of map) {
            let leftHalf = line.slice(pos + 1);
            let rightHalf = line.slice(0, pos);
            rightHalf.reverse();
            for (let x = 0; x < leftHalf.length; x++) {
                leftHalf[x] = rightHalf[x] === '#' ? rightHalf[x] : leftHalf[x];
            }
            newMap.push(leftHalf);
        }
        return newMap;
    }
}