function checkNumbers() {
    const input = document.getElementById("user-input").value.trim();
    const resultMsg = document.getElementById("result-msg");

    resultMsg.classList.add("d-none");
    resultMsg.classList.remove("alert-danger", "alert-success");

    
    if (input.length === 0) {
        showError("Please enter a number");
        return;
    }

    let hasLetter = false;
    let hasSpecial = false;

    for (let ch of input) {
        let code = ch.charCodeAt(0);

        
        if ((code >= 65 && code <= 90) || (code >= 97 && code <= 122)) {
            hasLetter = true;
        }
        
        else if (
            !(code >= 48 && code <= 57) &&
            ch !== "," &&
            ch !== "." &&
            ch !== "-" &&
            ch !== "+" 
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

    const parts = input.split(",");

    
    if (parts.length > 2) {
        showError("Enter only two numbers");
        return;
    }

 
    if (parts.length < 2 || parts[0].trim() === "" || parts[1].trim() === "") {
        showError("Please enter two numbers");
        return;
    }

  
    const num1 = Number(parts[0]);
    const num2 = Number(parts[1]);

    
    if (!isValidNumber(parts[0]) || !isValidNumber(parts[1])) {
        showError("Invalid number(s)");
        return;
    }

    
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
    let minusCount = 0;
    let plusCount = 0;

    for (let i = 0; i < value.length; i++) {
        let ch = value[i];

        if (ch === ".") dotCount++;
        if (ch === "-") minusCount++;
        if (ch === "+") plusCount++;

        
        if (ch === "-" && i !== 0) return false;
    }

    return !(dotCount > 1 || minusCount > 1 || value === "-" || value === "." || value === "+");
}

function showError(message) {
    const resultMsg = document.getElementById("result-msg");
    resultMsg.innerText = message;
    resultMsg.classList.remove("d-none");
    resultMsg.classList.add("alert-danger");
}

function resetForm() {
    document.getElementById("user-input").value = "";
    document.getElementById("result-msg").classList.add("d-none");
}
