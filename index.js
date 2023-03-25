import { shuffleArray, processesUserChoices, switchPasswordType } from "./function.js";

const createPasswordButton = document.querySelector(`#createPasswordButton`);
const randomPasswordButton = document.querySelector(`#randomPasswordButton`);
const generatePasswordButton = document.querySelector(`#generatePasswordButton`);
const dummy2 = document.querySelector(`.dummy2`);
const circleContainer = document.querySelector(`.circleContainer`);
const CONVERT_TO_DEGRESS = 3.6;
const checkboxPassword = document.querySelector(`.checkboxPassword`);
const checkboxPasswordsArray = Array.from(
  document.querySelectorAll(`.checkboxPassword`)
);

const checkboxConfirmPassword = document.querySelector(".checkboxConfirmPassword");
const password = document.querySelector(`#password`);
const confirmPassword = document.querySelector(`#confirmPassword`);
const doesPasswordsmatch = document.querySelector(`.doesPasswordsmatch`);
const reset = document.querySelector(`.reset`);
const reset2 = document.querySelector(`.reset2`);
const form = document.querySelector(`.form`);
// create variables for range and checkbox elements
const range = document.querySelector(`.range`);

const smallCapCheckBox = document.querySelector(`.smallCapCheckBox`);
const upperCaseCheckBox = document.querySelector(`.upperCaseCheckBox`);
const numberCheckBox = document.querySelector(`.numberCheckBox`);
const symbolCheckBox = document.querySelector(`.symbolCheckBox`);

// const progressBar = document.querySelector('#progressBar');
const displayPassword = document.querySelector("#displayPassword");
const showPassword = document.querySelector("#showPassword");
const progressText = document.querySelector(`.progressText`);

// create arrays
const lowerCaseLetters = [...Array(26)].map((_, i) => String.fromCharCode(i + 97));
const upperCaseLetters = lowerCaseLetters.map((letter) => letter.toUpperCase());
const numbers = Array.from(Array(10).keys());
const symbols = [...Array(15)].map((_, i) => String.fromCharCode(i + 33));
let charactersPickedByUsers = [];
let arrayPickedByUser = [];
// create variables
let lengthPassword;
let firstPartpassword = "";
let counter;

if (IsElementEqualToNull(createPasswordButton)) {
  createPasswordButton.addEventListener("click", function () {
    window.location.assign("/createPassword.html");
  });
}
if (IsElementEqualToNull(reset)) {
  reset.addEventListener("click", function () {
    window.location.assign("/homePage.html");
  });
}
if (IsElementEqualToNull(randomPasswordButton)) {
  randomPasswordButton.addEventListener("click", function () {
    window.location.assign("/generatePassword.html");
  });
}
if (IsElementEqualToNull(reset2)) {
  reset2.addEventListener("click", function () {
    window.location.assign("/homePage.html");
  });
}
if (IsElementEqualToNull(form)) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
  });
}
if (IsElementEqualToNull(generatePasswordButton)) {
  generatePasswordButton.addEventListener("click", generatePassword);
}
if (IsElementEqualToNull(range)) {
  range.addEventListener("change", (e) => {
    range.nextElementSibling.innerHTML = e.target.value;
  });
}
if (IsElementEqualToNull(confirmPassword)) {
  confirmPassword.addEventListener("keyup", function () {
    if (password.value === "") {
      alert("you must enter a password first");
      return;
    } else if (confirmPassword.value === password.value) {
      doesPasswordsmatch.classList.remove("displayNone");
      doesPasswordsmatch.style.color = "green";
      doesPasswordsmatch.innerHTML = "match";
    } else {
      doesPasswordsmatch.innerHTML = "don't match";
      doesPasswordsmatch.style.color = "red";
    }
  });
}
if (IsElementEqualToNull(password)) {
  password.addEventListener("keyup", (e) => {
    e.getModifierState("CapsLock")
      ? (dummy2.innerHTML = "cap lock on")
      : (dummy2.innerHTML = "");
  });
}
if (IsElementEqualToNull(checkboxPassword)) {
  checkboxPassword.addEventListener("change", switchPasswordType);
}
if (IsElementEqualToNull(checkboxConfirmPassword)) {
  checkboxConfirmPassword.addEventListener("change", switchPasswordType);
}

function generatePassword() {
  let length = range.value;
  if (smallCapCheckBox.checked) {
    processesUserChoices(
      lowerCaseLetters,
      charactersPickedByUsers,
      arrayPickedByUser
    );
  }
  if (upperCaseCheckBox.checked) {
    processesUserChoices(
      upperCaseLetters,
      charactersPickedByUsers,
      arrayPickedByUser
    );
  }
  if (numberCheckBox.checked) {
    processesUserChoices(numbers, charactersPickedByUsers, arrayPickedByUser);
  }
  if (symbolCheckBox.checked) {
    processesUserChoices(symbols, charactersPickedByUsers, arrayPickedByUser);
  }
  let hasValueTrue = checkboxPasswordsArray.find(
    (element) => element.checked === true
  );
  if (hasValueTrue === undefined) {
    alert("tick at least one box");
    return;
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
  arrayPickedByUser = arrayPickedByUser.filter(function (val) {
    return charactersPickedByUsers.indexOf(val) == -1;
  });
  lengthPassword = firstPartpassword.length;
  let secondPartPassword = restOfPassword(
    length - firstPartpassword.length,
    arrayPickedByUser
  );
  counter = 0;
  setInterval(() => {
    if (counter < userPasswordStrength(lengthPassword)) {
      counter++;
      console.log(counter);
      progressText.innerHTML = `password strenght ${counter}%`;
      incrementCircularProgressBar(counter);
      circleContainer.style.background = `conic-gradient(red 0deg, orange ${counter * CONVERT_TO_DEGRESS}deg, yellow ${counter * CONVERT_TO_DEGRESS}deg, green ${counter * CONVERT_TO_DEGRESS}deg, blue ${counter * CONVERT_TO_DEGRESS}deg);`;
    } else {
      clearInterval;
    }
  }, 75);
  firstPartpassword += secondPartPassword;
  setTimeout(() => {
    let shuffledPassword = shuffleArray(Array.from(firstPartpassword));
    displayPassword.innerHTML = shuffledPassword.join("");
  }, 3000);
}

function incrementCircularProgressBar(count, color) {
  if (count <= 25) {
    color = "red";
  } else if (count > 25 && count <= 50) {
    color = "orange";
  } else if (count > 50 && count <= 75) {
    color = "#DADD98";
  } else {
    color = "green";
  }
  circleContainer.style.background = `conic-gradient(${color} 0deg, ${color} ${
    count * 3.6
  }deg, ${color} ${count * 3.6}deg, ${color} ${count * 3.6}deg, ${color} ${
    count * 3.6
  }deg);`;
  circleContainer.style.background = `conic-gradient(${color} ${
    count * 3.6
  }deg, white ${count * 3.6}deg)`;
}



function restOfPassword(dummyLength, arrayPickedByUser) {
  let result = "";
  for (var i = 0; i < dummyLength; i++) {
    let randomIndex = Math.floor(Math.random() * arrayPickedByUser.length);
    result += arrayPickedByUser[randomIndex];
  }
  return result;
}


function userPasswordStrength(dummyLength) {
  if (dummyLength === 1) {
    return dummyLength * 25;
  }
  if (dummyLength === 2) {
    return dummyLength * 25;
  }
  if (dummyLength === 3) {
    return dummyLength * 25;
  } else {
    return dummyLength * 25;
  }
}



function IsElementEqualToNull(element) {
  return element !== null;
}
