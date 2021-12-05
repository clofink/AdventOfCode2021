function day1Solution2(data) {
    // just logging the result to the console
    console.log("Day 1 Part 2:", solve(data.split('\n')));

    // takes the data (already broken up by line)
    function solve(data) {
        var previousValue;
        var increaseCount = 0;
        
        // using a standard for loop so I have the index
        // since the window is 3, I just stop the loop at the point where only the last window will fit
        for (let i = 0; i < (data.length - 2); i++) {
            // the values are strings, so need to convert them with parseInt
            let currentValue = parseInt(data[i]) + parseInt(data[i+1]) + parseInt(data[i+2]);
            if (previousValue !== undefined) {
                if ((currentValue - previousValue) > 0) {
                    increaseCount++
                }
            }
            // always set the previous value to the current value after comparing
            previousValue = currentValue;
    
        }
        return (increaseCount);
    }
}