import { useState, useEffect } from "react";

const NumbersForm = (props) => {
    const [allNums, setAllNums] = useState([]);
    const [startingValue, setStartingValue] = useState(0);
    const [endingValue, setEndingValue] = useState(0);

    const handleOnStartingValueChange = (e) => {
        console.log(e.target.value * 1);
        setStartingValue(e.target.value * 1);
    }
    const handleOnEndingValueChange = (e) => {
        console.log(e.target.value * 1);
        setEndingValue(e.target.value * 1);
    }

    //digit selector
    const digitToWord = (dig, pos) => {
        let _dig = dig + "";

        //eleventies
        if (_dig.length > 1) {
            switch (_dig) {
                case "10": {
                    return "ten";
                }
                case "11": {
                    return "eleven";
                }
                case "12": {
                    return "twelve";
                }
                case "13": {
                    return "thirteen";
                }
                case "14": {
                    return "fourteen";
                }
                case "15": {
                    return "fifteen";
                }
                case "16": {
                    return "sixteen"
                }
                case "17": {
                    return "seventeen"
                }
                case "18": {
                    return "eighteen"
                }
                case "19": {
                    return "nineteen"
                }
                default: {
                    console.log("I shouldn't be getting defaults");
                }
            }
            //every other number
        } else {
            switch (_dig) {
                case "1": {
                    return "one";
                }
                case "2": {
                    if (pos === "tens") {
                        return "twen";
                    } else {
                        return "two";
                    }
                }
                case "3": {
                    if (pos === "tens") {
                        return "thir";
                    } else {
                        return "three";
                    }
                }
                case "4": {
                    if (pos === "tens") {
                        return "for";
                    } else {
                        return "four";
                    }
                }
                case "5": {
                    if (pos === "tens") {
                        return "fif";
                    } else {
                        return "five";
                    }
                }
                case "6": {
                    return "six"
                }
                case "7": {
                    return "seven"
                }
                case "8": {
                    if (pos === "tens") {
                        return "eigh";
                    } else {
                        return "eight";
                    }
                }
                case "9": {
                    return "nine"
                }
                case "0": {
                    return "zero"
                }
                default: {
                    console.log("I shouldn't be getting defaults");
                }
            }
        }
    }

    // returns the number in word form
    const oneNumToText = (num) => {
        const isNegative = num < 0 ? true : false;
        num = Math.abs(num);
        // const numString = num + "";
        // const numDigitCount = numString.length;
        // const commaBlockCount = Math.ceil(numDigitCount / 3);
        //
        // does all of the above lol
        const commaBlockCount = Math.ceil((num + "").length / 3);
        let word = "";

        const commaBlocks = [];
        for (let i = 0; i < commaBlockCount; i++) {
            let oneCommaBlock = [];

            //could be condensed into another for loop
            oneCommaBlock.push(num % 10);
            num = Math.floor(num / 10);
            oneCommaBlock.push(num % 10);
            num = Math.floor(num / 10);
            oneCommaBlock.push(num % 10);
            num = Math.floor(num / 10);

            commaBlocks.push(oneCommaBlock);
        }

        //appends negative if number is negative
        word += isNegative ? "negative " : "";

        //output one comma block at a time
        for (let i = commaBlocks.length - 1; i >= 0; i--) {
            for (let j = commaBlocks[i].length - 1; j >= 0; j--) {
                //individual digits inside one comma block
                console.log(commaBlocks[i][j]);
                //hundreds place
                if (j === 2) {
                    if (commaBlocks[i][j] !== 0) {
                        word += digitToWord(commaBlocks[i][j], "hundreds")
                        word += " hundred ";
                    }

                    //tens place
                } else if (j === 1) {
                    //checks if in eleventies
                    //if true, don't print tens place
                    //else add tens place normally
                    if (commaBlocks[i][j] === 1) {
                        word += digitToWord(commaBlocks[i][j] + "" + commaBlocks[i][j - 1], "tens")
                    } else if (commaBlocks[i][j] !== 0) {
                        word += digitToWord(commaBlocks[i][j], "tens")
                        word += "ty";
                    }

                    //ones place
                } else if (j === 0) {
                    //checks if in eleventies
                    //if true, print eleventies
                    //else add ones place normally
                    if (commaBlocks[i][j] !== 0 && commaBlocks[i][j + 1] !== 1) {
                        word += commaBlocks[i][1] === 0 ? "" : "-";
                        word += digitToWord(commaBlocks[i][j], "ones");
                    } else if (commaBlocks.length === 1 && commaBlocks[i][1] === 0 && commaBlocks[i][2] === 0) {
                        word += digitToWord(commaBlocks[i][j], "ones");
                    }
                    word += " ";
                }
            }
            //may need to separate into function to allow for *larger* numbers
            if (i === 1) {
                word += "thousand ";
            } else if (i === 2) {
                word += "million ";
            } else if (i === 3) {
                word += "billion ";
            }
            // } else if (i === 4) {
            //     word += "trillion ";
            // } else if (i === 5) {
            //     word += "quadrillion ";
            // }
        }

        console.log(word)
        return word;
    }

    const allNumsToText = (arr) => {
        for (let i = 0; i < arr.length; i++) {
            arr[i] = oneNumToText(arr[i]);
        }
        return arr;
    }

    const handleSubmitToText = (e) => {
        e.preventDefault();

        const newNums = [];

        if (startingValue * 1 > endingValue * 1) {
            console.log("decreasing");
            console.log(`from ${startingValue} to ${endingValue}`);

            for (let i = startingValue; i >= endingValue; i--) {
                newNums.push(i);
            }
        } else {
            console.log("increasing");
            console.log(`from ${startingValue} to ${endingValue}`);

            for (let i = startingValue * 1; i <= endingValue * 1; i++) {
                newNums.push(i);
            }
        }
        const updatedNums = allNumsToText(newNums);
        console.log(updatedNums);
        setAllNums(updatedNums);
    }

    return (
        <div className="d-flex justify-content-center">
            <form className="w-25" onSubmit={(e) => { handleSubmitToText(e) }}>
                <div>
                    <label className="form-label">Starting value:</label>
                    <input className="form-control" type="number" onChange={(e) => { handleOnStartingValueChange(e) }}></input>
                </div>
                <div>
                    <label className="form-label">Ending value:</label>
                    <input className="form-control" type="number" onChange={(e) => { handleOnEndingValueChange(e) }}></input>
                </div>
                <button type="submit">To Text</button>
            </form>
            <div className="w-50">
                <h2>Here lies all my RAM</h2>
                {
                    allNums.map((num, i) => {
                        return (
                            <div>
                                {num}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default NumbersForm;