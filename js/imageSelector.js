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

// will take the images from function below (addskeletonimg) and create divs for each

function SkeletonImg(email, images) {
  let skeleton = `
    <div class="SelectedImagesBlock ${sanitizeEmail(email)}">
        <p>These images were assigned to ${email}</p> <button class="deleteSelection" data-target="${sanitizeEmail(
    email
  )}">DELETE</button>
        ${images}
    </div>
    <button class="${sanitizeEmail(email)}">Send</button>`;
  return skeleton;
}

// will loop through the array adding the img to images to be returned to function above ^ (skeletonimg)
function addSkeletonImg(array) {
  let images = ``;
  for (let i = 0; i < array.length; i++) {
    images += `<img src="${array[i]}">`;
  }
  return images;
}

// gives back an email that can be class selected
function sanitizeEmail(email) {
  return email.replace(/[^a-zA-Z0-9_-]/g, "_");
}

// this adds previously entered emails to a dropdown box
function addEmailDropdown(email) {
  emailDropdown.innerHTML += `<option value="${email}">${email}</option>`;
}

// variables in order of appearance on the page

let selectedImages = [];
let previousEmails = [];

let imageHolder = document.querySelector("#imageholders");
let imageGrid = document.querySelectorAll(".image");
let refresh = document.querySelector("#refresh");

let imageChoiceDisplay = document.querySelector("#image-display");
let invalidSpan = document.querySelector("#invalidFirstEmail");
let emailInputBox = document.querySelector("#emailInput");

let completeChoice = document.querySelector("#submit-choice");
let emailDropdown = document.querySelector("#emailDropdown");

let imageOutputColumn = document.querySelector("#ImageOutputColumn");

// adding the images

imageHolder.addEventListener("click", (e) => {
  let src = e.target.src;

  if (e.target.tagName === "IMG" && !selectedImages.includes(src)) {
    selectedImages.push(src);
    imageChoiceDisplay.innerHTML += `<img src="${src}" class="imageRemover">`;
  }
});

// being able to remove the images

imageChoiceDisplay.addEventListener("click", (e) => {
  if (e.target.classList.contains("imageRemover")) {
    const imgsrc = e.target.src;
    e.target.remove();
    selectedImages = selectedImages.filter((item) => item !== imgsrc);
  }
});

// form submission on valid email entry

completeChoice.addEventListener("click", () => {
  let email = emailChecker(emailInputBox);
  if (email && selectedImages.length > 0) {
    const safeClass = sanitizeEmail(email);

    if (previousEmails.includes(email)) {
      let reuseEmail = document.querySelector(`.${safeClass}`);
      if (reuseEmail) {
        selectedImages.forEach((imgSrc) => {
          if (!reuseEmail.querySelector(`img[src="${imgSrc}"]`)) {
            reuseEmail.insertAdjacentHTML("beforeend", `<img src="${imgSrc}">`);
          } else {
            alert("You can't have two of the same image");
          }
        });
      }
    } else {
      addEmailDropdown(email);
      showHidden(imageOutputColumn);
      showHidden(emailDropdown);
      imageOutputColumn.innerHTML += SkeletonImg(
        email,
        addSkeletonImg(selectedImages)
      );
      previousEmails.push(email);
    }

    // Reset image selection
    selectedImages = [];
    imageChoiceDisplay.innerHTML = "";
  } else {
    alert("Make sure you enter a valid email and choose at least ONE image");
  }
});

// delete the block of images on output

imageOutputColumn.addEventListener("click", function (e) {
  if (e.target.classList.contains("deleteSelection")) {
    const targetClass = e.target.dataset.target;

    const block = document.querySelector(`.SelectedImagesBlock.${targetClass}`);
    if (block) {
      block.remove();
    }

    const sendBtn = document.querySelector(`button.${targetClass}`);
    if (sendBtn) {
      sendBtn.remove();
    }

    previousEmails = previousEmails.filter(
      (email) => sanitizeEmail(email) !== targetClass
    );

    if (imageOutputColumn.children.length === 0) {
      hide(imageOutputColumn);
    }
  }
});

// dropdown box allowing a previous email to be clicked instead of retyped

emailDropdown.addEventListener("click", (event) => {
  selectedValue = event.target.value;
  emailInputBox.value = selectedValue;
});

// run once on page load

randomImage();

refresh.addEventListener("click", () => {
  randomImage();
});
