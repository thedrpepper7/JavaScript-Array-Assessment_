// functions

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

// use the regex (above) to confirm an email is valid
function emailChecker(GivenEmail) {
  let value = GivenEmail.value.trim();
  if (value === "" || !isValidEmail(GivenEmail.value)) {
    GivenEmail.classList.add("noAddress");
    showHidden(invalidSpan);
    return false;
  } else {
    email = GivenEmail.value;
    hide(invalidSpan);
    GivenEmail.classList.remove("noAddress");
    GivenEmail.value = ``;
    return email;
  }
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

function SkeletonImg(email, link) {
  let skeleton = `
    <div class="SelectedImagesBlock">
        <p>These images were assigned to ${email}</p>
        <img src="${link}">
        <button>Send</button>
    </div>`;
  return skeleton;
}

// variables in order of appearance on the page

let selectedImages = [];
let previousEmails = [];

let imageHolder = document.querySelector("#imageholders");
let imageGrid = document.querySelectorAll(".image");

let imageChoiceDisplay = document.querySelector("#image-display");
let invalidSpan = document.querySelector("#invalidFirstEmail");
let emailInputBox = document.querySelector("#emailInput");

let completeChoice = document.querySelector("#submit-choice");
let emailDropdown = document.querySelector("#emailDropdown");

// button logic and validtaions

imageHolder.addEventListener("click", (e) => {
  let src = e.target.src;
  if (e.target.tagName === "IMG" && !selectedImages.includes(src)) {
    selectedImages.push(src);
    imageChoiceDisplay.innerHTML += `<img src="${src}" class="imageRemover">`;
  }
});

completeChoice.addEventListener("click", () => {
  let isTrue = emailChecker(emailInputBox);
  if (isTrue) {
    console.log("huzzah!");
  } else {
    console.log("uhoh");
  }
});
// run once on page load

randomImage();
