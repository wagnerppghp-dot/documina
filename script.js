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
document.querySelectorAll('.showcase-tab').forEach((tab, index) => {
  tab.addEventListener('click', () => {
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
  });
});
