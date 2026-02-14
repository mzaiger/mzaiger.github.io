// components.js
const headerHTML = `
<header>
  <div class="header-main">
    <div class="logo-container"></div>
    <div class="theme-switch-wrapper">
      <span>Dark</span>
      <label class="theme-switch" for="checkbox">
        <input type="checkbox" id="checkbox" />
        <div class="slider"></div>
      </label>
      <span>Light</span>
    </div>
    <nav>
      <a href="index.html">Home</a>
      <a href="resume.html">Resume</a>
      <a href="projects.html">Side Projects</a>
      <a href="marcitech.html">Old Site</a>
    </nav>
  </div>
</header>`;

document.body.insertAdjacentHTML('afterbegin', headerHTML);

const toggleSwitch = document.querySelector('#checkbox');
  const currentTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedTheme = localStorage.getItem('theme');


if (savedTheme) {
  document.body.classList.toggle('light-mode', savedTheme === 'light');
  toggleSwitch.checked = savedTheme === 'light';
} else {
  if (!systemPrefersDark) {
    document.body.classList.add('light-mode');
    toggleSwitch.checked = true;
  }
}


  function switchTheme(e) {
    if (e.target.checked) {
      document.body.classList.add('light-mode');
      localStorage.setItem('theme', 'light');
    } else {
      document.body.classList.remove('light-mode');
      localStorage.setItem('theme', 'dark');
    }    
  }

  toggleSwitch.addEventListener('change', switchTheme);

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
  if (!localStorage.getItem('theme')) {
    if (e.matches) {
      document.body.classList.remove('light-mode');
      toggleSwitch.checked = false;
    } else {
      document.body.classList.add('light-mode');
      toggleSwitch.checked = true;
    }
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const observerOptions = {
    threshold: 0.1 
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, observerOptions);

  const cards = document.querySelectorAll('.card, .resume-card, .marcitech-card, .project-card');
  cards.forEach(card => observer.observe(card));
});

// Active Navigation State
function setActiveNav() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('nav a');
  
  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage || 
        (currentPage === '' && linkPage === 'index.html') ||
        (currentPage === '/' && linkPage === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

setActiveNav();