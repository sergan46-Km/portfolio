// Détecte si on est dans un sous-dossier /pages/
// Compatible file://, Windows et serveur web
const pathname = window.location.pathname.replace(/\\/g, '/');
const inSubfolder = pathname.includes('/pages/');
const base = inSubfolder ? '../' : '';
const pagesBase = inSubfolder ? '' : 'pages/';

const navbarHTML = `
<nav id="navbar">
  <div class="nav-brand">
    <a href="${base}index.html" class="brand-link">Ali Kassim</a>
  </div>
  <ul class="nav-menu" role="list">
    <li><a href="${base}index.html"               class="nav-link" data-page="accueil">Accueil</a></li>
    <li><a href="${pagesBase}apropos.html"         class="nav-link" data-page="apropos">À propos</a></li>
    <li><a href="${pagesBase}formation.html"       class="nav-link" data-page="formation">Formations</a></li>
    <li><a href="${pagesBase}experience.html"      class="nav-link" data-page="experience">Expérience</a></li>
    <li><a href="${pagesBase}competences.html"     class="nav-link" data-page="competences">Compétences</a></li>
    <li><a href="${pagesBase}projets.html"         class="nav-link" data-page="projets">Projets</a></li>
    <li><a href="${pagesBase}cv.html"              class="nav-link" data-page="cv">CV</a></li>
    <li><a href="${pagesBase}contact.html"         class="nav-link" data-page="contact">Contact</a></li>
  </ul>
  <button class="hamburger" aria-label="Ouvrir le menu" aria-expanded="false">
    <span></span><span></span><span></span>
  </button>
</nav>
`;

// Injection dans le header
const header = document.getElementById('site-header');
if (header) header.innerHTML = navbarHTML;

// Lien actif selon data-page du body
const currentPage = document.body.dataset.page;
document.querySelectorAll('.nav-link').forEach(link => {
  if (link.dataset.page === currentPage) {
    link.classList.add('active');
  }
});

// Hamburger → croix
const hamburger = document.querySelector('.hamburger');
const navMenu   = document.querySelector('.nav-menu');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('active');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  });
}

// Ferme le menu au clic sur un lien
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', false);
  });
});

// Style renforcé au scroll (sans masquer la barre — reste cliquable)
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  nav?.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });