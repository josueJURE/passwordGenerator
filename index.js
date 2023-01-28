const button = document.getElementById('button');
const displayPassword = document.getElementById('displayPassword');
const lowerCaseLetters = [...Array(26)].map((_, i) => String.fromCharCode(i + 97));
const upperCaseLetters = lowerCaseLetters.map(letter => letter.toUpperCase());
const symbolsNumbers = [...Array(31)].map((_, i) => String.fromCharCode( i + 33));
const numbers = symbolsNumbers.filter(filterOutNonDigits); // digit zero is missing
const symbols = symbolsNumbers.filter(filterOutDigits); // digit zero not filtered out
console.log(symbols)




button.addEventListener("click", generatePassword);


function generatePassword() {
    let length = prompt("enter password length");
    passwordLength(length); 
 
}


function filterOutNonDigits(val) {
    return Number(val)
}

function filterOutDigits(val) {
    return !Number(val)
}


function passwordLength(dummyLength) {
    if(dummyLength < 10) {
        alert("password must be at least 10 characters long");
        return
    }
}