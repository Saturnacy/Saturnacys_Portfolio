console.log("Snooping around the files as usual, i see?");

function decryptMessage() {
    const text = "PROJECTS";
    const chars = "!<>-_\\/[]{}—=+*^?#_";
    const messageElement = document.getElementById('message');
    let decryptIndex = 0;

    function scramble() {
        let output = "";
        for (let i = 0; i < text.length; i++) {
            if (i < decryptIndex) {
                output += text[i];
            } else {
                output += chars[Math.floor(Math.random() * chars.length)];
            }
        }
        messageElement.textContent = output;
        requestAnimationFrame(scramble);
    }

    function startDecrypt() {
        const interval = 300;

    function reveal() {
        if (decryptIndex < text.length) {
            decryptIndex++;
            setTimeout(reveal, interval);
        }
    }

    reveal();
}

scramble();
setTimeout(startDecrypt, 2000);
}

decryptMessage();

const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');

let width, height;
let stars = [];

function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function createStars(count) {
    stars = [];
    for (let i = 0; i < count; i++) {
        stars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 1.5,
            speed: Math.random() * 0.5 + 0.2,
            opacity: Math.random() * 0.7 + 0.3
        });
    }
}

createStars(150);

function animateStars() {
    ctx.clearRect(0, 0, width, height);

    for (let star of stars) {
        star.y += star.speed;
        if (star.y > height) {
            star.y = 0;
            star.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
    } 

    requestAnimationFrame(animateStars);
}

animateStars();

const slides = document.querySelectorAll('.project-box');
const dotsContainer = document.getElementById('dots');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

let currentIndex = 0;

slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
});

const dots = dotsContainer.querySelectorAll('button');

function showSlide(newIndex) {
    if (newIndex === currentIndex) return;

    slides[currentIndex].classList.remove('active');
    slides[newIndex].classList.add('active');

    dots[currentIndex].classList.remove('active');
    dots[newIndex].classList.add('active');

    currentIndex = newIndex;
}

function goToSlide(index) {
    showSlide(index);
}

function nextSlide() {
    const nextIndex = (currentIndex + 1) % slides.length;
    showSlide(nextIndex);
}

function prevSlide() {
    const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(prevIndex);
}

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

slides.forEach((slide, i) => {
    if (i === 0) {
        slide.classList.add('active');
    } else {
        slide.classList.remove('active');
    }
});
dots[0].classList.add('active');