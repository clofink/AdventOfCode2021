// load the input file and run the solve function on it
fetch('/Day1Input.txt').then(response => response.text()).then(
    function(result) {
        // just logging the result to the console
        console.log("Day 1 Part 1:", solve(result.split('\n')));

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
)