function day7Solution1(data) {
    data = data.split(',');
    let totals = {};
    for (let i = 0; i < 1000; i++) {
        let totalFuel = 0;
        for (let horizontalPos of data) {
            let distance = Math.abs(parseInt(horizontalPos) - i);
            totalFuel += distance;
        }
        totals[i] = totalFuel;
    }
    let resultKeys = Object.keys(totals);
    resultKeys.sort(function(a,b) {
        if (totals[a] > totals[b]) {
            return 1;
        }
        if (totals[a] < totals[b]) {
            return -1;
        }
        return 0
    })
    return(totals[resultKeys[0]]);
}