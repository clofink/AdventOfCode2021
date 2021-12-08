function day8Solution1(data) {
    data = data.split('\n');
    let count = 0;
    for (let line of data) {
        let digits = line.split(' | ')[1].split(' ');
        for (let digit of digits) {
            if([2, 3, 4, 7].indexOf(digit.length) > -1) {
                count++;
            }
        }
    }
    return count;
}