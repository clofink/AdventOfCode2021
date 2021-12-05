fetch('/Day1Input.txt').then(response => response.text()).then(
    function(result) {
        console.log("Day 1 Part 2:", solve(result.split('\n')));

        function solve(data) {
            var previousValue;
            var increaseCount = 0;
            
            for (let i = 0; i < (data.length - 2); i++) {
                let currentValue = parseInt(data[i]) + parseInt(data[i+1]) + parseInt(data[i+2]);
                if (previousValue !== undefined) {
                    if ((currentValue - previousValue) > 0) {
                        increaseCount++
                    }
                }
                previousValue = currentValue;
        
            }
            return (increaseCount);
        }
    }
)