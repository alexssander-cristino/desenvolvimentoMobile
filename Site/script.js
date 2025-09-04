const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

hamburger.addEventListener('click', () => {
    nav.classList.toggle('show');
});


if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service-worker.js')
  .then(reg => console.log('Service Worker registrado', reg))
  .catch(err => console.log('Erro ao registrar SW', err));
}
