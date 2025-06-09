console.log("Snooping around the files as usual, i see?");

const translations = {
  en: {
    subtitle: "Want to see more of my work? Feel free to explore my socials through the links below:",
    navHome: "Home",
    navProjects: "Projects",
    navContact: "Contact",
    footer: "© 2025 João Pedro Pessôa Primo. All rights reserved.",
    message: "CONTACT"
  },
  pt: {
    subtitle: "Quer ver mais do meu trabalho? Sinta-se à vontade para explorar minhas redes sociais nos links abaixo:",
    navHome: "Início",
    navProjects: "Projetos",
    navContact: "Contato",
    footer: "© 2025 João Pedro Pessôa Primo. Todos os direitos reservados.",
    message: "CONTATO"
  }
};

function decryptMessage(text) {
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

decryptMessage(translations.en.message);


document.getElementById("langSwitch").addEventListener("change", function () {
    const lang = this.checked ? "pt" : "en";
    localStorage.setItem("preferredLang", lang);
    applyLanguage(lang);
});

function applyLanguage(lang) {
    const translation = translations[lang];
    for (const [id, text] of Object.entries(translation)) {
        const el = document.getElementById(id);
        if (el) el.innerHTML = text;
    }

    document.getElementById("langSwitch").checked = (lang === "pt");

    decryptMessage(translation.message);
}

window.addEventListener("DOMContentLoaded", () => {
    const storedLang = localStorage.getItem("preferredLang") || "en";
    applyLanguage(storedLang);
});

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
