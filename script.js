// Function to play background music (ensuring autoplay works)
let backgroundMusic = new Audio('audio/from-the-start-(meowfey).mp3');
backgroundMusic.loop = true;

// Attempt autoplay on user interaction (for browsers that block autoplay)
function tryPlayMusic() {
    if (backgroundMusic.paused) {
        backgroundMusic.play().catch(() => {
            console.warn("Autoplay blocked, waiting for user interaction.");
        });
    }
}

// Ensure music attempts to start on load but waits for interaction if needed
window.addEventListener("load", function () {
    tryPlayMusic();
});

// Also allow music to start when user clicks anywhere
document.addEventListener("click", tryPlayMusic);


// Attempt autoplay on page load
window.addEventListener("load", function () {
    backgroundMusic.muted = true; // Mute to prevent autoplay blocking
    let playPromise = backgroundMusic.play();

    if (playPromise !== undefined) {
        playPromise.then(() => {
            backgroundMusic.muted = false; // Unmute once playback starts
        }).catch(error => {
            console.warn("Autoplay blocked, waiting for user interaction.");
        });
    }
});

// Function to manually play music when clicking "Yes"
function playMusic() {
    if (backgroundMusic.paused || backgroundMusic.muted) {
        backgroundMusic.muted = false; // Unmute if muted
        backgroundMusic.play().catch(error => console.error("Error playing music:", error));
    }
}


// Function to play button sound effect
function playButtonSound(type) {
    let soundFile = type === 'yes' ? 'audio/yes-button.mp3' : 'audio/no-button.mp3';
    let soundEffect = new Audio(soundFile);
    soundEffect.play();
}

const noMessages = [
    "You sure?",
    "Really sure? 🥺",
    "Think again... 😢",
    "Are you absolutely sure? 😭",
    "Don't break my heart... 💔",
    "Last chance! 😭"
];

let noClickCount = 0; 


// Function to handle button clicks
function selectOption(option) {
    if (option === 'yes') {
        playButtonSound('yes');
        flashRainbowColors(function () {
            document.getElementById('question').style.display = 'none';
        });
        setTimeout(() => {
            window.location.href = "valentine.html"; // Chuyển trang sau 1 giây
        }, 1000);
    } else if (option === 'no') {
        playButtonSound('no');
        document.getElementById('no-button').innerText = noMessages[noClickCount];
        var yesButton = document.getElementById('yes-button');
        var currentFontSize = window.getComputedStyle(yesButton).getPropertyValue('font-size');
        var newSize = parseFloat(currentFontSize) * 2;
        yesButton.style.fontSize = newSize + 'px';

        noClickCount = (noClickCount + 1) % noMessages.length;
    } else {
        alert('Invalid option!');
    }
}


// Function to flash rainbow colors and then execute a callback function
function flashRainbowColors(callback) {
    var colors = ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#9400d3'];
    var i = 0;
    var interval = setInterval(function () {
        document.body.style.backgroundColor = colors[i];
        i = (i + 1) % colors.length;
    }, 200);
    setTimeout(function () {
        clearInterval(interval);
        document.body.style.backgroundColor = '';
        if (callback) {
            callback();
        }
    }, 2000);
}

// Function to display cat.gif initially
function displayCat() {
    var imageContainer = document.getElementById('image-container');
    var catImage = new Image();
    catImage.src = 'cat.gif';
    catImage.alt = 'Cat';
    catImage.onload = function () {
        imageContainer.appendChild(catImage);
    };
}

// Function to display cat-heart.gif
function displayCatHeart() {
    document.getElementById('image-container').innerHTML = '';
    var imageContainer = document.getElementById('image-container');
    var catHeartImage = new Image();
    catHeartImage.src = 'cat-heart.gif';
    catHeartImage.alt = 'Cat Heart';
    catHeartImage.onload = function () {
        imageContainer.appendChild(catHeartImage);
        document.getElementById('options').style.display = 'none';
    };
}


// Function to create floating hearts effect
function createHearts() {
    setInterval(() => {
        let heart = document.createElement("div");
        heart.innerHTML = "❤️";
        heart.classList.add("heart");
        document.body.appendChild(heart);

        let startX = Math.random() * window.innerWidth;
        let startY = window.innerHeight;
        heart.style.left = startX + "px";
        heart.style.top = startY + "px";

        setTimeout(() => {
            heart.remove();
        }, 2000);
    }, 300);
}

// Display the cat.gif initially
displayCat();
