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

function reInjectElementsInParentContainer(element) {
  return `<i class="fas fa-lock"></i>
  <div class="transparent" contenteditable="false">${element}</div>
  <i class="transparent fas fa-edit"></i>`;
}
function incrementCircularProgressBar(count, element, ratio, color) {
  if (count <= 25) {
    color = "red";
  } else if (count > 25 && count <= 50) {
    color = "orange";
  } else if (count > 50 && count <= 75) {
    color = "#DADD98";
  } else {
    color = "green";
  }
  element.style.background = `conic-gradient(${color} 0deg, ${color} ${
    count * ratio
  }deg, ${color} ${count * ratio}deg, ${color} ${count * ratio}deg, ${color} ${
    count * ratio
  }deg);`;
  element.style.background = `conic-gradient(${color} ${
    count * ratio
  }deg, white ${count * ratio}deg)`;
}





export {shuffleArray, processUserChoices, switchPasswordType, isElementNotEqualToNull,  createRestOfPassword, calculateUserPasswordStrength, reInjectElementsInParentContainer, incrementCircularProgressBar}

