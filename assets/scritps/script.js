function checkNumbers() {
    const inputRaw = document.getElementById("user_input").value;
    const resultMsg = document.getElementById("result_msg");

    resultMsg.classList.add("d-none");
    resultMsg.classList.remove("alert-danger", "alert-success");
    
    if (inputRaw.trim().length === 0) {
        showError("Please enter a number");
        return;
    }
    let input = inputRaw.trim();

    let hasLetter = false;
    let hasSpecial = false;
   
    for (let ch of input) {      
        const code = ch.charCodeAt(0);

        if ((code >= 65 && code <= 90) || (code >= 97 && code <= 122)) {
            hasLetter = true;
        }
        else if (
            !(code >= 48 && code <= 57) &&
            ch !== "," && ch !== "." &&
            ch !== "+" && ch !== "-" &&
            ch !== " "
        ) {
            hasSpecial = true;
        }
    }

    if (hasSpecial) {
        showError("Special Character(s) not allowed");
        return;
    }

    if (hasLetter) {
        showError("letter(s) not allowed");
        return;
    }
    
    if (input.startsWith(",") || input.endsWith(",")) {
        showError("Special Character(s) not allowed");
        return;
    }
    let normalized = "";
    let prevComma = false;

    for (let ch of input) {
        if (ch === ",") {
            if (!prevComma) {
                normalized += ",";
                prevComma = true;
            }
        } else {
            normalized += ch;
            prevComma = false;
        }
    }

    
    normalized = normalized.replace(/\s+/g, "");

    const parts = normalized.split(",");

    
    if (parts.length !== 2) {
        showError("Enter only two numbers");
        return;
    }

    const a = parts[0];
    const b = parts[1];

    if (!isValidNumber(a) || !isValidNumber(b)) {
        showError("Invalid number(s)");
        return;
    }


    const num1 = Number(a);
    const num2 = Number(b);

    if (num1 === num2) {
        showError("both numbers are same");
        return;
    }

    const largest = num1 > num2 ? num1 : num2;

    resultMsg.innerText = `${largest} is larger`;
    resultMsg.classList.remove("d-none");
    resultMsg.classList.add("alert-success");
}

function isValidNumber(value) {
    let dotCount = 0;
    let signCount = 0;
    let hasDigit = false;

    for (let i = 0; i < value.length; i++) {
        const ch = value[i];

        if (ch >= "0" && ch <= "9") {
            hasDigit = true;
            continue;
        }

        if (ch === ".") {
            dotCount++;
            if (dotCount > 1) return false;
            continue;
        }

        if (ch === "+" || ch === "-") {
            if (i !== 0) return false;
            signCount++;
            if (signCount > 1) return false;
            continue;
        }

        return false;
    }

    return hasDigit;
}

function showError(message) {
    const resultMsg = document.getElementById("result_msg");
    resultMsg.innerText = message;
    resultMsg.classList.remove("d-none");
    resultMsg.classList.add("alert-danger");
}

function resetForm() {
    document.getElementById("user_input").value = "";
    document.getElementById("result_msg").classList.add("d-none");
}
