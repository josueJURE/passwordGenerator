import {
  shuffleArray,
  processUserChoices,
  switchPasswordType,
  isElementNotEqualToNull,
  createRestOfPassword,
  calculateUserPasswordStrength,
  reInjectElementsInParentContainer,
  incrementCircularProgressBar,
} from "./jsUtilities/function.js";
import {
  createPasswordButton,
  randomPasswordButton,
  footer,
} from "./jsUtilities/homePage.js";
import {
  capLockOn,
  checkboxPassword,
  checkboxPasswordsArray,
  checkboxConfirmPassword,
  password,
  confirmPassword,
  doesPasswordsmatch,
  returnHomePage,
} from "./jsUtilities/createPassword.js";
import {
  goToHomePage,
  form,
  range,
  smallCapCheckBox,
  upperCaseCheckBox,
  numberCheckBox,
  symbolCheckBox,
  generatePasswordButton,
  circleContainer,
  displayPassword,
  showPassword,
  progressText,
} from "./jsUtilities/generatePassword.js";



// create variables
const CONVERT_TO_DEGRESS = 3.6;
const lowerCaseLetters = [...Array(26)].map((_, i) =>
  String.fromCharCode(i + 97)
);
const upperCaseLetters = lowerCaseLetters.map((letter) => letter.toUpperCase());
const numbers = Array.from(Array(10).keys());
const symbols = [...Array(15)].map((_, i) => String.fromCharCode(i + 33));
let passwordList = new Map();
let lengthPassword, counter;

if (isElementNotEqualToNull(footer)) {
  function createDate() {
    const currentYear = new Date().getFullYear();
    return currentYear;
  }
  footer.innerHTML = `Generate Password Company ${createDate()}. All right reserved`;
}

if (createPasswordButton) {
  createPasswordButton.addEventListener("click", function () {
    window.location.assign("createPassword.html");
  });
}
if (isElementNotEqualToNull(returnHomePage)) {
  returnHomePage.addEventListener(
    "click",
    function () {
      window.location.assign("index.html");
    },
    true
  );
}

if (isElementNotEqualToNull(randomPasswordButton)) {
  randomPasswordButton.addEventListener("click", function () {
    window.location.assign("generatePassword.html");
  });
}
if (isElementNotEqualToNull(goToHomePage)) {
  console.log("go to home page")
  goToHomePage.addEventListener("click", function () {
    window.location.assign("index.html");
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
      ? (capLockOn.innerHTML = "cap lock on")
      : (capLockOn.innerHTML = "");
  });
}
if (isElementNotEqualToNull(checkboxPassword)) {
  checkboxPassword.addEventListener("change", switchPasswordType);
}
if (isElementNotEqualToNull(checkboxConfirmPassword)) {
  checkboxConfirmPassword.addEventListener("change", switchPasswordType);
}
if (isElementNotEqualToNull(displayPassword)) {
  displayPassword.addEventListener("click", function (e) {
    let target = e.target;
    if (target.classList.contains("fa-edit")) {
      console.log(document.querySelectorAll(".transparent")[0]);
      console.log("josué");
      document
        .querySelectorAll(".transparent")[0]
        .setAttribute("contenteditable", true);
    }
  });
}

function generatePassword() {
  let charactersPickedByUsers = [];
  let firstPartpassword = "";
  displayPassword.innerHTML = "";
  let secondPartPassword;

  let arrayPickedByUser = [];
  let length = range.value;

  function generateFirstPartPassword() {
    if (smallCapCheckBox.checked) {
      processUserChoices(
        lowerCaseLetters,
        charactersPickedByUsers,
        arrayPickedByUser
      );
    }
    if (upperCaseCheckBox.checked) {
      processUserChoices(
        upperCaseLetters,
        charactersPickedByUsers,
        arrayPickedByUser
      );
    }
    if (numberCheckBox.checked) {
      processUserChoices(numbers, charactersPickedByUsers, arrayPickedByUser);
    }
    if (symbolCheckBox.checked) {
      processUserChoices(symbols, charactersPickedByUsers, arrayPickedByUser);
    }

    firstPartpassword = charactersPickedByUsers.join("");
    showPassword.classList.remove("displayNone");
    arrayPickedByUser = arrayPickedByUser.filter(function (val) {
      return charactersPickedByUsers.indexOf(val) == -1;
    });
    lengthPassword = firstPartpassword.length;
    let secondPartPassword = createRestOfPassword(
      length - firstPartpassword.length,
      arrayPickedByUser
    );
    firstPartpassword += secondPartPassword;
  }
  generateFirstPartPassword();
  let hasValueTrue = checkboxPasswordsArray.find(
    (element) => element.checked === true
  );
  if (hasValueTrue === undefined) {
    alert("tick at least one box");
    return;
  }


  counter = 0;
  let circularProgressBarInterval = setInterval(() => {
    if (counter < calculateUserPasswordStrength(lengthPassword)) {
      counter++;
      console.log(counter);
      progressText.innerHTML = `password strenght ${counter}%`;
      incrementCircularProgressBar(
        counter,
        circleContainer,
        CONVERT_TO_DEGRESS
      );
    } else {
      let shuffledPassword = shuffleArray(Array.from(firstPartpassword)).join(
        ""
      );
      function checkPassword() {
        if (passwordList.get(shuffledPassword)) {
          generateFirstPartPassword();
          checkPassword();
        } else {
          displayPassword.innerHTML = shuffledPassword;
          passwordList.set(shuffledPassword, true);
        }
      }
      checkPassword();
      clearInterval(circularProgressBarInterval);
      firstPartpassword += secondPartPassword;
      displayPassword.innerHTML =
        reInjectElementsInParentContainer(shuffledPassword);
      passwordList.set("userPassword", shuffledPassword);
    }
  }, 75);
}
