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

  // Load saved preference
  if (currentTheme) {
    document.body.classList.add(currentTheme + '-mode');
    if (currentTheme === 'light') {
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

  toggleSwitch.addEventListener('change', switchTheme, false);

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

  const cards = document.querySelectorAll('.card, .resume-card, .marcitech-card');
  cards.forEach(card => observer.observe(card));
});