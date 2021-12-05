function day3Solution2(result) {
    console.log("Day 3 Part 2:", solve(result.split('\n')));

    function solve(data) {
        let startDataLength = data.length;
        let oxygenData = [...data];
        let genRating;
        let scrubRating;

        for (let i = 0; i < startDataLength; i++) {
            if (oxygenData.length === 1) {
                break;
            }
            oxygenData = filterByValueInPos(mostCommonInPos(i, oxygenData), i, oxygenData);
            genRating = parseInt(oxygenData[0], 2);
        }
        let scrubberData = [...data];
        for (let i = 0; i < startDataLength; i++) {
            if (scrubberData.length === 1) {
                break;
            }
            scrubberData = filterByValueInPos(!mostCommonInPos(i, scrubberData), i, scrubberData);
            scrubRating = parseInt(scrubberData[0], 2);
        }
        // console.log(genRating, scrubRating);
        return (genRating * scrubRating);
    }

    function mostCommonInPos(pos, list) {
        let zeros = 0;
        let ones = 0;
        for (let item of list) {
            if (item[pos] === "1") {
                ones += 1;
            }
            else {
                zeros += 1;
            }
        }
        return zeros > ones ? 0 : 1;
    }

    function filterByValueInPos(value, pos, array) {
        let arrayCopy = [...array];
        for (i = array.length - 1; i >= 0; i--) {
            if (array[i][pos] != value) {
                arrayCopy.splice(i, 1);
            }
        }
        return arrayCopy;
    }
}