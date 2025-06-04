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


// grid containing the img tags

let imageGrid = document.querySelectorAll('.image');

// where the images will be saved to
let imageDisplay = document.querySelector('#image-display');

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



// the image selection

let overallChoice = document.querySelector('#overall-choice');
let imagesum = '';

for (let i of imageGrid) {
    i.addEventListener('click', (e)=> {
        let choice = e.target.src;
        let randomImageNumber = randomNumber();
        
        e.target.onerror = () => {
            e.target.src = `https://picsum.photos/id/${randomNumber()}/200`
        }

        e.target.src = `https://picsum.photos/id/${randomImageNumber}/200`;

        imagesum += `<img src=${choice}>`;
        imageDisplay.innerHTML += `<img src="${choice}">`;
        console.log(choice);
    })
}

function emailCheck (email) {
    TrueEmail = false;
    if (email.value.trim() === '') {
        enteredEmail.className = 'noAddress';
        enteredEmail.placeholder = `Required Email Address*`
    } else if (!isValidEmail(email.value)) {
        enteredEmail.className = `noAddress`;
        enteredEmail.value = ``;
        enteredEmail.placeholder = `Invalid Email Address`;
    } else {
        TrueEmail = true;
    }
}


// the submit part for the email
function MadeChoice () {
    if (enteredEmail.value.trim() === '') {
        enteredEmail.className = 'noAddress';
        enteredEmail.placeholder = `Required Email Address*`;
    } else if (!isValidEmail(enteredEmail.value)){
        enteredEmail.className = 'noAddress';
        enteredEmail.value = ``;
        enteredEmail.placeholder = `Invalid Email Address*`
    } else {
        email = enteredEmail.value;
        enteredEmail.classList.remove('noAddress')
        enteredEmail.placeholder = `Email Address`;
        enteredEmail.value = '';
        console.log(email);
        completeSelect.innerHTML = `Different Email?`;
        completeSelect.className = `DifferentEmail`
        differentEmail = document.querySelector('.DifferentEmail');
        
        differentEmail.addEventListener('click', ()=>{
        email = enteredEmail.value 
        console.log(email);
    })

        sameEmail.style.display = `flex`;
        linkedEmail.innerHTML += `<p>These images are linked to ${email}</p><button id="send-email">Send</button>`;
        overallChoice.innerHTML += imagesum;
        imageDisplay.innerHTML = ``;
    }
    
}


completeSelect.addEventListener('click', ()=> {
    MadeChoice();
})

// inputting a different email



// running once for page load

randomImage();
