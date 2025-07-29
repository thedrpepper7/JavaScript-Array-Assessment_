/* ---------------------------------------------------------
1. Functions
----------------------------------------------------------*/

function showHidden(whichElement) {
  whichElement.classList.add("visible");
}

function hide(whichElement) {
  whichElement.classList.remove("visible");
}

// Check if an email address is valid
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Get a random number (1–1000) for image generation
function randomNumber() {
  return Math.floor(Math.random() * 1000) + 1;
}

// Loop through grid and assign random image
function randomImage() {
  for (let i of imageGrid) {
    let img = i.querySelector("img");
    if (img) {
      let link = `https://picsum.photos/id/${randomNumber()}/200/200`;
      img.src = link;

      img.onerror = function () {
        this.onerror = null;
        this.src = `https://picsum.photos/id/${randomNumber()}/200/200`;
      };
    }
  }
}
