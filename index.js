const button = document.getElementById('button');
const displayPassword = document.getElementById('displayPassword');
const passwordStrength = document.getElementById('passwordStrength');
const lowerCaseLetters = [...Array(26)].map((_, i) => String.fromCharCode(i + 97));
const upperCaseLetters = lowerCaseLetters.map(letter => letter.toUpperCase());
const symbolsNumbers = [...Array(31)].map((_, i) => String.fromCharCode( i + 33));
const numbers = Array.from(Array(10).keys());
const symbols = [...Array(15)].map((_, i) => String.fromCharCode(i + 33));

// const numbers = symbolsNumbers.filter(filterOutNonDigits); 
// const symbols = symbolsNumbers.filter(filterOutDigits); 
let charactersPickedByUsers = [];
let arrayPickedByUser = [];
let lengthPassword;
let gaugeWidth = 800;
let firstPartpassword = "";





button.addEventListener("click", generatePassword);


function generatePassword() {
    let length = prompt("enter password length");
    passwordLength(length); 
    if(confirm("do you want at least one lower case character")) {
        processesUserChoices(lowerCaseLetters, charactersPickedByUsers, arrayPickedByUser);
        updateProgressBar(passwordStrength, 25)
    }
    if(confirm("do you want at least one upper case character")) {
        processesUserChoices(upperCaseLetters, charactersPickedByUsers, arrayPickedByUser);
        updateProgressBar(passwordStrength, 25)
    }
    if(confirm("do you want at least one number")) {
        processesUserChoices(numbers, charactersPickedByUsers, arrayPickedByUser);
        updateProgressBar(passwordStrength, 25)
    }
    if(confirm("do you want at least one symbol")) {
        processesUserChoices(symbols, charactersPickedByUsers, arrayPickedByUser);
        updateProgressBar(passwordStrength, 25)
    }
    firstPartpassword = charactersPickedByUsers.join("");
    console.log(firstPartpassword)
    // removing duplicates 
    arrayPickedByUser = arrayPickedByUser.filter(function(val) {
        return charactersPickedByUsers.indexOf(val) == -1;
    })

    lengthPassword = firstPartpassword.length
    console.log(lengthPassword)




    let secondPartPassword = restOfPassword(length-firstPartpassword.length, arrayPickedByUser);
    firstPartpassword += secondPartPassword;
    let shuffledPassword = shuffleArray(Array.from(firstPartpassword));
    // let finalPassword = shuffledPassword.toString();

    displayPassword.innerHTML = shuffledPassword.join("");
    passwordStrength.innerHTML = userPasswordStrength(lengthPassword)
    

    console.log()



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

function passwordLength(dummyLength) {
    if(dummyLength < 10) {
        alert("password must be at least 10 characters long");
        return
    }
}

function processesUserChoices(arrayUsed, charactersPickedByUsers, arrayPickedByUser) {
    const randomIndex = Math.floor(Math.random() * arrayUsed.length);
    charactersPickedByUsers.push(arrayUsed[randomIndex]);
    arrayPickedByUser.push(...arrayUsed);
}

function updateProgressBar(myProgressBar, value) {
    myProgressBar.querySelector("#myBar").style.width = `${value}%`

}

// progressBar.querySelector(".progress__fill").style.width = `${value}%`;

function userPasswordStrength(dummyLength) {
    if(dummyLength === 1) {
        return "very weak password"
    }
    if(dummyLength === 2) {
        return "weak password"
    }
    if(dummyLength === 3) {
        return "fairly strong"
    }
    else {
        return "strong password"
    }
}