function day6Solution2(result) {
    return solve(result);

    function solve(data) {
        data = data.split(',');
        countOfEachTime = {'0': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0};
        for (let time of data) {
            countOfEachTime[time]++;
        }
        console.log(countOfEachTime);
        let numberOfDays = 256;
        for (let t = 0; t < numberOfDays; t++) {
            let temp = countOfEachTime['0'];
            countOfEachTime['0'] = countOfEachTime['1'];
            countOfEachTime['1'] = countOfEachTime['2'];
            countOfEachTime['2'] = countOfEachTime['3'];
            countOfEachTime['3'] = countOfEachTime['4'];
            countOfEachTime['4'] = countOfEachTime['5'];
            countOfEachTime['5'] = countOfEachTime['6'];
            countOfEachTime['6'] = countOfEachTime['7'] + temp;
            countOfEachTime['7'] = countOfEachTime['8'];
            countOfEachTime['8'] = temp;
        }
        let total = 0;
        for (let count in countOfEachTime) {
            total += countOfEachTime[count];
        }
        return total;
    }
}