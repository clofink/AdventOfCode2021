function day6Solution1(result) {
    return solve(result);

    function solve(data) {
        data = data.split(',');
        let newData = [];
        for (let item of data) {
            newData.push(parseInt(item));
        }
        
        let numberOfDays = 80;
        for (let i = 0; i < numberOfDays; i++) {
            let copy = [...newData];
            for (let f = 0; f < copy.length; f++) {
                if (copy[f] > 0) {
                    newData[f]--;
                }
                else if (copy[f] === 0) {
                    newData.push(8);
                    newData[f] = 6;
                }
            }
        }
        return newData.length;
    }
}