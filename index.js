import { shuffleArray, processesUserChoices, switchPasswordType, isElementNotEqualToNull, restOfPassword, userPasswordStrength } from "./function.js";
import { createPasswordButton, randomPasswordButton } from "./homePage.js";
import {dummy2, checkboxPassword, checkboxPasswordsArray, checkboxConfirmPassword, password, confirmPassword, doesPasswordsmatch, reset} from "./createPassword.js";

// create variables
const CONVERT_TO_DEGRESS = 3.6;
const lowerCaseLetters = [...Array(26)].map((_, i) => String.fromCharCode(i + 97));
const upperCaseLetters = lowerCaseLetters.map((letter) => letter.toUpperCase());
const numbers = Array.from(Array(10).keys());
const symbols = [...Array(15)].map((_, i) => String.fromCharCode(i + 33));
let charactersPickedByUsers = [];
let arrayPickedByUser = [];
let lengthPassword;
let firstPartpassword = "";
let counter;

if (isElementNotEqualToNull(createPasswordButton)) {
  createPasswordButton.addEventListener("click", function () {
    window.location.assign("/createPassword.html");
  });
}
if (isElementNotEqualToNull(reset)) {
  reset.addEventListener("click", function () {
    window.location.assign("/homePage.html");
  });
}
if (isElementNotEqualToNull(randomPasswordButton)) {
  randomPasswordButton.addEventListener("click", function () {
    window.location.assign("/generatePassword.html");
  });
}
if (isElementNotEqualToNull(reset2)) {
  reset2.addEventListener("click", function () {
    window.location.assign("/homePage.html");
  });
}
if (isElementNotEqualToNull(form)) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
  });
}
if (isElementNotEqualToNull(generatePasswordButton)) {
  generatePasswordButton.addEventListener("click", generatePassword);
}
if (isElementNotEqualToNull(range)) {
  range.addEventListener("change", (e) => {
    range.nextElementSibling.innerHTML = e.target.value;
  });
}
if (isElementNotEqualToNull(confirmPassword)) {
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
if (isElementNotEqualToNull(password)) {
  password.addEventListener("keyup", (e) => {
    e.getModifierState("CapsLock")
      ? (dummy2.innerHTML = "cap lock on")
      : (dummy2.innerHTML = "");
  });
}
if (isElementNotEqualToNull(checkboxPassword)) {
  checkboxPassword.addEventListener("change", switchPasswordType);
}
if (isElementNotEqualToNull(checkboxConfirmPassword)) {
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






