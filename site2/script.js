const video = document.getElementById("bannerVideo");
    const canvas = document.getElementById("bgCanvas");
    const ctx = canvas.getContext("2d");

    function ajustarCanvas() {
      canvas.width = video.videoWidth / 10;  // reduzido para performance
      canvas.height = video.videoHeight / 10;
    }

    video.addEventListener("play", () => {
      ajustarCanvas();

      function desenhar() {
        if (!video.paused && !video.ended) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          requestAnimationFrame(desenhar);
        }
      }

      desenhar();
    });

const carousel = document.querySelector('.card-carousel');
const track = carousel.querySelector('.carousel-track');
const items = Array.from(track.children);
const gap = 16;
const itemWidth = items[0].offsetWidth + gap;

// Duplicar itens
items.forEach(item => {
    const clone = item.cloneNode(true);
    track.appendChild(clone);
});

let position = 0;
const trackWidth = track.scrollWidth / 2; // metade da track duplicada

function animate() {
    position += 1; // velocidade em pixels por frame
    if (position >= trackWidth) {
        position = 0; // reinicia suavemente
    }
    track.style.transform = `translateX(-${position}px)`;
    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);



const cards = document.querySelectorAll('.piloto-card');
const modal = document.getElementById('pilotoModal');
const modalImg = document.getElementById('modalImg');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const closeModal = document.getElementById('closeModal');

// dados dos pilotos com imagens e descrições
const pilotos = {
    "Keiichi Tsuchiya": {
        img: "image/keiichi.png",
        desc: `Keiichi Tsuchiya, conhecido como "Drift King", revolucionou o drift no Japão. 
        Pioneiro em técnicas avançadas de controle de carro em curvas, Tsuchiya participou de inúmeras competições e se tornou referência mundial na modalidade. 
        Sua abordagem combina precisão, velocidade e estilo, inspirando gerações de pilotos e entusiastas do drift.`
    },
    "Daigo Saito": {
        img: "image/daigo.png",
        desc: `Daigo Saito é famoso por seu estilo agressivo e suas vitórias em competições internacionais. 
        Reconhecido pela habilidade em manobras complexas e drifts de alta velocidade, ele se tornou um ícone no mundo do drift moderno, acumulando títulos e respeito global.`
    },
    "Ken Block": {
        img: "image/kenblock.png",
        desc: `Ken Block popularizou o drift com vídeos de Gymkhana, misturando drifts precisos e manobras radicais. 
        Seus vídeos virais mostraram como controlar o carro com maestria em ambientes desafiadores, tornando-o uma figura mundialmente conhecida no automobilismo e cultura do drift.`
    },
    "Chris Forsberg": {
        img: "image/chris.png",
        desc: `Chris Forsberg é campeão de Fórmula Drift e NHRA, conhecido por sua técnica impecável e consistência nas pistas. 
        Com anos de experiência e múltiplos títulos, ele é referência para pilotos que buscam excelência no drift competitivo.`
    }
};


// abrir modal ao clicar no card
cards.forEach(card => {
    card.addEventListener('click', () => {
        const piloto = card.querySelector('h4').innerText;
        modalTitle.innerText = piloto;
        modalDesc.innerText = pilotos[piloto].desc;
        modalImg.src = pilotos[piloto].img;
        modal.style.display = 'flex';
    });
});

// fechar modal ao clicar no X
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// fechar modal clicando fora do conteúdo
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});
