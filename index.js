const button = document.getElementById('button');
const displayPassword = document.getElementById('displayPassword');
const passwordStrength = document.getElementById('passwordStrength');
console.log(passwordStrength)
const lowerCaseLetters = [...Array(26)].map((_, i) => String.fromCharCode(i + 97));
const upperCaseLetters = lowerCaseLetters.map(letter => letter.toUpperCase());
const symbolsNumbers = [...Array(31)].map((_, i) => String.fromCharCode( i + 33));
const numbers = symbolsNumbers.filter(filterOutNonDigits); // digit zero is missing
const symbols = symbolsNumbers.filter(filterOutDigits); // digit zero not filtered out
let charactersPickedByUsers = [];
let arrayPickedByUser = [];
let howManyTimesUserClickedConfirm = [];
let password = "";





button.addEventListener("click", generatePassword);


function generatePassword() {
    let length = prompt("enter password length");
    passwordLength(length); 
    if(confirm("do you want at least one lower case character")) {
        processesUserChoices(lowerCaseLetters, charactersPickedByUsers, arrayPickedByUser, howManyTimesUserClickedConfirm);
    }
    if(confirm("do you want at least one upper case character")) {
        processesUserChoices(upperCaseLetters, charactersPickedByUsers, arrayPickedByUser, howManyTimesUserClickedConfirm);
    }
    if(confirm("do you want at least one number")) {
        processesUserChoices(numbers, charactersPickedByUsers, arrayPickedByUser, howManyTimesUserClickedConfirm);
    }
    if(confirm("do you want at least one symbol")) {
        processesUserChoices(symbols, charactersPickedByUsers, arrayPickedByUser, howManyTimesUserClickedConfirm);
    }
    let password = charactersPickedByUsers.join("");
    console.log(password)
    // removing duplicates 
    arrayPickedByUser = arrayPickedByUser.filter(function(val) {
        return charactersPickedByUsers.indexOf(val) == -1;
    })

    let secondPartPassword = restOfPassword(length-password.length, arrayPickedByUser);
    password += secondPartPassword;
    let shuffledPassword = shuffleArray(Array.from(password));
    // let finalPassword = shuffledPassword.toString();


    displayPassword.innerHTML = shuffledPassword.join("")

    console.log(howManyTimesUserClickedConfirm)



}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array
}

function restOfPassword(dummyLength, arrayPickedByUser) {
    let result = "";
    for(var i = 0; i < dummyLength; i++) {
        let randomIndex = Math.floor(Math.random() * arrayPickedByUser.length);
        result += arrayPickedByUser[randomIndex];
    }
    return result

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

function processesUserChoices(arrayUsed, charactersPickedByUsers, arrayPickedByUser, howManyTimesUserClickedConfirm) {
    const randomIndex = Math.floor(Math.random() * arrayUsed.length);
    charactersPickedByUsers.push(arrayUsed[randomIndex]);
    arrayPickedByUser.push(...arrayUsed)
    howManyTimesUserClickedConfirm.push(true)

}