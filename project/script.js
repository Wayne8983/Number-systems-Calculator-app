let history = [];

function convertFractionalBase(input, fromBase, toBase, precision = 5) {
    const [integerPart, fractionalPart] = input.split(".");

    // Convert the integer part from fromBase to decimal
    const decimalInteger = parseInt(integerPart, fromBase);
    if (isNaN(decimalInteger)) {
        return "Invalid input for the chosen base.";
    }
    
    // Convert the integer part to the target base
    let convertedInteger = decimalInteger.toString(toBase).toUpperCase();

    let convertedFraction = "";
    if (fractionalPart) {
        let fraction = 0;
        for (let i = 0; i < fractionalPart.length; i++) {
            fraction += parseInt(fractionalPart[i], fromBase) / Math.pow(fromBase, i + 1);
        }
        
        // Convert the decimal fraction to the target base
        for (let i = 0; i < precision; i++) {
            fraction *= toBase;
            const fractionDigit = Math.floor(fraction);
            convertedFraction += fractionDigit.toString(toBase).toUpperCase();
            fraction -= fractionDigit;
        }
    }

    return convertedFraction ? `${convertedInteger}.${convertedFraction}` : convertedInteger;
}

function convert() {
    const inputNumber = document.getElementById("inputNumber").value;
    const fromBase = parseInt(document.getElementById("fromBase").value);
    const toBase = parseInt(document.getElementById("toBase").value);
    const outputDiv = document.getElementById("output");

    const result = convertFractionalBase(inputNumber, fromBase, toBase);
    
    outputDiv.textContent = `Result: ${result}`;

    if (result !== "Invalid input for the chosen base.") {
        history.push(`${inputNumber} (Base ${fromBase}) ➔ ${result} (Base ${toBase})`);
        updateHistory();
    }
}

function clearInput() {
    document.getElementById("inputNumber").value = "";
    document.getElementById("output").textContent = "";
}

function toggleHistory() {
    const historyDiv = document.getElementById("history");
    historyDiv.style.display = historyDiv.style.display === "none" ? "block" : "none";
}

function updateHistory() {
    const historyContent = document.getElementById("historyContent");
    historyContent.innerHTML = history.map(entry => `<p>${entry}</p>`).join("");
}
