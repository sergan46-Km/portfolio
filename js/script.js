/**
 * Animations et interactions du portfolio (sans librairie externe).
 */
(function () {
  'use strict';

  function initCursorGlow() {
    if (window.matchMedia('(hover: none)').matches) return;

    var glow = document.createElement('div');
    glow.className = 'cursor-glow';
    glow.setAttribute('aria-hidden', 'true');
    document.body.appendChild(glow);

    var targetX = 0;
    var targetY = 0;
    var currentX = 0;
    var currentY = 0;

    document.addEventListener('mousemove', function (e) {
      targetX = e.clientX;
      targetY = e.clientY;
    }, { passive: true });

    function animate() {
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      glow.style.transform = 'translate(' + (currentX - 200) + 'px, ' + (currentY - 200) + 'px)';
      requestAnimationFrame(animate);
    }
    animate();
  }

  function initScrollReveal() {
    var reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    reveals.forEach(function (el, index) {
      el.classList.add(index % 2 === 0 ? 'reveal-left' : 'reveal-right');
      observer.observe(el);
    });
  }

  function initFooter() {
    var footer = document.getElementById('site-footer');
    if (!footer || footer.textContent.trim()) return;
    footer.innerHTML = '<p>&copy; 2025 Ali Kassim — Portfolio</p>';
  }

  function initSkillPills() {
    var containers = document.querySelectorAll('.skill-tags--clickable');
    if (!containers.length) return;

    containers.forEach(function (container) {
      var explain = container.parentElement && container.parentElement.querySelector('.skill-explain');
      if (!explain) return;

      container.addEventListener('click', function (e) {
        var btn = e.target && e.target.closest && e.target.closest('.skill-pill');
        if (!btn || !container.contains(btn)) return;

        container.querySelectorAll('.skill-pill').forEach(function (b) {
          b.classList.toggle('is-selected', b === btn);
        });

        var title = btn.getAttribute('data-skill') || btn.textContent.trim();
        var titleEl = explain.querySelector('.skill-explain-title');
        var textEl = explain.querySelector('.skill-explain-text');

        if (titleEl) titleEl.textContent = title;
        if (textEl) textEl.textContent = 'À compléter : explique ce que tu as fait pour obtenir cette compétence.';
      });
    });
  }

  window.toggleFormation = function (btn) {
    var card = btn.closest('.formation-card, .experience-card, .project-card');
    if (!card) return;
    var isActive = card.classList.contains('active');
    var label = btn.querySelector('.formation-toggle-text, .toggle-label');

    card.classList.toggle('active', !isActive);
    if (label) label.textContent = isActive ? 'Voir plus' : 'Voir moins';
    btn.setAttribute('aria-expanded', !isActive ? 'true' : 'false');
  };

  window.toggleCompetence = function (trigger) {
    var card = trigger.closest('.skill-card, .competence-item');
    if (!card) return;
    var isActive = card.classList.contains('active');
    var label = trigger.classList.contains('toggle-label')
      ? trigger
      : card.querySelector('.toggle-label');

    card.classList.toggle('active', !isActive);
    if (label) label.textContent = isActive ? 'Voir plus' : 'Voir moins';
  };

  function initContactForm() {
    var form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = (form.querySelector('[name="name"]') || {}).value || '';
      var email = (form.querySelector('[name="email"]') || {}).value || '';
      var message = (form.querySelector('[name="message"]') || {}).value || '';
      var subject = encodeURIComponent('Contact portfolio — ' + name);
      var body = encodeURIComponent(
        'Nom : ' + name + '\nEmail : ' + email + '\n\n' + message
      );
      window.location.href = 'mailto:Kassim.ALI@etu.uca.fr?subject=' + subject + '&body=' + body;
    });
  }

  window.downloadCV = function (format) {
    var inPages = /\/pages\//.test(window.location.pathname);
    var base = inPages ? '../cv/' : 'cv/';
    var fileURL = format === 'pdf' ? base + 'can11.pdf' : base + 'cv_forma.jpg';
    var link = document.createElement('a');
    link.href = fileURL;
    link.download = 'CV_Ali_Kassim.' + format;
    link.click();
  };

  document.addEventListener('DOMContentLoaded', function () {
    initFooter();
    initCursorGlow();
    initScrollReveal();
    initSkillPills();
    initContactForm();
  });
})();
