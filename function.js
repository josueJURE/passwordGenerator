function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

function processesUserChoices(
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



export {shuffleArray, processesUserChoices, switchPasswordType}

