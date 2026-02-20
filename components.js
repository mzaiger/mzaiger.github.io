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
  // 1. Scroll Progress Bar Logic
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  const scrollProgressBar = document.getElementById("scrollProgress");
  if (scrollProgressBar) {
      scrollProgressBar.style.width = scrolled + "%";
  }

  // 2. Back to Top Button Logic
  const btt = document.getElementById("backToTop");
  if (btt) {
      if (winScroll > 300) {
        btt.classList.add("show");
      } else {
        btt.classList.remove("show");
      }
  }
});

// Back to Top Click Event
document.body.addEventListener('click', function(e) {
  if(e.target && e.target.id === 'backToTop') {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const iframe = document.getElementById('myFrame');
  const loadingBar = document.querySelector('.loading-bar');

  if (iframe && loadingBar) {
    // 1. Start the bar moving to give immediate feedback
    setTimeout(() => {
      loadingBar.style.width = '30%';
    }, 100);

    // 2. Move it further mid-way through
    setTimeout(() => {
      loadingBar.style.width = '70%';
    }, 1000);

    // 3. When the iframe is fully loaded
    iframe.onload = () => {
      loadingBar.style.width = '100%';
      iframe.style.opacity = '1'; // Shows the iframe (matches your CSS transition)
      
      // Hide the bar after it hits 100%
      setTimeout(() => {
        loadingBar.classList.add('fade-out');
      }, 300);
    };
  }

  // --- NEW FEATURE: Typewriter Effect ---
  const typeWriterElement = document.getElementById('typewriter-text');
  if (typeWriterElement) {
    const textToType = typeWriterElement.textContent;
    let i = 0;
    typeWriterElement.innerHTML = ''; // Clear it first
    
    function typeWriter() {
      if (i < textToType.length) {
        typeWriterElement.innerHTML += textToType.charAt(i);
        i++;
        setTimeout(typeWriter, 120); // Adjust speed of typing here
      }
    }
    
    // Start typing after a short delay so it syncs with page load animations
    setTimeout(typeWriter, 600); 
  }

});


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