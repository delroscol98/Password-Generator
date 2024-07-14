//CHARACTER LENGTH SLIDER
const rangeInput = document.querySelector(".characterLength__range");
const rangeNumber = document.querySelector(".characterLength__number");

const rangeInputHandler = () => {
  const charLength = rangeInput.value;
  rangeInput.style.background = `linear-gradient(to right, #a4ffaf ${
    charLength * 5
  }%, #18171f ${charLength * 5}%)`;
  rangeNumber.innerText = charLength;
};

rangeInput.addEventListener("input", rangeInputHandler);

//GENERATE PASSWORD
const passwordInputForm = document.querySelector(".passwordInput");

//Creates ASCII CharacterCode Array
const ASCIICharCodeArray = (low, high) => {
  const ASCIIArray = [];
  for (let i = low; i <= high; i++) {
    ASCIIArray.push(i);
  }
  return ASCIIArray;
};

//Calls ASCIICharCodeArray for respective characters
const UPPERCASE_CHAR_CODES = ASCIICharCodeArray(65, 90);
const LOWERCASE_CHAR_CODES = ASCIICharCodeArray(97, 122);
const NUMBER_CHAR_CODES = ASCIICharCodeArray(48, 57);
const SYMBOL_CHAR_CODES = ASCIICharCodeArray(33, 47)
  .concat(ASCIICharCodeArray(58, 64))
  .concat(ASCIICharCodeArray(91, 96))
  .concat(ASCIICharCodeArray(123, 126));

const generatePassword = () => {
  const charLength = document.querySelector(".characterLength__range").value;
  const includeUpper = document.getElementById("uppercase").checked;
  const includeLower = document.getElementById("lowercase").checked;
  const includeNums = document.getElementById("numbers").checked;
  const includeSym = document.getElementById("symbols").checked;

  //Creates character code array based on user input
  let charCodes = [];
  const passwordCharacters = [];
  let strengthCount = 0;
  if (includeUpper) {
    charCodes = charCodes.concat(UPPERCASE_CHAR_CODES);
    strengthCount++;
    if (!includeUpper) {
      strengthCount--;
    }
  }
  if (includeLower) {
    charCodes = charCodes.concat(LOWERCASE_CHAR_CODES);
    strengthCount++;
    if (!includeLower) {
      strengthCount--;
    }
  }
  if (includeNums) {
    charCodes = charCodes.concat(NUMBER_CHAR_CODES);
    strengthCount++;
    if (!includeNums) {
      strengthCount--;
    }
  }
  if (includeSym) {
    charCodes = charCodes.concat(SYMBOL_CHAR_CODES);
    strengthCount++;
    if (!includeSym) {
      strengthCount--;
    }
  }

  //Loops through character code array and produces a random selection of characters to create and return a password as a string
  for (let i = 0; i < charLength; i++) {
    const characterCode =
      charCodes[Math.floor(Math.random() * charCodes.length)];
    passwordCharacters.push(String.fromCharCode(characterCode));
  }
  return [passwordCharacters.join(""), strengthCount];
};

const ratingBarHandler = (strengthCount) => {
  const ratingBars = document.querySelectorAll(".strength__rating--bar");
  const ratingLabel = document.querySelector(".strength__rating-label");

  console.log(ratingBars);

  for (let i = 0; i < strengthCount; i++) {
    if (strengthCount === 1) {
      ratingBars[i].classList.add("too-weak");
      ratingLabel.innerText = "TOO WEAK";
    }
    if (strengthCount === 2) {
      ratingBars[i].classList.add("weak");
      ratingLabel.innerText = "WEAK";
    }
    if (strengthCount === 3) {
      ratingBars[i].classList.add("medium");
      ratingLabel.innerText = "MEDIUM";
    }
    if (strengthCount === 4) {
      ratingBars[i].classList.add("strong");
      ratingLabel.innerText = "STRONG";
    }
  }
};

const formSubmitHandler = (e) => {
  e.preventDefault();

  //Generates a password
  const passwordEl = document.querySelector(".passwordDisplay__password");
  const [password, strengthCount] = generatePassword();

  if (password) {
    passwordEl.innerText = password;
    ratingBarHandler(strengthCount);
  }
};

passwordInputForm.addEventListener("submit", formSubmitHandler);
