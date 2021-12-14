function day14Solution1(data) {
    // loop through and identify where the additions should go, note the index
    // loop through in reverse and actually add them in
    // sort by index
    // this should return a new string with all the correct replacements?
    data = parseInput(data);

    let currentString = data.start;
    let insertionRules = data.replacements
    let numSteps = 10;
    for (let i = 0; i < numSteps; i ++) {
        let insertions = getInsertionsAtIndexes(currentString, insertionRules);
        currentString = insertAtIndexes(insertions, currentString);
    }
    let letterCounts = countLetters(currentString)
    let sortedLetters = Object.keys(letterCounts).sort(function(a,b) {
        return letterCounts[a] - letterCounts[b];
    })
    return letterCounts[sortedLetters[sortedLetters.length-1]] - letterCounts[sortedLetters[0]];
    function getInsertionsAtIndexes(string, insertions) {
        let indexesToInsert = {};
        for (let i = 0; i < string.length - 1; i++) {
            let chars = string[i] + string[i + 1];
            if (insertions[chars]) {
                indexesToInsert[i + 1] = insertions[chars];
            }
        }
        return indexesToInsert;
    }

    function countLetters(string) {
        let letters = {};
        for (let letter of string) {
            if (letters[letter]) {
                letters[letter]++;
            }
            else {
                letters[letter] = 1;
            }
        }
        return letters;
    }

    function insertAtIndexes(indexedInsertions, string) {
        for (let i = (string.length - 1); i >= 0; i--) {
            if (indexedInsertions[i]) {
                string = string.slice(0, i) + indexedInsertions[i] + string.slice(i);
            }
        }
        return string;
    }

    // when looping through the list, take two elements at once (loop until 1 less than the length)
    function parseInput(data) {
        data = data.split('\n');
        let result = {start: '', replacements: {}}
        for (let line of data) {
            if (line == '') {
                continue;
            }
            let temp = line.split(' -> ');
            if (temp.length === 1) {
                result.start = temp[0];
            }
            else {
                result.replacements[temp[0]] = temp[1];
            }
        }
        return result;
    }
}