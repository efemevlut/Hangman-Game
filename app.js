const wordElement = document.getElementById("word");
const finalMessage = document.getElementById("final-message");
const popup = document.getElementById("popup-container");
const wrongLettersElement = document.getElementById("wrong-letters");
const figureParts = document.querySelectorAll(".figure-part");
const playButton = document.querySelector("#play-button");
const notification = document.querySelector("#notification-container");

const words = ["apple", "book", "computer", "chair", "phone", "house", "dishwasher", "flower"];

let rnd = Math.floor(Math.random() * words.length);

let selectedWord = words[rnd];

const correctLetters = [];
const wrongLetters = [];

window.addEventListener("keydown", (e) => {
  let letter = e.key;

  if (e.key.charCodeAt(0) >= 97 && e.key.charCodeAt(0) <= 122) {
    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);
        updateWrongLetterElement();
      } else {
        showNotification();
      }
    }
  }
});



displayWord();

playButton.addEventListener("click", () => {
  correctLetters.splice(0);
  wrongLetters.splice(0);

  selectedWord = words[Math.floor(Math.random() * words.length)];

  displayWord();
  updateWrongLetterElement();
  popup.style.display = "none";
});

function displayWord() {
  console.log(selectedWord);
  letters = selectedWord.split("");
  console.log(letters);

  wordElement.innerHTML = "";
  letters.forEach((letter) => {
    let span = document.createElement("span");
    span.className = "letter";
    if (correctLetters.includes(letter)) span.textContent = letter;
    else span.textContent = "";
    wordElement.appendChild(span);
  });

  const innerWord = wordElement.textContent;

  if (innerWord === selectedWord) {
    finalMessage.innerHTML = "Congratulations! You won!";
    popup.style.display = "flex";
  }
}

function updateWrongLetterElement() {
  wrongLettersElement.innerHTML = "";
  if (wrongLetters.length > 0) {
    wrongLettersElement.innerHTML += "<p>Wrong</p>";
    wrongLettersElement.innerHTML += `<span>${wrongLetters.toString()}</span>`;
  }

  const errorNumber = wrongLetters.length;

  figureParts.forEach((part, index) => {
    if (index < errorNumber) part.style.display = "block";
    else part.style.display = "none";
  });

  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerHTML = "Unfortunately you lost";
    popup.style.display = "flex";
  }
}

function showNotification() {
  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
  }, 2500);
}
