// ciruclar increment bar must find a way to smoothly transition color
/* link to smoothly transition color
https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/conic-gradient
*/

/*
18.03.23: look at slidesInFromRight & slidesInFromLeft CSS rules for animation and link saved
add them to generatePassword.html and homePage.html
*/

const buttonContainer = document.querySelector(`.buttonContainer`);
const createPasswordSection = document.querySelector(`.createPasswordSection`);
const generatePasswordSection = document.querySelector(`.generatePasswordSection`);
const createPasswordButton = document.querySelector(`#createPasswordButton`);
const randomPasswordButton = document.querySelector(`#randomPasswordButton`);
const generatePasswordButton = document.querySelector(`#generatePasswordButton`);
const dummy = document.querySelector(`#dummy`);
const dummy2 = document.querySelector(`.dummy2`);
const circleContainer = document.querySelector(`.circleContainer`);
const resetOrRegeneratePassword = document.querySelector(`.resetOrRegeneratePassword`);
const checkboxSection = document.querySelector(`.checkboxSection`);
const RATIO_TO_CONVERT_TO_DEGREES = 3.6;



const checkboxPassword = document.querySelector(`.checkboxPassword`);
const checkboxPasswordsArray = Array.from(document.querySelectorAll(`.checkboxPassword`));
console.log(checkboxPasswordsArray)
// checkboxPasswordsArray.shift();
 
const checkboxConfirmPassword = document.querySelector(".checkboxConfirmPassword");
const password = document.querySelector(`#password`);
const confirmPassword = document.querySelector(`#confirmPassword`);
const doesPasswordsmatch = document.querySelector(`.doesPasswordsmatch`);
const reset = document.querySelector(`.reset`)
const reset2 = document.querySelector(`.reset2`);
const form = document.querySelector(`.form`);
// create variables for range and checkbox elements
const range = document.querySelector(`.range`);

const smallCapCheckBox = document.querySelector(`.smallCapCheckBox`);
const upperCaseCheckBox = document.querySelector(`.upperCaseCheckBox`);
const numberCheckBox = document.querySelector(`.numberCheckBox`);
const symbolCheckBox = document.querySelector(`.symbolCheckBox`);

// const progressBar = document.querySelector('#progressBar');
const displayPassword = document.querySelector('.displayPassword');
const showPassword = document.querySelector(`.showPassword`);
const progressText = document.querySelector(`.progressText`);
const level = document.querySelector(`#level`);

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
let counter;


if(IsElementEqualToNull(createPasswordButton)) {
    createPasswordButton.addEventListener("click", function() {
        window.location.assign("/createPassword.html");
    });
}

if(IsElementEqualToNull(reset)) {
    reset.addEventListener("click", function() {
        window.location.assign("/homePage.html")
    });
}


if(IsElementEqualToNull(randomPasswordButton)) {
    randomPasswordButton.addEventListener("click", function() {
        window.location.assign("/generatePassword.html");
    });
}



if(IsElementEqualToNull(reset2)) {
    reset2.addEventListener("click", function() {
        window.location.assign("/homePage.html");
    })
}


if(IsElementEqualToNull(form)) {
    form.addEventListener("submit", (e) => {
        e.preventDefault(); 
    });
}


if(IsElementEqualToNull(generatePasswordButton)) {
    generatePasswordButton.addEventListener("click", generatePassword);
}

if(IsElementEqualToNull(range)) {
    range.addEventListener("change", e => {
        range.nextElementSibling.innerHTML = e.target.value;
    });
}

if(IsElementEqualToNull(confirmPassword)) {
    confirmPassword.addEventListener("keyup", function() {
        if(password.value === "") {
            alert("you must enter a password first");
            return
        }
        else if(confirmPassword.value === password.value) {
            doesPasswordsmatch.classList.remove("displayNone");
            doesPasswordsmatch.style.color = "green"
            doesPasswordsmatch.innerHTML = "match";
        }
        else {
            doesPasswordsmatch.innerHTML = "don't match";
            doesPasswordsmatch.style.color = "red";
        }
    })
}

if(IsElementEqualToNull(password)) {
    password.addEventListener("keyup", e => {
        e.getModifierState("CapsLock") ? dummy2.innerHTML = "cap lock on" : dummy2.innerHTML = "";
    })
}


if(IsElementEqualToNull(checkboxPassword)) {
    checkboxPassword.addEventListener("change", switchPasswordType);
}
if(IsElementEqualToNull(checkboxConfirmPassword)) {
    checkboxConfirmPassword.addEventListener('change', switchPasswordType);
}


