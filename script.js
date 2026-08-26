const nav = document.querySelector('.nav-wrap');
const menuButton = document.querySelector('.menu-button');
const navLinks = document.querySelector('.nav-links');

window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 30));

menuButton.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.nav-links a').forEach(link => link.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
document.getElementById('year').textContent = new Date().getFullYear();

const showcaseImage = document.getElementById('showcase-image');
const showcaseCaption = document.getElementById('showcase-caption');
const showcaseStep = document.getElementById('showcase-step');
const showcaseTabs = [...document.querySelectorAll('.showcase-tab')];

function changeShowcase(tab) {
  const index = showcaseTabs.indexOf(tab);
  if (!showcaseImage || index < 0) return;
    document.querySelectorAll('.showcase-tab').forEach(item => item.classList.remove('active'));
    tab.classList.add('active');
    showcaseImage.classList.add('switching');
    setTimeout(() => {
      showcaseImage.src = tab.dataset.image;
      showcaseImage.alt = `Tela real do Documina: ${tab.textContent.trim()}`;
      showcaseCaption.textContent = tab.dataset.caption;
      showcaseStep.textContent = String(index + 1).padStart(2, '0');
      showcaseImage.classList.remove('switching');
    }, 180);
}

showcaseTabs.forEach(tab => {
  tab.addEventListener('click', event => {
    event.preventDefault();
    changeShowcase(tab);
  });
});

const counterReadUrl = 'https://counterapi.com/api/documina/download/windows64?readOnly=true&noFormatting=true';
const counterHitUrl = 'https://counterapi.com/api/documina/download/windows64?noFormatting=true';
const downloadCounts = document.querySelectorAll('.download-count');

function renderDownloadCount(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return;
  downloadCounts.forEach(element => {
    element.textContent = number.toLocaleString('pt-BR');
  });
}

fetch(counterReadUrl)
  .then(response => response.ok ? response.json() : Promise.reject())
  .then(data => renderDownloadCount(data.value))
  .catch(() => downloadCounts.forEach(element => element.textContent = '—'));

document.querySelectorAll('.download-link').forEach(link => {
  link.addEventListener('click', () => {
    fetch(counterHitUrl, { keepalive: true })
      .then(response => response.ok ? response.json() : Promise.reject())
      .then(data => renderDownloadCount(data.value))
      .catch(() => {});
  });
});
