document.addEventListener("DOMContentLoaded", function () {
    let audio = document.getElementById("bg-music");
    audio.volume = 1.0;

    // Cố gắng phát nhạc ngay khi tải trang
    let playPromise = audio.play();
    if (playPromise !== undefined) {
        playPromise.catch(() => {
            console.warn("Autoplay bị chặn. Đợi người dùng click.");
        });
    }

    // Nếu autoplay bị chặn, phát nhạc khi người dùng click
    document.addEventListener("click", function () {
        if (audio.paused) {
            audio.play();
        }
    });
});

// Hiển thị GIF trái tim
function displayValentineGif() {
    let imageContainer = document.getElementById('image-container');
    let gifImage = document.createElement("img");
    gifImage.src = "cat-heart.gif"; // Đảm bảo file ảnh đúng tên
    gifImage.alt = "Valentine Cat";
    imageContainer.appendChild(gifImage);
}

// Thêm đoạn text chúc mừng
function displayMessage() {
    let textContainer = document.createElement("div");
    textContainer.id = "message";
    textContainer.innerHTML = "<h2>Yay! 💖 You're my Valentine! 🎉</h2><p>Wishing you a day filled with love and happiness!</p>";
    textContainer.style.textAlign = "center";
    textContainer.style.fontSize = "24px";
    textContainer.style.color = "#ff66b2";
    textContainer.style.marginTop = "20px";

    setTimeout(() => {
        document.body.appendChild(textContainer);
    }, 1000);
}

// Tạo hiệu ứng trái tim bay
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

// Khi trang tải xong, chạy hiệu ứng
window.onload = function () {
    displayMessage();
    createHearts();
};
