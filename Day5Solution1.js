fetch('/Day5Input.txt').then(response => response.text()).then(
    function(result) {
        console.log("Day 5 Part 1:", solve(result.split('\n')));

        function solve(data) {
            let diagram = createDiagram(parseInput(data));
            return countSafePoints(diagram);
        }

        function parseInput(input) {
            let parsedInput = [];
            for (let row of input) {
                let line = {};
                row = row.split(' -> ');
                line.x1 = row[0].split(',')[0];
                line.y1 = row[0].split(',')[1];
                line.x2 = row[1].split(',')[0];
                line.y2 = row[1].split(',')[1];
                parsedInput.push(line);
            }
            return parsedInput;
        }

        function getLinePoints(x1, y1, x2, y2) {
            let point = [parseInt(x1), parseInt(y1)];
            let endPoint = [parseInt(x2), parseInt(y2)];
            let linePoints = [];
            linePoints.push([...point]);
            // might need to replace with a WHILE loop
            while(JSON.stringify(point) !== JSON.stringify(endPoint)) {
                if (point[0] > endPoint[0]) {
                    point[0] = point[0] - 1;
                }
                else if (point[0] < endPoint[0]) {
                    point[0] = (point[0] + 1);
                }
                if (point[1] > endPoint[1]) {
                    point[1] = (point[1] - 1);
                }
                else if (point[1] < endPoint[1]) {
                    point[1] = (point[1] + 1);
                }
                linePoints.push([...point]);
            }
            return linePoints;
        }

        function createDiagram(inputs) {
            let diagram = [];
            for (let r = 0; r < 1000; r++) {
                let row = [];
                for (let c = 0; c < 1000; c++) {
                    row.push(0);
                }
                diagram.push(row);
            }
            for (let linePoints of inputs) {
                if ((linePoints.x1 == linePoints.x2) || (linePoints.y1 == linePoints.y2)) {
                    let points = getLinePoints(linePoints.x1, linePoints.y1, linePoints.x2, linePoints.y2);
                    for (let point of points) {
                        diagram[point[1]][point[0]]++;
                    }
                }
            }
            return diagram;
        }

        function countSafePoints(diagram) {
            let safePoints = 0;
            for (let row of diagram) {
                for (let column of row) {
                    if (column > 1) {
                        safePoints++;
                    }
                }
            }
            return safePoints;
        }
    }
)