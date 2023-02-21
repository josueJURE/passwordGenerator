const buttonContainer = document.querySelector(`.buttonContainer`);
const createPasswordSection = document.querySelector(`.createPasswordSection`);
const generatePasswordSection = document.querySelector(`.generatePasswordSection`);
const createPasswordButton = document.querySelector(`#createPasswordButton`);
const randomPasswordButton = document.querySelector(`#randomPasswordButton`);
const generatePasswordButton = document.querySelector(`#generatePasswordButton`);
const circleContainer = document.querySelector(`.circleContainer`);
console.log(circleContainer)
const goBack1 = document.querySelector(`#goBack1`);
const goBack2 = document.querySelector(`#goBack2`);
// const progressBar = document.querySelector('#progressBar');
const displayPassword = document.querySelector('#displayPassword');
const showPassword = document.querySelector(`.showPassword`);
const progressText = document.querySelector(`.progressText`);
const level = document.querySelector(`#level`)
console.log(level)
// create arrays
const lowerCaseLetters = [...Array(26)].map((_, i) => String.fromCharCode(i + 97));
const upperCaseLetters = lowerCaseLetters.map(letter => letter.toUpperCase());
const symbolsNumbers = [...Array(31)].map((_, i) => String.fromCharCode( i + 33));
const numbers = Array.from(Array(10).keys());
const symbols = [...Array(15)].map((_, i) => String.fromCharCode(i + 33));
let charactersPickedByUsers = [];
let arrayPickedByUser = [];
// create variables
let lengthPassword;
let gaugeWidth = 800;
let firstPartpassword = "";





createPasswordButton.addEventListener("click", function() {
    createPasswordSection.classList.remove("displayNone");
    buttonContainer.classList.add("remove");
    // randomPasswordButton.classList.add("remove");
    
})

randomPasswordButton.addEventListener("click", function() {
    generatePasswordSection.classList.remove("displayNone");
    buttonContainer.classList.add("remove");
    // randomPasswordButton.classList.add("remove");
})

goBack1.addEventListener("click", goBackToPrevious)
goBack2.addEventListener("click", goBackToPrevious)

function removeElements() {
 
}

function goBackToPrevious() {
    createPasswordSection.classList.toggle("remove");
    buttonContainer.classList.toggle("remove");
}


generatePasswordButton.addEventListener("click", generatePassword);


function generatePassword() {
    let length = prompt("enter password length");
    passwordLength(length); 
    if(confirm("do you want at least one lower case character")) {
        processesUserChoices(lowerCaseLetters, charactersPickedByUsers, arrayPickedByUser);
        updateProgressBar();
    }
    // if(confirm("do you want at least one upper case character")) {
    //     processesUserChoices(upperCaseLetters, charactersPickedByUsers, arrayPickedByUser);
    //     updateProgressBar();
    // }
    // if(confirm("do you want at least one number")) {
    //     processesUserChoices(numbers, charactersPickedByUsers, arrayPickedByUser);
    //         updateProgressBar()
    // }
    // if(confirm("do you want at least one symbol")) {
    //     processesUserChoices(symbols, charactersPickedByUsers, arrayPickedByUser);
    //         updateProgressBar()
    // }
    firstPartpassword = charactersPickedByUsers.join("");
    goBack2.classList.add("remove");
    generatePasswordButton.classList.add('remove');
    showPassword.classList.remove("displayNone");
    circleContainer.style.background = `conic-gradient(green ${updateProgressBar()*90}deg, gray ${updateProgressBar()*90}deg)`;

    arrayPickedByUser = arrayPickedByUser.filter(function(val) {
        return charactersPickedByUsers.indexOf(val) == -1;
    })

    lengthPassword = firstPartpassword.length
    console.log(lengthPassword)




    let secondPartPassword = restOfPassword(length-firstPartpassword.length, arrayPickedByUser);
    firstPartpassword += secondPartPassword;
    let shuffledPassword = shuffleArray(Array.from(firstPartpassword));


    displayPassword.innerHTML = shuffledPassword.join("");
    // passwordStrength.innerHTML = userPasswordStrength(lengthPassword)
    // progressText.innerHTML = userPasswordStrength(lengthPassword);
    level.innerHTML = `${updateProgressBar()*25}%`
    

   



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



// function updateProgressBar() {
//     var value1 = progressBar.value
//     progressBar.value = value1 + 25
//   }

  const updateProgressBar = () => {
    var value = 0;
    value++
    return value
  }





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

