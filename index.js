const buttonContainer = document.querySelector(`.buttonContainer`);
const createPasswordSection = document.querySelector(`.createPasswordSection`);
const generatePasswordSection = document.querySelector(`.generatePasswordSection`);
const createPasswordButton = document.querySelector(`#createPasswordButton`);
const randomPasswordButton = document.querySelector(`#randomPasswordButton`);
const generatePasswordButton = document.querySelector(`#generatePasswordButton`);
const dummy = document.querySelector(`#dummy`)
const circleContainer = document.querySelector(`.circleContainer`);

const checkboxPassword = document.querySelector(`.checkboxPassword`);
const checkboxConfirmPassword = document.querySelector(".checkboxConfirmPassword");
const password = document.querySelector(`#password`);
const confirmPassword = document.querySelector(`#confirmPassword`);
const doesPasswordsmatch = document.querySelector(`.doesPasswordsmatch`);
const reset = document.querySelector(`.reset`)
const reset2 = document.querySelector(`.reset2`);
const form = document.querySelector(`.form`);
// create variables for range and checkbox elements
const range = document.querySelector(`.range`);
console.log(range)
const smallCapCheckBox = document.querySelector(`.smallCapCheckBox`);
const upperCaseCheckBox = document.querySelector(`.upperCaseCheckBox`);
const numberCheckBox = document.querySelector(`.numberCheckBox`);
const symbolCheckBox = document.querySelector(`.symbolCheckBox`);
console.log(symbolCheckBox)
console.log(smallCapCheckBox)
// const progressBar = document.querySelector('#progressBar');
const displayPassword = document.querySelector('#displayPassword');
const showPassword = document.querySelector(`.showPassword`);
const progressText = document.querySelector(`.progressText`);
const level = document.querySelector(`#level`);
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



// use form and checkbox 1/03/23

createPasswordButton.addEventListener("click", function() {
    createPasswordSection.classList.remove("displayNone");
    buttonContainer.classList.add("displayNone");
});

randomPasswordButton.addEventListener("click", function() {
    generatePasswordSection.classList.remove('displayNone');
    buttonContainer.classList.add("displayNone");
});




reset.addEventListener("click", function() {
    createPasswordSection.classList.toggle("displayNone");
    console.log(buttonContainer.classList)
    buttonContainer.classList.remove("remove");
    console.log(buttonContainer.classList)
    console.log("josue")
})

form.addEventListener("submit", (e) => {
    e.preventDefault(); 
});

generatePasswordButton.addEventListener("click", generatePassword);

range.addEventListener("change", e => {
    range.nextElementSibling.innerHTML = e.target.value;
});





confirmPassword.addEventListener("keyup", function() {
    if(confirmPassword.value === password.value) {
        doesPasswordsmatch.classList.remove("displayNone");
        doesPasswordsmatch.style.color = "green"
        doesPasswordsmatch.innerHTML = "match";
    }
    else {
        // doesPasswordsmatch.classList.toggle("displayNone")
        // doesPasswordsmatch.classList.add("displayNone");
        doesPasswordsmatch.innerHTML = "don't match";
        doesPasswordsmatch.style.color = "red"
      
    }
})





// if I give both elements the same class name say "dummy" can I create an Eventlistner
// using NodeList
checkboxPassword.addEventListener("change", switchPasswordType);
checkboxConfirmPassword.addEventListener('change', switchPasswordType);



reset2.addEventListener("click", function() {
    console.log("reset2 clicked")
    generatePasswordSection.classList.toggle("displayNone");
    buttonContainer.classList.toggle("remove");
})



function generatePassword() {

    let length = range.value

    if(smallCapCheckBox.checked) {
        processesUserChoices(lowerCaseLetters, charactersPickedByUsers, arrayPickedByUser);
        updateProgressBar();
    }
    if(upperCaseCheckBox.checked) {
        processesUserChoices(upperCaseLetters, charactersPickedByUsers, arrayPickedByUser);
        updateProgressBar();
    }
    if(numberCheckBox.checked) {
        processesUserChoices(numbers, charactersPickedByUsers, arrayPickedByUser);
        updateProgressBar()
    }
    if(symbolCheckBox.checked) {
        processesUserChoices(symbols, charactersPickedByUsers, arrayPickedByUser);
        updateProgressBar()
    }
    console.log(charactersPickedByUsers, arrayPickedByUser)


    firstPartpassword = charactersPickedByUsers.join("");
    console.log(firstPartpassword.length)
    generatePasswordButton.classList.add('remove');
    showPassword.classList.remove("displayNone");
    circleContainer.style.animationDuration = "1s"
    circleContainer.style.background = `conic-gradient(green ${firstPartpassword.length*90}deg, gray ${firstPartpassword.length*90}deg)`;

    arrayPickedByUser = arrayPickedByUser.filter(function(val) {
        return charactersPickedByUsers.indexOf(val) == -1;
    })


    lengthPassword = firstPartpassword.length
  

    let secondPartPassword = restOfPassword(length-firstPartpassword.length, arrayPickedByUser);
    progressText.innerHTML = userPasswordStrength(lengthPassword);
    // point where value of firstPassword.length changes
    firstPartpassword += secondPartPassword;
    
    let shuffledPassword = shuffleArray(Array.from(firstPartpassword));


    displayPassword.innerHTML = shuffledPassword.join("");
    // passwordStrength.innerHTML = userPasswordStrength(lengthPassword)
    // progressText.innerHTML = userPasswordStrength(lengthPassword);

    console.log(firstPartpassword.length)
   
   
    
  

}

function circularProgressBar(progress) {
    return `password strength ${progress*25}%`
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
        return `password strength ${dummyLength*25}%`;
    }
    if(dummyLength === 2) {
        return `password strength ${dummyLength*25}%`;
    }
    if(dummyLength === 3) {
        return `password strength  ${dummyLength*25}%`;
    }
    else {
        return `password strength  ${dummyLength*25}%`;
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

