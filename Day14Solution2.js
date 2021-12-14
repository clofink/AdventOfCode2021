function day14Solution2(data) {
    data = parseInput(data);
    // instead of the whole string, track counts of pairs of letters
    // then loop through each pair, and add the two new resulting pairs when applying the rules to a new count
    let numSteps = 40;
    let currentPairCounts = data.start;
    let insertionRules = data.replacements;
    for (let i = 0; i < numSteps; i ++) {
        let newPairCount = {};
        for (let letterPair of Object.keys(currentPairCounts)) {
            if (insertionRules[letterPair]) {
                // first need to break the pair into the two new pairs
                let firstPair = letterPair[0] + insertionRules[letterPair];
                let secondPair = insertionRules[letterPair] + letterPair[1];
                if (newPairCount[firstPair]) {
                    newPairCount[firstPair] += currentPairCounts[letterPair];
                }
                else {
                    newPairCount[firstPair] = currentPairCounts[letterPair];
                }
                if (newPairCount[secondPair]) {
                    newPairCount[secondPair] += currentPairCounts[letterPair];
                }
                else {
                    newPairCount[secondPair] = currentPairCounts[letterPair];
                }
            }
        }
        currentPairCounts = newPairCount;
    }

    let letterCounts = {}
    for (let letterPair of Object.keys(currentPairCounts)) {
        if (letterCounts[letterPair[0]]) {
            letterCounts[letterPair[0]] += currentPairCounts[letterPair];
        }
        else {
            letterCounts[letterPair[0]] = currentPairCounts[letterPair];
        }
        if (letterCounts[letterPair[1]]) {
            letterCounts[letterPair[1]] += currentPairCounts[letterPair];
        }
        else {
            letterCounts[letterPair[1]] = currentPairCounts[letterPair];
        }
    }
    // I'm double counting some letters, this lets me account for that :) it's a hack for sure
    let sortedLetters = Object.keys(letterCounts).sort(function(a,b) {
        return letterCounts[a] - letterCounts[b];
    })
    return Math.ceil(letterCounts[sortedLetters[sortedLetters.length-1]] / 2) - Math.ceil(letterCounts[sortedLetters[0]] / 2);

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
                let stringPairs = {};
                for (let i = 0; i < (temp[0].length - 1); i++) {
                    let chars = temp[0][i] + temp[0][i +1];
                    if (stringPairs[chars]) {
                        stringPairs[chars]++;
                    }
                    else {
                        stringPairs[chars] = 1;
                    }
                }
                result.start = stringPairs;
            }
            else {
                result.replacements[temp[0]] = temp[1];
            }
        }
        return result;
    }
}