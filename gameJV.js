// Select all the cards
const cards = document.querySelectorAll(".memory-card");

// Creating variables
let first_Card;
let second_Card;
let has_Flipped_Card = false;
let can_click = true;

// Function to handle card flipping
function flip_Card() {
  // Check if clicking is allowed (during delay)
  if (!can_click) {
    return;
  }
  
  // Check if the same card is clicked again
  if (this === first_Card) {
    return;
  }

  // Add the 'flip' class to the clicked card
  this.classList.add("flip");

  // If it's the first card flipped
  if (!has_Flipped_Card) {
    has_Flipped_Card = true;
    first_Card = this;
    return;
  }

  // If it's the second card flipped
  second_Card = this;
  Match_check();
}

// Function to reset the board after checking for a match
function reset_Board() {
  has_Flipped_Card = false;
  can_click = true;
  first_Card = null;
  second_Card = null;
}

// Function to check if two flipped cards match
function Match_check() {
  // Check if the names of the two cards match
  if (first_Card.getAttribute("name") === second_Card.getAttribute("name")) {
    // If they match, remove the click event listeners and reset the board
    first_Card.removeEventListener("click", flip_Card);
    second_Card.removeEventListener("click", flip_Card);
    reset_Board();
  } else {
    // If they don't match, set a delay before flipping the cards back
    can_click = false;
    setTimeout(() => {
      first_Card.classList.remove("flip");
      second_Card.classList.remove("flip");
      reset_Board();
    }, 1240);
  }
}

// Randomize card order on each refresh
cards.forEach(card => {
  let randomPos = Math.floor(Math.random() * 12);
  card.style.order = randomPos;
});

// Add the flip event to each card
cards.forEach(card => card.addEventListener("click", flip_Card));