console.log("Snooping around the files as usual, i see?");

const translations = {
  en: {
    message: "GREETINGS, USER",
    navHome: "Home",
    navProjects: "Projects",
    navContact: "Contact",
    about_title: "About Me",
    about_text: `I am João Pedro Pessôa Primo, but online, you probably know me as <strong>Saturnacy</strong>. Welcome to my webpage — I hope you enjoy your stay!<br><br>
    Ever since I was a kid, I've been fascinated by computers and their ability to create entire worlds and universes. That curiosity quickly turned into a passion for the science and development behind these incredible machines. Today, I'm pursuing a Computer Science degree at <strong>CESAR School</strong>, turning that passion into a career.`,
    interests_title: "Interests",
    interests_text: `I absolutely love video games — they've shaped who I am in more ways than I can describe. My mission is to share that love with the world and help others see the beauty in interactive experiences. If I had to choose a favorite, it would be the timeless sandbox of <strong>Minecraft</strong>, a game that never stops inspiring creativity.<br><br>
    When I'm not coding or gaming, you'll probably find me indulging in my other hobbies: enjoying good food (especially <strong>popcorn</strong>), exploring water parks, diving into historical conversations, or simply observing the wonderful wildlife on this planet.`,
    funfact_title: "Fun Fact",
    funfact_text: `I'm not actually from Saturn (I just moved there). I was born and raised on <strong>Earth</strong> — specifically in the South American country known as <strong>Brazil</strong>.`
  },
  pt: {
    message: "SAUDAÇÕES, USUÁRIO",
    navHome: "Início",
    navProjects: "Projetos",
    navContact: "Contato",
    about_title: "Sobre Mim",
    about_text: `Eu sou João Pedro Pessôa Primo, mas online, você provavelmente me conhece como <strong>Saturnacy</strong>. Bem-vindo ao meu site — espero que você aproveite a visita!<br><br>
    Desde criança, sempre fui fascinado por computadores e pela capacidade que eles têm de criar mundos e universos inteiros. Essa curiosidade rapidamente se transformou em uma paixão pela ciência e pelo desenvolvimento por trás dessas máquinas incríveis. Hoje, estou cursando Ciência da Computação na <strong>CESAR School</strong>, transformando essa paixão em carreira.`,
    interests_title: "Interesses",
    interests_text: `Eu sou absolutamente apaixonado por videogames — eles moldaram quem eu sou de maneiras que mal consigo descrever. Minha missão é compartilhar esse amor com o mundo e ajudar outras pessoas a enxergar a beleza das experiências interativas. Se eu tivesse que escolher um favorito, seria o atemporal sandbox <strong>Minecraft</strong>, um jogo que nunca deixa de inspirar criatividade.<br><br>
    Quando não estou programando ou jogando, você provavelmente vai me encontrar curtindo outros hobbies: apreciando uma boa comida (especialmente <strong>pipoca</strong>), explorando parques aquáticos, mergulhando em conversas sobre história ou simplesmente observando a maravilhosa vida selvagem deste planeta.`,
    funfact_title: "Curiosidade",
    funfact_text: `Na verdade, eu não sou de Saturno (me mudei pra lá recentemente). Eu nasci e cresci na <strong>Terra</strong> — mais especificamente no país sul-americano conhecido como <strong>Brasil</strong>.`
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
