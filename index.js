const button = document.getElementById('button');
const displayPassword = document.getElementById('displayPassword');
const lowerCaseLetters = [...Array(26)].map((_, i) => String.fromCharCode(i + 97));
console.log(lowerCaseLetters)



button.addEventListener("click", generatePassword);

function generatePassword() {
    console.log("josué");
}