/*
  Utilized these DOM storage track which square INDEX and IMAGE was clicked:
  div.dataset.image
  div.dataset.index

*/
successfulMatchCount = 0;
const owl = "./images/owl.jpg";
const boy = "./images/astronaut.jpg";
const duck = "./images/donaldDuck.jpeg";
const dog = "./images/dog.jpeg";
const letters = [boy, boy, owl, owl, duck, duck, dog, dog];

/* pass the year */
const year = new Date().getFullYear();
const copyright = document.querySelector(".copyright");
copyright.textContent = `\u00A9 ${year} All Rights Reserved.`;
const poweredBy = document.querySelector(".poweredBy");
poweredBy.textContent = "powered by BYC";

/* 
    Resets tracker 
*/
resetTracker();

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const grid = document.getElementById("grid");

function resetOrder() {
  const shuffledLetters = shuffle(letters); // this shuffles the array.

  shuffledLetters.forEach((letter, index) => {
    const div = document.createElement("div");
    div.classList.add("square", "hidden");

    /* Store which square INDEX and IMAGE was clicked.
  For tracking purposes we use dataset.image, and dataset.index 
  */
    div.dataset.img = letter;
    div.dataset.index = index;

    // Highlighted: Create an img element and set its src attribute to the image path
    const img = document.createElement("img"); // <-- Added line
    img.src = letter; // <-- Added line
    img.style.width = "100%"; // <-- Added line: Adjust image width
    img.style.height = "100%"; // <-- Added line: Adjust image height
    img.style.display = "none"; // <-- Added line: Initially hide the image

    div.appendChild(img); // <-- Added line: Append the img element to the div
    grid.appendChild(div); // append to the grid
  });
}

resetOrder();

const startButton = document.getElementById("startButton");
startButton.style.padding = "1em";
startButton.style.margin = "1em";
startButton.style.fontSize = "1em";
startButton.style.borderRadius = "10px";
startButton.style.cursor = "pointer"; // cursor changes to pointer when hovered over button
startButton.style.width = "5em";
let firstClick = null;
let secondClick = null;
let revealedCount = 0;

function checkCompletion() {
  const squares = document.querySelectorAll(".square");
  if (revealedCount === squares.length) {
    setTimeout(() => {
      // <-- Added line: Use setTimeout to delay the alert
      alert("Congratulations! You have matched all pairs!");
      startButton.textContent = "Reset";
    }, 500); // <-- Added line. Adjust the delay to allow the last image to be shown
  }
}

startButton.addEventListener("click", () => {
  if (startButton.textContent === "Reset") {
    /* 
    Resets tracker 
    */
    resetTracker();

    const squares = document.querySelectorAll(".square");
    squares.forEach((square) => {
      square.classList.add("hidden");

      // Highlighted: Hide the image again when resetting
      square.querySelector("img").style.display = "none"; // <-- Added line
    });
    startButton.textContent = "Start";
    revealedCount = 0; // Reset the revealed count
    return;
  }
  /* shuffle the images */
  shuffle(letters);

  const squares = document.querySelectorAll(".square");
  squares.forEach((square) => {
    square.classList.remove("hidden");

    // Highlighted: Show the image initially when starting
    square.querySelector("img").style.display = "block"; // <-- Added line

    // Ready: hides the image after 1 second
    setTimeout(() => {
      square.classList.add("hidden");

      // Highlighted: Hide the image after the timeout
      square.querySelector("img").style.display = "none"; // <-- Added line to Not display the image

      square.addEventListener("click", handleSquareClick); // <-- IMPORTANT: Re-assign the click event listener from start button to listen to square clicks.
    }, 1000);
  });
  /* 
    Change Button Text
    */
  changeButtonText();
});

function handleSquareClick(event) {
  const square = event.currentTarget; // event.currentTarget is the clicked square
  const img = square.querySelector("img"); // <-- Added line: Reference the img element

  /* User information: 
  - Display which square was clicked 
  */
  const clIndex = document.querySelector(".child2");
  // const clImage = document.querySelector("#clickedImage");
  // clIndex.textContent = square.dataset.index;
  clIndex.style.fontSize = "1.5em";
  clIndex.setAttribute("padding", "2em");

  if (!firstClick) {
    firstClick = square;
    img.style.display = "block"; // <-- Added line: Show the image on first click
    square.classList.remove("hidden");
  } else if (!secondClick && square !== firstClick) {
    secondClick = square;
    img.style.display = "block"; // <-- Added line: Show the image on second click
    square.classList.remove("hidden");

    if (
      firstClick.querySelector("img").src ===
      secondClick.querySelector("img").src
    ) {
      firstClick.classList.add("revealed");
      secondClick.classList.add("revealed");
      firstClick = null;
      secondClick = null;
      revealedCount += 2;
      /* 
      Update User Information: successful Match count 
      */
      successfulMatchCount += 1;
      clIndex.innerHTML = successfulMatchCount;

      // clImage.setAttribute("src", square.dataset.img);

      checkCompletion();
    } else {
      setTimeout(() => {
        firstClick.querySelector("img").style.display = "none"; // <-- Added line: Hide image if not matching
        firstClick.classList.add("hidden");
        secondClick.querySelector("img").style.display = "none"; // <-- Added line: Hide image if not matching
        secondClick.classList.add("hidden");
        firstClick = null;
        secondClick = null;
      }, 1000);
    }
  }
}

function resetTracker() {
  successfulMatchCount = 0;
  const clIndex = document.querySelector(".child2");
  clIndex.textContent = "None";
}

function changeButtonText() {
  startButton.textContent = "Reset";
}
