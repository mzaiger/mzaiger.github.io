window.addEventListener('scroll', function () {
  const header = document.querySelector('header');

  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// components.js
const headerHTML = `
<header>
  <div class="header-main">
    <div class="logo-wrap">
      <div class="logo-container"></div>
      <div class="theme-switch-wrapper">
        <span>Dark</span>
        <label class="theme-switch" for="checkbox">
          <input type="checkbox" id="checkbox" />
          <div class="slider"></div>
        </label>
        <span>Light</span>
      </div>
    </div>
    <nav>
      <a href="index.html">Home</a>
      <a href="resume.html">Resume</a>
      <a href="projects.html">Side Projects</a>
      <a href="github.html">GitHub</a>
      <a href="marcitech.html">Old Site</a>
    </nav>
  </div>
</header>`;

document.body.insertAdjacentHTML('afterbegin', headerHTML);

// --- NEW FEATURES: Scroll Progress & Back to Top ---
const extrasHTML = `
  <div class="scroll-progress" id="scrollProgress"></div>
  <button id="backToTop" class="back-to-top" title="Go to top">↑</button>
`;
document.body.insertAdjacentHTML('beforeend', extrasHTML);

window.addEventListener('scroll', function () {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  const scrollProgressBar = document.getElementById("scrollProgress");
  if (scrollProgressBar) {
    scrollProgressBar.style.width = scrolled + "%";
  }

  const btt = document.getElementById("backToTop");
  if (btt) {
    if (winScroll > 300) {
      btt.classList.add("show");
    } else {
      btt.classList.remove("show");
    }
  }
});

document.body.addEventListener('click', function(e) {
  if (e.target && e.target.id === 'backToTop') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const iframe = document.getElementById('myFrame');
  const loadingBar = document.querySelector('.loading-bar');

  if (iframe && loadingBar) {
    setTimeout(() => loadingBar.style.width = '30%', 100);
    setTimeout(() => loadingBar.style.width = '70%', 1000);

    iframe.onload = () => {
      loadingBar.style.width = '100%';
      iframe.style.opacity = '1';

      setTimeout(() => {
        loadingBar.classList.add('fade-out');
      }, 300);
    };
  }

  const typeWriterElement = document.getElementById('typewriter-text');
  if (typeWriterElement) {
    const textToType = typeWriterElement.textContent;
    let i = 0;
    typeWriterElement.innerHTML = '';

    function typeWriter() {
      if (i < textToType.length) {
        typeWriterElement.innerHTML += textToType.charAt(i);
        i++;
        setTimeout(typeWriter, 120);
      }
    }

    setTimeout(typeWriter, 600);
  }
});

const toggleSwitch = document.querySelector('#checkbox');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedTheme = localStorage.getItem('theme');

if (savedTheme) {
  document.body.classList.toggle('light-mode', savedTheme === 'light');
  toggleSwitch.checked = savedTheme === 'light';
} else if (!systemPrefersDark) {
  document.body.classList.add('light-mode');
  toggleSwitch.checked = true;
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
    document.body.classList.toggle('light-mode', !e.matches);
    toggleSwitch.checked = !e.matches;
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('show');
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.card, .resume-card, .marcitech-card, .project-card')
    .forEach(card => observer.observe(card));
});

function setActiveNav() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('nav a');

  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

setActiveNav();

// Nav animation delays
navLinks = document.querySelectorAll('nav a');
navLinks.forEach((link, index) => {
  link.style.animationDelay = `${0.5 + index * 0.1}s`;
});
