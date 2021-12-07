function day7Solution2(data) {
    data = data.split(',');
    let totals = {};
    for (let i = 0; i < 1000; i++) {
        let totalFuel = 0;
        for (let horizontalPos of data) {
            let distance = Math.abs(parseInt(horizontalPos) - i);
            let fuelUsed = (distance + 1) * (distance / 2);
            totalFuel += fuelUsed;
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