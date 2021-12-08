function day8Solution2(data) {
    data = data.split('\n');
    let sides = {top: '', bottom: '', middle: '', leftTop: '', leftBottom: '', rightTop:'', rightBottom: ''};
    let total = 0;
    for (let line of data) {
        let signals = line.split(' | ')[0].split(' ');
        let digits = line.split(' | ')[1].split(' ');
        let mapping = {};
        for (let digit of signals) {
            if (digit.length === 3) {
                mapping[7] = digit;
            }
            if (digit.length === 2) {
                mapping[1] = digit;
            }
            if (digit.length === 7) {
                mapping[8] = digit;
            }
            if (digit.length === 4) {
                mapping[4] = digit;
            }
        }
        for (let digit of signals) {
            if ((digit.length === 5) && containsAll(digit, mapping[7])) {
                mapping[3] = digit;
            }
        }
        let letters = 'abcdefg';
        for (let letter of letters) {
            // the letter that is in 7 but not 1 is the top
            if (containsLetter(mapping[7], letter) && !containsLetter(mapping[1], letter)) {
                sides.top = letter;
            }
        }
        for (let letter of letters) {
            // the letter that is in 3 but not 4 and not the top is the bottom
            if (containsLetter(mapping[3], letter) && !containsLetter(mapping[4], letter) && (sides.top != letter)) {
                sides.bottom = letter;
            }
        }
        for (let letter of letters) {
            // the letter that is 3 and 4 and not 1 is the middle
            if (containsLetter(mapping[3], letter) && containsLetter(mapping[4], letter) && !containsLetter(mapping[1], letter)) {
                sides.middle = letter;
            }
        }
        for (let digit of signals) {
            if (digit.length === 6 && digit != mapping[7] && digit != mapping[1] && !containsLetter(digit, sides.middle)) {
                // this has to be 0
                mapping[0] = digit;
            }
        }
        for (let letter of letters) {
            // the letter that is in 4 but not 1 and not the middle is leftTop
            if (containsLetter(mapping[4], letter) && !containsLetter(mapping[1], letter) && sides.middle != letter) {
                sides.leftTop = letter;
            }
        }
        for (let digit of signals) {
            // a five length digit with leftTop that is not 0 is 5
            if (digit.length === 5 && containsLetter(digit, sides.leftTop) && digit != mapping[0] && digit != mapping[3]) {
                mapping[5] = digit;
            }
        }
        for (let digit of signals) {
            if (digit.length != 5) {
                continue;
            }
            if (digit != mapping[5] && digit != mapping[3]) {
                mapping[2] = digit;
            }
        }
        for (let letter of letters) {
            // the letter in 5 that is not top, bottom, leftTop, or middle is rightBottom
            if (containsLetter(mapping[5], letter) && letter != sides.top && letter != sides.middle && letter != sides.bottom && letter != sides.leftTop) {
                sides.rightBottom = letter;
            }
        }
        for (let letter of letters) {
            // the letter that is in 1 and 2 that I do not know yet is rightTop
            if (containsLetter(mapping[1], letter) && containsLetter(mapping[2], letter)) {
                sides.rightTop = letter;
            }
        }
        for (let letter of letters) {
            // remaining one is leftBottom
            if (
                letter != sides.top &&
                letter != sides.bottom &&
                letter != sides.middle &&
                letter != sides.leftTop &&
                letter != sides.rightBottom &&
                letter != sides.rightTop
            ) {
                sides.leftBottom = letter;
            }
        }
        let number = '';
        for (let digit of digits) {
            number += determineNumber(digit, sides);
        }
        total += parseInt(number);
    }
    return total;

    function containsAll(string, letters) {
        for (let letter of letters) {
            if (string.indexOf(letter) < 0) {
                return false;
            }
        }
        return true;
    }

    function containsLetter(string, letter) {
        if (string.indexOf(letter) > -1) {
            return true;
        }
        return false;
    }

    function determineNumber(string, sides) {
        if (string.length === 7) {
            return '8';
        }
        if (string.length === 4) {
            return '4';
        }
        if (string.length === 3) {
            return '7';
        }
        if (string.length === 2) {
            return '1';
        }
        if (containsAll(string, [sides.top, sides.bottom, sides.leftBottom, sides.leftTop, sides.rightBottom, sides.rightTop])) {
            return '0';
        }
        if (containsAll(string, [sides.top, sides.bottom, sides.rightBottom, sides.middle, sides.leftTop, sides.leftBottom])) {
            return '6';
        }
        if (containsAll(string, [sides.top, sides.bottom, sides.rightBottom, sides.middle, sides.leftTop, sides.rightTop])) {
            return '9';
        }
        if (containsAll(string, [sides.top, sides.middle, sides.bottom, sides.rightTop, sides.leftBottom])) {
            return '2';
        }
        if (containsAll(string, [sides.top, sides.middle, sides.bottom, sides.leftTop, sides.rightBottom])) {
            return '5';
        }
        if (containsAll(string, [sides.top, sides.bottom, sides.middle, sides.rightBottom, sides.rightTop])) {
            return '3';
        }
    }
}

// digits with 5 length
// 2, 3, 5

// digits with 6 length
// 0, 6, 9