function generatePassword() {

    let length = range.value

    if(smallCapCheckBox.checked) {
        processesUserChoices(lowerCaseLetters, charactersPickedByUsers, arrayPickedByUser);
    }
    if(upperCaseCheckBox.checked) {
        processesUserChoices(upperCaseLetters, charactersPickedByUsers, arrayPickedByUser);
    }
    if(numberCheckBox.checked) {
        processesUserChoices(numbers, charactersPickedByUsers, arrayPickedByUser);
    }
    if(symbolCheckBox.checked) {
        processesUserChoices(symbols, charactersPickedByUsers, arrayPickedByUser);
    }

    let hasValueTrue = checkboxPasswordsArray.find(element => element.checked === true);

    console.log(hasValueTrue)
    
    if(hasValueTrue === undefined) {
        alert("tick at least one box");
        return
    }
    // toggleElement(checkboxSection)
    /* codebars 14/03/22. Code keeps running when using hasAtLeastOneCheckboxBeenTicked() is called.
     'undefined' displayed in element with class displayPassworContainer.
     on the other hand code below working find
     if(hasValueTrue === undefined) {
        alert("tick at least one box");
        return
    }
     */
    // hasAtLeastOneCheckboxBeenTicked(hasValueTrue)

    firstPartpassword = charactersPickedByUsers.join("");
    showPassword.classList.remove("displayNone");
    arrayPickedByUser = arrayPickedByUser.filter(function(val) {
        return charactersPickedByUsers.indexOf(val) == -1;
    })


    lengthPassword = firstPartpassword.length
    let secondPartPassword = restOfPassword(length-firstPartpassword.length, arrayPickedByUser);
    counter = 0;
    setInterval(() => {
        if(counter < userPasswordStrength(lengthPassword)) {
            counter++;
            console.log(counter)
            progressText.innerHTML = `password strenght ${counter}%`;
            incrementCircularProgressBar(counter);
            circleContainer.style.background = `conic-gradient(red 0deg, orange ${counter*RATIO_TO_CONVERT_TO_DEGREES}deg, yellow ${counter*RATIO_TO_CONVERT_TO_DEGREES}deg, green ${counter*RATIO_TO_CONVERT_TO_DEGREES}deg, blue ${counter*RATIO_TO_CONVERT_TO_DEGREES}deg);`;
            // circleContainer.style.background = `conic-gradient(green ${counter*3.6}deg, gray ${counter*3.6}deg)`;
        } else {
            clearInterval;
        }
        
    }, 75);


    // point where value of firstPassword.length changes
    firstPartpassword += secondPartPassword;

    /* would like to dinamycally call the function according
     to password length. Has something to do with argument passed in
     setTimeout in that case 3000
    */

    setTimeout(() => {
        let shuffledPassword = shuffleArray(Array.from(firstPartpassword));
        displayPassword.innerHTML = shuffledPassword.join("");
    }, 3000);


}

function incrementCircularProgressBar(count) {
    if(count <= 25) {
        color = "red";
    } else if (count > 25 && count <= 50) {
        color = "orange";
    } else if (count > 50 && count <= 75) {
        color = "#DADD98"
    } else {
        color = "green"
    }
    circleContainer.style.background = `conic-gradient(${color} 0deg, ${color} ${count*3.6}deg, ${color} ${count*3.6}deg, ${color} ${count*3.6}deg, ${color} ${count*3.6}deg);`
    circleContainer.style.background = `conic-gradient(${color} ${count*3.6}deg, white ${count*3.6}deg)`;
    // use CSS below to transition from red to green smoothly
    // circleContainer.style.background = `linear-gradient(to left, red, green)`;
    // circleContainer.style.background = `conic-gradient(red, orange, yellow, green, blue);
    // conic-gradient(red 0deg, orange 90deg, yellow 180deg, green 270deg, blue 360deg);
    // `
 }

// function hasAtLeastOneCheckboxBeenTicked(argument) {
//     if(argument === undefined) {
//         alert("ticked at least one box");
//         return;
//     }
// }

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

  const updateProgressBar = () => {
    var value = 0;
    value++
    return value
  }



function userPasswordStrength(dummyLength) {
    if(dummyLength === 1) {
        return dummyLength*25;
    }
    if(dummyLength === 2) {
        return dummyLength*25;
    }
    if(dummyLength === 3) {
        return dummyLength*25;
    }
    else {
        return dummyLength*25;
    }
}

function switchPasswordType(e) {
    let element =  e.target.parentElement.previousElementSibling.lastElementChild
    if(e.target.checked) {
       element.type = "input";
    } else {
        element.type = "password"
    }
}

function deselectAllButtons() {
    checkboxPasswordsArray.forEach(element => element.checked = false);
    range.value = 10;
    progressText.innerHTML = "";
    displayPassword.innerHTML = " ";
    circleContainer.style.background = "gray";
    counter = '';
}

function IsElementEqualToNull(element) {
    return element !== null
}




