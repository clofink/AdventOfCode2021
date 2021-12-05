function day2Solution2(data) {
    console.log("Day 2 Part 2:", solve(data.split('\n')));

    function solve(data) {
        var horizontalPos = 0;
        var depth = 0;
        var aim = 0;
        
        for (let value of data) {
            instruction = value.split(' ');
            switch (instruction[0]) {
                case 'forward':
                    horizontalPos += parseInt(instruction[1]);
                    depth += (aim * parseInt(instruction[1]));
                    break;
                case 'up':
                    aim -= parseInt(instruction[1]);
                    break;
                case 'down':
                    aim += parseInt(instruction[1]);
                    break;
                default:
                    console.assert('unreachable');
                    break;
            }
        }
        return (horizontalPos * depth);
    }
}