const button = document.getElementById('button');
const displayPassword = document.getElementById('displayPassword');
const lowerCaseLetters = [...Array(26)].map((_, i) => String.fromCharCode(i + 97));
const upperCaseLetters = lowerCaseLetters.map(letter => letter.toUpperCase());
const symbolsNumbers = [...Array(31)].map((_, i) => String.fromCharCode( i + 33));
const numbers = symbolsNumbers.filter(filterOutNonDigits);
console.log(numbers)



button.addEventListener("click", generatePassword);

function generatePassword() {
    console.log("josué");
}


function filterOutNonDigits(val) {
    return Number(val)
}