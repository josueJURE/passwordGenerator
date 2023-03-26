function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

function processUserChoices(
  arrayUsed,
  charactersPickedByUsers,
  arrayPickedByUser
) {
  const randomIndex = Math.floor(Math.random() * arrayUsed.length);
  charactersPickedByUsers.push(arrayUsed[randomIndex]);
  arrayPickedByUser.push(...arrayUsed);
}

function switchPasswordType(e) {
  let element = e.target.parentElement.previousElementSibling.lastElementChild;
  if (e.target.checked) {
    element.type = "input";
  } else {
    element.type = "password";
  }
}

function isElementNotEqualToNull(element) {
  return element !== null;
}

function createRestOfPassword(length, arrayPickedByUser) {
  let result = "";
  for (var i = 0; i < length; i++) {
    let randomIndex = Math.floor(Math.random() * arrayPickedByUser.length);
    result += arrayPickedByUser[randomIndex];
  }
  return result;
}

function calculateUserPasswordStrength(length) {
    return length * 25;
}



export {shuffleArray, processUserChoices, switchPasswordType, isElementNotEqualToNull,  createRestOfPassword, calculateUserPasswordStrength}

