const owl =
  "/rtt31/assignments/done/ALAB316.2.1_InteractingwiththeBrowser/images/owl.jpg";
const boy =
  "/rtt31/assignments/done/ALAB316.2.1_InteractingwiththeBrowser/images/astronaut.jpg";
const duck =
  "/rtt31/assignments/done/ALAB316.2.1_InteractingwiththeBrowser/images/donaldduck.jpeg";
const dog =
  "/rtt31/assignments/done/ALAB316.2.1_InteractingwiththeBrowser/images/dog.jpeg";
const letters = [boy, boy, owl, owl, duck, duck, dog, dog];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const grid = document.getElementById("grid");
const shuffledLetters = shuffle(letters);

shuffledLetters.forEach((letter) => {
  const div = document.createElement("div");
  div.classList.add("square", "hidden");

  // Highlighted: Create an img element and set its src attribute to the image path
  const img = document.createElement("img"); // <-- Added line
  img.src = letter; // <-- Added line
  img.style.width = "100%"; // <-- Added line: Adjust image width
  img.style.height = "100%"; // <-- Added line: Adjust image height
  img.style.display = "none"; // <-- Added line: Initially hide the image

  div.appendChild(img); // <-- Added line: Append the img element to the div
  grid.appendChild(div);
});

const startButton = document.getElementById("startButton");
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

  const squares = document.querySelectorAll(".square");
  squares.forEach((square) => {
    square.classList.remove("hidden");

    // Highlighted: Show the image initially when starting
    square.querySelector("img").style.display = "block"; // <-- Added line

    setTimeout(() => {
      square.classList.add("hidden");

      // Highlighted: Hide the image after the timeout
      square.querySelector("img").style.display = "none"; // <-- Added line to Not display the image

      square.addEventListener("click", handleSquareClick); // <-- important: Rreassign the click event listener
    }, 1000);
  });
});

function handleSquareClick(event) {
  const square = event.currentTarget;
  const img = square.querySelector("img"); // <-- Added line: Reference the img element

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
