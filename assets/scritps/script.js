function check_numbers() {
    const inputRaw = document.getElementById("user_input").value;
    const resultMsg = document.getElementById("result_msg");

    resultMsg.classList.add("d-none");
    resultMsg.classList.remove("alert-danger", "alert-success");

    let hasLetter = false;
    let hasSpecial = false;
    
    if (inputRaw.trim().length === 0) {
        show_error("Please enter a number");
        return;
    }
    let input = inputRaw.trim();
    
    let normalized = "";
    let prevComma = false;

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
        show_error("Special Character(s) not allowed");
        return;
    } else if (hasLetter) {
        show_error("letter(s) not allowed");
        return;
    } else if (input.startsWith(",") || input.endsWith(",")) {
        show_error("Special Character(s) not allowed");
        return;
    }


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

    
    parts = normalized.replace(/\s+/g, "").split(",");
   
    if (parts.length !== 2) {
        show_error("Enter only two numbers");
        return;
    } else if (!is_validNumber(parts[0]) || !is_validNumber(parts[1])) {
        show_error("Invalid number(s)");
        return;
    }


    const num1 = Number(parts[0]);
    const num2 = Number(parts[1]);

    if (num1 === num2) {
        show_error("both numbers are same");
        return;
    }

    const largest = num1 > num2 ? num1 : num2;

    resultMsg.innerText = `${largest} is larger`;
    resultMsg.classList.remove("d-none");
    resultMsg.classList.add("alert-success");
}

function is_validNumber(value) {
    let dotCount = 0;
    let signCount = 0;
    let hasDigit = false;

    for (let i = 0; i < value.length; i++) {
        const ch = value[i];

    if (ch >= "0" && ch <= "9") {
        hasDigit = true;
        continue;
    } else if (ch === ".") {
        dotCount++;
        if (dotCount > 1) return false;
        continue;
    } else if (ch === "+" || ch === "-") {
        if (i !== 0) return false;
        signCount++;
        if (signCount > 1) return false;
        continue;
    }

        return false;
    }

    return hasDigit;
}

function show_error(message) {
    const resultMsg = document.getElementById("result_msg");
    resultMsg.innerText = message;
    resultMsg.classList.remove("d-none");
    resultMsg.classList.add("alert-danger");
}

function reset_form() {
    document.getElementById("user_input").value = "";
    document.getElementById("result_msg").classList.add("d-none");
}
