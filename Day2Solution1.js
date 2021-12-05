function day2Solution1(data) {
    return solve(data.split('\n'));

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
                    // no way this should be reachable, since it's not a valid input
                    console.assert('unreachable');
                    break;
            }
        }
        return (horizontalPos * depth);
    }
}