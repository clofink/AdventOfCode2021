fetch('/Day2Input.txt').then(response => response.text()).then(
    function(result) {
        console.log("Day 2 Part 1:", solve(result.split('\n')));

        function solve(data) {
            var horizontalPos = 0;
            var depth = 0;
            
            for (let value of data) {
                instruction = value.split(' ');
                switch (instruction[0]) {
                    case 'forward':
                        horizontalPos += parseInt(instruction[1]);
                        break;
                    case 'up':
                        depth -= parseInt(instruction[1]);
                        break;
                    case 'down':
                        depth += parseInt(instruction[1]);
                        break;
                    default:
                        console.assert('unreachable');
                        break;
                }
            }
            return (horizontalPos * depth);
        }
    }
)