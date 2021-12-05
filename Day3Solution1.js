fetch('/Day3Input.txt').then(response => response.text()).then(
    function(result) {
        console.log("Day 3 Part 1:", solve(result.split('\n')));

        function solve(data) {
            onesCount = [];
            zerosCount = [];
            // just initialize the arrays to be filled with 0s
            for (let i = 0; i < data[0].length; i++) {
                onesCount[i] = 0;
                zerosCount[i] = 0;
            }
            for (let value of data) {
                // 10101
                for (let i = 0; i < value.length; i++) {
                    let character = value[i];
                    if (character === '1') {
                        onesCount[i]++;
                    }
                    if (character === '0') {
                        zerosCount[i]++;
                    }
                }
            }
            gamma = "";
            epsilon = "";
            for (let i = 0; i < onesCount.length; i++) {
                if (onesCount[i] < zerosCount[i]) {
                    gamma += "0";
                    epsilon += "1";
                }
                else {
                    gamma += "1";
                    epsilon += "0";
                }
            }
            return (parseInt(gamma, 2) * parseInt(epsilon, 2));
        }
    }
)