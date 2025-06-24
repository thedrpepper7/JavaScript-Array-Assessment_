// checking the email address is valid

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// returning a random number to select the image from the website

function randomNumber() {
    let number = (Math.floor((Math.random() * 1000))) + 1;
    return(number);
}

// function that loops through and assigns a random image 

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

// function im going to run every time the image is selected so it can be deleted / has a manipulatable class name

function addEvent() {
    let allAddedImg = document.querySelectorAll('.selected_image');
    allAddedImg.forEach(img => {
        img.addEventListener('click', (e) => {
            const srcToRemove = e.target.src;

            // Remove the image from before
            e.target.remove();

            // Remove the src from the section below
            selectedImages = selectedImages.filter(src => src !== srcToRemove);

            console.log('Updated selectedImages:', selectedImages);
        });
    });
}


// grid containing the img tags

let imageGrid = document.querySelectorAll('.image');

// where the images will be saved to
let imageDisplay = document.querySelector('#image-display');

// refresh button 

let refresh = document.querySelector('#refresh');

refresh.addEventListener('click', ()=>{
    randomImage();
})



// email

let email = '';

// text box where email was entered
let enteredEmail = document.querySelector('#email-for-image');

// complete selection button
let completeSelect = document.querySelector('#submit-choice');

// use same email button (appears only after valid email give)
let sameEmail = document.querySelector('#same-email')

// will display the entered email above the selection
let linkedEmail = document.querySelector('#first-linked-email');


//replace thjis with a completely new div each "different email" chosen
// where the changed email selection will go 
const changedEmail = document.querySelector('#second-linked-email');

// where the second selection will go
const changedEmailContent = document.querySelector('#changed-email-overall');


// the image selection

let overallChoice = document.querySelector('#overall-choice');
let selectedImages = [];


for (let i of imageGrid) {
    i.addEventListener('click', (e)=> {
        let choice = e.target.src;
        let randomImageNumber = randomNumber();
        
        e.target.onerror = () => {
            e.target.src = `https://picsum.photos/id/${randomNumber()}/200`
        }

        e.target.src = `https://picsum.photos/id/${randomImageNumber}/200`;

        selectedImages.push(choice);
        imageDisplay.innerHTML += `<img src="${choice}" class="selected_image">`;
        addEvent();

        console.log(choice);
    })
}

// function checks the email and returns true when valid

function emailChecker(GivenEmail) {
    let value = GivenEmail.value.trim();
    if (value === '' || (!isValidEmail(GivenEmail.value))) {
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

// waiting on the complete selection button to check the email

completeSelect.addEventListener('click', ()=> {
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

        diffEmailBtn.addEventListener('click', ()=> {
            const isValid = emailChecker(enteredEmail);
            if (!isValid) {
                enteredEmail.className = `noAddress`;
                enteredEmail.value = ``;
                enteredEmail.placeholder = `Invalid Email Address`;
            } else if (selectedImages.length === 0) {
                alert("Please select at least ONE image");
                return;
            } else {
                changedEmail.innerHTML += `<p>These images are linked to ${email}</p><button id="send-email">Send</button>`;
                selectedImages.forEach(src => {
                changedEmailContent.innerHTML += `<img src="${src}">`;
                });
                imageDisplay.innerHTML = ``;
                selectedImages = [];
                diffEmailBtn.style.display = `none`;
                sameEmail.style.display = `none`;
                enteredEmail.style.display = `none`;}
             
            
        })
    }
})


// choice to remove the image from the selection

overallChoice.addEventListener('click', (e) =>{
    if (e.target.tagName === `IMG`) {
        e.target.remove();
        if (overallChoice.innerHTML === ``) {
            linkedEmail.innerHTML = ``;
        }
    }
})

changedEmailContent.addEventListener('click', (e)=>{
    if (e.target.tagName === 'IMG') {
        e.target.remove();
        if (changedEmailContent.innerHTML === ``){
            changedEmail.innerHTML = ``;
        }
    }
})



// running once for page load

randomImage();
