// Elements
const envelope = document.getElementById("envelope-container");
const letter = document.getElementById("letter-container");
const noBtn = document.getElementById("no-button");
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

// Responsive scaling: compute scale based on design size (1200x800)
function updateScale(){
    const designW = 1200;
    const designH = 800; // 3/2 aspect ratio -> 1200x800
    const scaleW = window.innerWidth / designW;
    const scaleH = window.innerHeight / designH;
    const scale = Math.min(scaleW, scaleH, 1);
    document.documentElement.style.setProperty('--scale', scale);
}

// Run on load and resize
updateScale();
window.addEventListener('resize', updateScale);
window.addEventListener('orientationchange', updateScale);

// Logic to make Yes button interactive

yesBtn.style.position = "relative"
yesBtn.style.transformOrigin = "center center";
yesBtn.style.transition = "transform 0.3s ease";



// Yes button is clicked

yesBtn.addEventListener("click", () => {
    title.textContent = "Of course you will!";
    dogImg.src = "duck_butt_slap.gif";
    document.querySelector(".letter-window").classList.add("final");
    buttons.style.display = "none";
    finalText.style.display = "block";
    
    // Remove the arrow hint if it exists
    const arrowHint = document.getElementById("arrow-hint");
    if (arrowHint) {
        arrowHint.remove();
    }
});


// Runaway No Button
let moveCount = 0;
let hasMovedOnce = false;

function moveNoButton() {
    const letterWindow = document.querySelector(".letter-window");
    const letterRect = letterWindow.getBoundingClientRect();
    const noBtnRect = noBtn.getBoundingClientRect();
    
    const borderWidth = 3;
    const padding = 15;
    
    // Calculate bounds for the button position (left/top coordinates)
    const minLeftX = letterRect.left + borderWidth + padding;
    const maxLeftX = letterRect.right - borderWidth - padding - noBtnRect.width;
    const minTopY = letterRect.top + borderWidth + padding;
    const maxTopY = letterRect.bottom - borderWidth - padding - noBtnRect.height;
    
    // Generate random position within bounds
    const randX = minLeftX + Math.random() * (maxLeftX - minLeftX);
    const randY = minTopY + Math.random() * (maxTopY - minTopY);
    
    // Switch to fixed positioning on first trigger
    if (noBtn.style.position !== "fixed") {
        noBtn.style.position = "fixed";
        
        // Center the yes button when no button first moves
        yesBtn.style.margin = "0 auto";
    }
    
    noBtn.style.left = randX + "px";
    noBtn.style.top = randY + "px";
    
    // Increment move count
    moveCount++;
    
    // After 10 moves, change the image and text
    if (moveCount === 3) {
        dogImg.src = "sus.gif";
        title.textContent = "Where you clicking?";
        
        // Create arrow and text pointing to Yes button
        const arrow = document.createElement("p");
        arrow.id = "arrow-hint";
        arrow.style.textAlign = "center";
        arrow.style.fontSize = "25px";
        arrow.style.color = "#333";
        arrow.style.marginTop = "10px";
        arrow.innerHTML = "Yes is right here\
        <br>|<br>|<br>|<br>\\/";
        
        // Insert the arrow after the dog image
        dogImg.parentNode.insertBefore(arrow, dogImg.nextSibling);
    }
}

noBtn.addEventListener("mouseenter", moveNoButton);