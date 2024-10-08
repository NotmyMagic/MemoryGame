const cards = document.querySelectorAll(".memory-card");
let matches = 0; // Track the number of matches
const totalMatches = cards.length / 2; // Total pairs in the game
const GameReset = document.querySelector("#reset");

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  this.classList.add("flip");

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  }
  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.type === secondCard.dataset.type;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  matches++; // Increment the number of matches

  if (matches === totalMatches) {
    console.log("All items matched, Game Over!");
    document.getElementById("win").style.display = "block";
  }

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetBoard();
  }, 1000);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

function gameEnd() {
  console.log("Game Reset");
  lockBoard = false;
  matches = 0;
  document.getElementById("win").style.display = "none";
  cards.forEach((card) => {
    card.classList.remove("flip");
  });
  cards.forEach((card) => card.addEventListener("click", flipCard));

  //reshuffle
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
}

cards.forEach((card) => card.addEventListener("click", flipCard));
