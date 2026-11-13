
const display = document.getElementById("display");

if (!(display instanceof HTMLInputElement)) {
    throw new Error("Calculator display not found");
}

// Add value to display
function append(value) {
    if (display.value === "Error") {
        display.value = "";
    }

    display.value += value;
}

// Clear display
function clearDisplay() {
    display.value = "";
}

// Delete last character
function deleteLast() {
    display.value = display.value.slice(0, -1);
}

// Calculate result
function calculate() {
    try {
        let expression = display.value;

        if (expression.trim() === "") return;

        expression = expression.replace(
            /(\d+\.?\d*)%/g,
            "($1/100)"
        );

        if (!/^[0-9+\-*/().\s]+$/.test(expression)) {
            throw new Error("Invalid expression");
        }

        const result = Function(
            '"use strict"; return (' + expression + ')'
        )();

        if (!Number.isFinite(result)) {
            throw new Error("Invalid calculation");
        }

        display.value = String(
            Number(result.toPrecision(12))
        );

    } catch {
        display.value = "Error";
    }
}

// Handle calculator button clicks
document.querySelectorAll(".buttons button").forEach(button => {
    button.addEventListener("click", () => {
        const action = button.dataset.action;
        const value = button.dataset.value;

        if (action === "clear") {
            clearDisplay();
        } else if (action === "delete") {
            deleteLast();
        } else if (action === "calculate") {
            calculate();
        } else if (value !== undefined) {
            append(value);
        }
    });
});
