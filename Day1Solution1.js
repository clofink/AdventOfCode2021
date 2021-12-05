function day1Solution1(data) {
    // just logging the result to the console
    console.log("Day 1 Part 1:", solve(data.split('\n')));

    // takes the data (already broken up by line)
    function solve(data) {
        var previousValue;
        var increaseCount = 0;
        
        for (let value of data) {
            // previousValue will be undefined until I set a value for it
            if (previousValue !== undefined) {
                if ((value - previousValue) > 0) {
                    increaseCount++
                }
            }
            // always set the previous value to the current value after comparing
            previousValue = value;
        }
        return (increaseCount);
    }
}