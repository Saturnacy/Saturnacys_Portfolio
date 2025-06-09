console.log("Snooping around the files as usual, i see?");

const translations = {
  en: {
    message: "PROJECTS",
    subtitle: "Check out some of the projects I've developed or contributed to over time!",
    vp_description: `<em>Vida Pet</em> is a comprehensive, Portuguese quality-of-life program designed to assist pet owners in effectively managing the well-being of their animals.
    <br><br>
    The platform offers a variety of tools, including pet data, vaccination calendar and health objectives registration, and tailored recommendations for toys, physical activities, and nutrition — customized according to the pet's age and species.
    <br><br>
    If you're looking for a simpler way to manage your pet's needs, give <em>Vida Pet</em> a try!`,
    
    tloe_description: `<em>The Legend of Erick</em> is a short 2D puzzle game created in Bitsy, designed for retro gaming enthusiasts. You play as a young knight on a quest to defeat a powerful demon lurking in a vast, mysterious castle.
    <br><br>
    Inspired by classic 1980s puzzle-adventure titles like <em>The Legend of Zelda</em>, the game features three carefully crafted puzzles, hidden secrets, and a dynamic final boss that can lead to multiple endings — depending on the choices you make.
    <br><br>
    If you're a fan of old-school gameplay and want to see how far Bitsy can be pushed, <em>The Legend of Erick</em> is a bite-sized but memorable adventure worth exploring!`,

    rdm_description: `<em>Recife de Memórias</em> is an interactive project developed in Python and Arduino that combines physical and digital elements to help elderly players, especially those with dementia or Alzheimer's, reconnect with the history of Recife Antigo.
    <br><br>
    Through sensory-rich cues, like sounds and a map of the island, players recall five cultural landmarks by listening to brief descriptions and selecting the matching colored buttons, then repeating the sequence to stimulate memory and attention.
    <br><br>
    <em>Recife de Memórias</em> is a meaningful blend of cognitive stimulation and cultural storytelling — a journey through memory worth taking!`
  },
  pt: {
    message: "PROJETOS",
    subtitle: "Confira alguns dos projetos que desenvolvi ou contribuí ao longo do tempo!",
    vp_description: `<em>Vida Pet</em> é um programa completo, focado na qualidade de vida, desenvolvido em português para ajudar tutores a cuidarem melhor do bem-estar dos seus animais.
    <br><br>
    A plataforma oferece diversas ferramentas, incluindo cadastro de dados do pet, calendário de vacinação, registro de metas de saúde e recomendações personalizadas de brinquedos, atividades físicas e nutrição — tudo adaptado à idade e espécie do animal.
    <br><br>
    Se você procura uma maneira mais simples de gerenciar as necessidades do seu pet, experimente o <em>Vida Pet</em>!`,
    
    tloe_description: `<em>The Legend of Erick</em> é um jogo curto de quebra-cabeça em 2D, criado no Bitsy, feito para os entusiastas de jogos retrô. Você joga como um jovem cavaleiro em uma missão para derrotar um poderoso demônio escondido em um vasto e misterioso castelo.
    <br><br>
    Inspirado em jogos dos anos 80 como <em>The Legend of Zelda</em>, o jogo traz três quebra-cabeças cuidadosamente elaborados, segredos escondidos e um chefe final dinâmico que pode levar a múltiplos finais — tudo depende das escolhas que você fizer.
    <br><br>
    Se você é fã de jogabilidade à moda antiga e quer descobrir até onde o Bitsy pode chegar, <em>The Legend of Erick</em> é uma aventura compacta, mas inesquecível, que vale a pena explorar!`,

    rdm_description: `<em>Recife de Memórias</em> é um projeto interativo desenvolvido em Python e Arduino que combina elementos físicos e digitais para ajudar pessoas idosas, especialmente aquelas com demência ou Alzheimer, a se reconectarem com a história do Recife Antigo.
    <br><br>
    Por meio de estímulos sensoriais, como sons e um mapa da ilha, os jogadores relembram cinco pontos culturais ao ouvir breves descrições e selecionar os botões coloridos correspondentes, repetindo depois a sequência como forma de estimular a memória e a atenção.
    <br><br>
    <em>Recife de Memórias</em> é uma combinação significativa de estímulo cognitivo e narrativa cultural — uma viagem pela memória que vale a pena ser vivida!`
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
