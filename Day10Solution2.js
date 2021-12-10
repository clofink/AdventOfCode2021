function day10Solution2(data) {
    data = data.split('\n');

    let chunkOpeners = ['<', '(', '{', '['];
    let chunkClosers = ['>', ')', '}', ']'];
    let openToClose = {
        '<': '>',
        '(': ')',
        '{': '}',
        '[': ']'
    }
    let points = {
        ')': 1,
        ']': 2,
        '}': 3,
        '>': 4
    }

    let scores = [];
    for (let line of data) {
        let openChunks = [];
        try{
            getChunk(line, openChunks);
            let score = 0;
            // need to loop through this lis in reverse order and get the closing value
            for (let i = (openChunks.length - 1); i >= 0; i--) {
                let closingChar = openToClose[openChunks[i]];
                score *= 5;
                score += points[closingChar];
            }
            scores.push(score);
        }
        catch(error) {}
    }
    scores.sort(function(a,b) {
        if (a > b) {
            return -1;
        }
        if (a < b) {
            return 1;
        }
        return 0;
    })
    return(scores[Math.floor(scores.length / 2)]);
    // track for each line, the open chunks
    // look for the closing character and close the chunk
    // if a closing character appears that doesn't have an associated opening, it is invalid
    function getChunk(data, openChunks) {
        if (data.length === 0) {
            return;
        }
        // if the character starts a new chunk, push that character into the list of open chunks
        if (chunkOpeners.indexOf(data[0]) > -1) {
            openChunks.push(data[0]);
            data = data.substring(1);
            // make sure that there are still characters
            if (data.length > 0) {
                getChunk(data, openChunks);
            }
        }
        // if the character closes a chunk, make sure that it is closing the last chunk in the list of open chunks and matches
        else if (chunkClosers.indexOf(data[0]) > -1) {
            // if it not a match for the opening to closing, show an error
            if (openToClose[openChunks[openChunks.length - 1]] != data[0]) {
                // console.log(`expected ${openToClose[openChunks[openChunks.length - 1]]} but found ${data[0]}`);
                throw data[0];
            }
            else {
                // remove the last item from open chunks since it has been closed
                openChunks.pop();
                data = data.substring(1);
                if (data.length > 0) {
                    getChunk(data, openChunks);
                }
            }
        }
    }
}