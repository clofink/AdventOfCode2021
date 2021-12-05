fetch('/Day1Input.txt').then(response => response.text()).then(
    function(result) {
        console.log("Day 1 Part 1:", solve(result.split('\n')));

        function solve(data) {
            var previousValue;
            var increaseCount = 0;
            
            for (let value of data) {
                if (previousValue !== undefined) {
                    if ((value - previousValue) > 0) {
                        increaseCount++
                    }
                }
                previousValue = value;
            }
            return (increaseCount);
        }
    }
)