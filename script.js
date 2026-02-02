// Elements
const envelope = document.getElementById("envelope-container");
const letter = document.getElementById("letter-container");
const noBtn = document.querySelector(".no-btn");
const yesBtn = document.querySelector(".yes-btn");

const title = document.getElementById("letter-title");
const dogImg = document.getElementById("letter-dog");
const buttons = document.getElementById("letter-buttons");
const finalText = document.getElementById("final-text");

// Click Envelope

envelope.addEventListener("click", () => {
    envelope.style.display = "none";
    letter.style.display = "flex";
    
    setTimeout( () => {
        document.querySelector(".letter-window").classList.add("open");
    },50);
});

// Logic to make Yes button grow

let yesScale = 1;

yesBtn.style.position = "relative"
yesBtn.style.transformOrigin = "center center";
yesBtn.style.transition = "transform 0.3s ease";

noBtn.addEventListener("click", () => {
    yesScale += 2;

    if(yesBtn.style.position != "fixed") {
       yesBtn.style.position = "fixed";
       yesBtn.style.top = "50%";
       yesBtn.style.left = "50%";
       yesBtn.style.transform = `translate(-50%, -50%) scale(${yesScale})`;
    }else{
       yesBtn.style.transform = `translate(-50%, -50%) scale(${yesScale})`;
    }
});

// Yes button is clicked

yesBtn.addEventListener("click", () => {
    title.textContent = "LET'S GOOOOO!!!";
    dogImg.src = "Dog-wagging.gif";
    document.querySelector(".letter-window").classList.add("final");
    buttons.style.display = "none";
    finalText.style.display = "block";
});