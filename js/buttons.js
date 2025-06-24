/* ---------------------------------------------------------
1. Functions
----------------------------------------------------------*/

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
        let img = i.querySelector('img');
        if (img) {
            let link = `https://picsum.photos/id/${randomNumber()}/200`;
            img.src = link;

            img.onerror = function () {
                this.onerror = null;
                this.src = `https://picsum.photos/id/${randomNumber()}/200`;
            };
        }
    }
}

// Attach click-to-remove behavior on selected images
function addEvent() {
    let allAddedImg = document.querySelectorAll('.selected_image');
    allAddedImg.forEach(img => {
        img.addEventListener('click', (e) => {
            const srcToRemove = e.target.src;
            e.target.remove();
            selectedImages = selectedImages.filter(src => src !== srcToRemove);
            console.log('Updated selectedImages:', selectedImages);
        });
    });
}

// Check if entered email is valid and clean up UI
function emailChecker(GivenEmail) {
    let value = GivenEmail.value.trim();
    if (value === '' || !isValidEmail(GivenEmail.value)) {
        GivenEmail.className = 'noAddress';
        GivenEmail.placeholder = `Required Email Address*`;
        return false;
    } else {
        email = GivenEmail.value;
        enteredEmail.classList.remove('noAddress');
        enteredEmail.placeholder = `Email Address`;
        enteredEmail.value = ``;
        return true;
    }
}


/* ---------------------------------------------------------
2. Global Variables
----------------------------------------------------------*/

let email = '';
let selectedImages = [];

let imageGrid = document.querySelectorAll('.image');
let imageDisplay = document.querySelector('#image-display');
let refresh = document.querySelector('#refresh');
let enteredEmail = document.querySelector('#email-for-image');
let completeSelect = document.querySelector('#submit-choice');
let sameEmail = document.querySelector('#same-email');
let linkedEmail = document.querySelector('#first-linked-email');
let changedEmail = document.querySelector('#email-wrapper');
let overallChoice = document.querySelector('#overall-choice');


/* ---------------------------------------------------------
3. Image Selection & Click Handling
----------------------------------------------------------*/

// Click image to select it
for (let i of imageGrid) {
    i.addEventListener('click', (e) => {
        let choice = e.target.src;
        let randomImageNumber = randomNumber();

        e.target.onerror = () => {
            e.target.src = `https://picsum.photos/id/${randomNumber()}/200`;
        }

        e.target.src = `https://picsum.photos/id/${randomImageNumber}/200`;
        selectedImages.push(choice);
        imageDisplay.innerHTML += `<img src="${choice}" class="selected_image">`;
        addEvent();

        console.log(choice);
    });
}

// Click on image in selected section to remove
imageDisplay.addEventListener('click', (e) => {
    if (e.target.classList.contains('selected_image')) {
        const srcToRemove = e.target.src;
        e.target.remove();
        selectedImages = selectedImages.filter(src => src !== srcToRemove);
        console.log('Updated selectedImages:', selectedImages);
    }
});


/* ---------------------------------------------------------
4. Email
----------------------------------------------------------*/

completeSelect.addEventListener('click', () => {
    const isValid = emailChecker(enteredEmail);

    if (!isValid) {
        enteredEmail.className = `noAddress`;
        enteredEmail.value = ``;
        enteredEmail.placeholder = `Invalid Email Address*`;
    } else {
        completeSelect.style.display = `none`;

        const diffEmailBtn = document.createElement('button');
        diffEmailBtn.textContent = `Use Different Email?`;
        diffEmailBtn.id = `Different-Email`;
        completeSelect.parentNode.appendChild(diffEmailBtn);

        sameEmail.style.display = `flex`;
        linkedEmail.innerHTML += `<p>These images are linked to ${email}</p><button id="send-email">Send</button>`;
        selectedImages.forEach(src => {
            overallChoice.innerHTML += `<img src="${src}">`;
        });

        imageDisplay.innerHTML = ``;
        selectedImages = [];

        sameEmail.addEventListener('click', () => {
            if (selectedImages.length === 0) {
                console.log("ccd");
                return;
            }

            selectedImages.forEach(src => {
                overallChoice.innerHTML += `<img src="${src}">`;
            });

            imageDisplay.innerHTML = ``;
            selectedImages = [];
        });

        diffEmailBtn.addEventListener('click', () => {
            const isValid = emailChecker(enteredEmail);

            if (!isValid) {
                enteredEmail.className = `noAddress`;
                enteredEmail.value = ``;
                enteredEmail.placeholder = `Invalid Email Address`;
            } else if (selectedImages.length === 0) {
                alert("Please select at least ONE image");
                return;
            } else {
                changedEmail.innerHTML += `<div class="newEmail"><p>These images are linked to ${email}</p><button id="send-email">Send</button></div>
                                            <div class="DiffEmailImg"></div>`;
                let newEmailImg = document.querySelector('.DiffEmailImg');
                selectedImages.forEach(src => {
                    newEmailImg.innerHTML += `<img src="${src}">`;
                });

                imageDisplay.innerHTML = ``;
                selectedImages = [];
            }
        });
    }
});

// Remove image from submitted image group (first email)
overallChoice.addEventListener('click', (e) => {
    if (e.target.tagName === `IMG`) {
        e.target.remove();
        if (overallChoice.innerHTML === ``) {
            linkedEmail.innerHTML = ``;
        }
    }
});

// // Remove image from second email image group
// changedEmailContent.addEventListener('click', (e) => {
//     if (e.target.tagName === 'IMG') {
//         e.target.remove();
//         if (changedEmailContent.innerHTML === ``) {
//             changedEmail.innerHTML = ``;
//         }
//     }
// });


/* ---------------------------------------------------------
5. Runs once on page load
----------------------------------------------------------*/

randomImage();
