// ciruclar increment bar must find a way to smoothly transition color
// create function to check if checkboxPasswordsArray has at least one true value

const buttonContainer = document.querySelector(`.buttonContainer`);
const createPasswordSection = document.querySelector(`.createPasswordSection`);
const generatePasswordSection = document.querySelector(`.generatePasswordSection`);
const createPasswordButton = document.querySelector(`#createPasswordButton`);
const randomPasswordButton = document.querySelector(`#randomPasswordButton`);
const generatePasswordButton = document.querySelector(`#generatePasswordButton`);
const dummy = document.querySelector(`#dummy`);
const dummy2 = document.querySelector(`.dummy2`);
const circleContainer = document.querySelector(`.circleContainer`);

const checkboxPassword = document.querySelector(`.checkboxPassword`);
const checkboxPasswordsArray = Array.from(document.querySelectorAll(`.checkboxPassword`));
checkboxPasswordsArray.shift();
 
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
const displayPassword = document.querySelector('#displayPassword');
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


createPasswordButton.addEventListener("click", function() {
    createPasswordSection.classList.remove("displayNone");
    buttonContainer.classList.add("displayNone");
});

reset.addEventListener("click", function() {
    createPasswordSection.classList.toggle("displayNone");
    buttonContainer.classList.toggle("displayNone");
});

randomPasswordButton.addEventListener("click", function() {
    generatePasswordSection.classList.remove('displayNone');
    buttonContainer.classList.add("displayNone");
});

reset2.addEventListener("click", function() {
    generatePasswordSection.classList.toggle('displayNone');
    buttonContainer.classList.toggle("displayNone");
});


form.addEventListener("submit", (e) => {
    e.preventDefault(); 
});

generatePasswordButton.addEventListener("click", generatePassword);

range.addEventListener("change", e => {
    range.nextElementSibling.innerHTML = e.target.value;
});


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

password.addEventListener("keyup", e => {
    e.getModifierState("CapsLock") ? dummy2.innerHTML = "cap lock on" : dummy2.innerHTML = "";
})






// if I give both elements the same class name say "dummy" can I create an Eventlistner
// using NodeList
checkboxPassword.addEventListener("change", switchPasswordType);
checkboxConfirmPassword.addEventListener('change', switchPasswordType);







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

    let dummy = checkboxPasswordsArray.find(element => element.checked === true) 


    if(dummy === undefined) {
        alert("ticked at least one box");
        return;
    }
     

 
  

    console.log(checkboxPasswordsArray[0].checked)

    checkboxPasswordsArray.find(hasAtLeastOneCheckBoxTicked)
    firstPartpassword = charactersPickedByUsers.join("");
    generatePasswordButton.classList.add('remove');
    showPassword.classList.remove("displayNone");
    arrayPickedByUser = arrayPickedByUser.filter(function(val) {
        return charactersPickedByUsers.indexOf(val) == -1;
    })

  



  

  

    lengthPassword = firstPartpassword.length
    let secondPartPassword = restOfPassword(length-firstPartpassword.length, arrayPickedByUser);
    let counter = 0;
    setInterval(() => {
        if(counter < userPasswordStrength(lengthPassword)) {
            counter++;
            console.log(counter)
            progressText.innerHTML = `password strenght ${counter}%`;
            incrementCircularProgressBar(counter);
            // circleContainer.style.background = `conic-gradient(green ${counter*3.6}deg, gray ${counter*3.6}deg)`;
        } else {
            clearInterval;
        }
    }, 75);

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
    circleContainer.style.background = `conic-gradient(${color} ${count*3.6}deg, gray ${count*3.6}deg)`;
 }


    // point where value of firstPassword.length changes
    firstPartpassword += secondPartPassword;
    
    let shuffledPassword = shuffleArray(Array.from(firstPartpassword));
    displayPassword.innerHTML = shuffledPassword.join("");
}

function hasAtLeastOneCheckBoxTicked(element) {
    element.checked === true
    if(element.checked === "undefined") {
        alert('ticked at least one box');
        return;
    }
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

