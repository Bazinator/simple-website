console.log("JS loaded")


document.addEventListener('DOMContentLoaded', function() {
  
  // Active page highlighting
  const currentLocation = location.href;
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
    if (link.href === currentLocation) {
      link.classList.add('active');
    }
  });


  // Remove theme-loading once 'DomContentLoaded'
  requestAnimationFrame(() => {
    document.documentElement.classList.remove('theme-loading');
  })
  const darkModeToggle = document.getElementById('darkModeToggle');
  const isDarkMode = localStorage.getItem('darkMode') === 'true';

  // const for the images
  const githubPng = document.getElementById('github-png')
  const instaPng = document.getElementById('insta-png')
  const linkedinPng = document.getElementById('linkedin-png')

  const applyDarkMode = () => {
    document.documentElement.classList.add('dark-mode');
    darkModeToggle.classList.add('dark-mode');
    if (githubPng) githubPng.src = 'Assets/github-mark-white.png';
    if (instaPng) instaPng.src = 'Assets/instapngwhite.png';
    if (linkedinPng) linkedinPng.src = 'Assets/linkedinblack.png';
  }

  const applyLightMode = () => {
    document.documentElement.classList.remove('dark-mode');
    darkModeToggle.classList.remove('dark-mode');
    if (githubPng) githubPng.src = 'Assets/github-mark.png';
    if (instaPng) instaPng.src = 'Assets/instapng.png';
    if (linkedinPng) linkedinPng.src = 'Assets/linkedin.png';
  }

  // Set initial state
  if (isDarkMode) {
    applyDarkMode();
  } else {
    applyLightMode();
  }

  darkModeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.classList.contains('dark-mode');
    if (!isDark) {
      applyDarkMode();
      localStorage.setItem('darkMode', 'true');
    } else {
      applyLightMode();
      localStorage.setItem('darkMode', 'false');
    }
  });

  // Project card expansion functionality
  const projectCards = document.querySelectorAll('.project-card');
  const projectsGrid = document.getElementById('projectsGrid');
  const backdrop = document.getElementById('projectBackdrop');
  let currentlyExpanded = null;

  // Function to expand a project card
  function expandCard(card) {
    // Close any currently expanded card
    if (currentlyExpanded && currentlyExpanded !== card) {
      collapseCard(currentlyExpanded);
    }

    // Set the card as expanded
    card.setAttribute('data-expanded', 'true');
    card.classList.add('expanded');
    currentlyExpanded = card;

    // Show backdrop and initialize carousel
    if (backdrop) backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
    setupCarousel(card);
  }

  // Function to collapse a project card
  function collapseCard(card) {
    card.setAttribute('data-expanded', 'false');
    card.classList.remove('expanded');
    currentlyExpanded = null;

    // Hide backdrop and restore scroll
    if (backdrop) backdrop.classList.remove('active');
    projectsGrid.classList.remove('dimmed');
    document.body.style.overflow = '';

    // Focus back to the card
    card.focus();
  }

  // Add event listeners to project cards
  projectCards.forEach(card => {
    // Card click to expand
    card.addEventListener('click', (e) => {
      // Don't expand if clicking close button or if already expanded
      if (e.target.closest('.close-btn') || card.classList.contains('expanded')) {
        return;
      }
      expandCard(card);
    });

    // Close button click
    const closeBtn = card.querySelector('.close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        collapseCard(card);
      });
    }
  });

  // Backdrop click to close expanded card
  if (backdrop) {
    backdrop.addEventListener('click', () => {
      if (currentlyExpanded) {
        collapseCard(currentlyExpanded);
      }
    });
  }

  // Minimal carousel setup
  const initializedCarousels = new WeakSet();

  function setupCarousel(card) {
    const carousel = card.querySelector('.carousel');
    if (!carousel || initializedCarousels.has(carousel)) return;

    const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
    const dotsContainer = carousel.querySelector('.carousel-dots');
    if (slides.length === 0) return;

    let index = 0;

    // Create dot indicators
    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot';
        dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
        dot.addEventListener('click', (e) => {
          e.stopPropagation();
          index = i;
          update();
        });
        dotsContainer.appendChild(dot);
      });
    }

    function update() {
      slides.forEach((s, i) => {
        const active = i === index;
        s.classList.toggle('active', active);
        s.setAttribute('aria-hidden', String(!active));
        const img = s.querySelector('img');
        if (img) img.setAttribute('tabindex', active ? '0' : '-1');
      });

      // Update dots
      if (dotsContainer) {
        const dots = dotsContainer.querySelectorAll('.carousel-dot');
        dots.forEach((dot, i) => {
          dot.classList.toggle('active', i === index);
        });
      }
    }
    update();

    const prevBtn = carousel.parentElement.querySelector('.carousel-btn.prev');
    const nextBtn = carousel.parentElement.querySelector('.carousel-btn.next');

    function move(delta) {
      index = (index + delta + slides.length) % slides.length;
      update();
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        move(-1);
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        move(1);
      });
    }

    initializedCarousels.add(carousel);
  }

  // Escape key to close expanded card
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && currentlyExpanded) {
      collapseCard(currentlyExpanded);
    }
    // Arrow keys to navigate carousel when expanded
    if (currentlyExpanded) {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const prevBtn = currentlyExpanded.querySelector('.carousel-btn.prev');
        if (prevBtn) prevBtn.click();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        const nextBtn = currentlyExpanded.querySelector('.carousel-btn.next');
        if (nextBtn) nextBtn.click();
      }
    }
  });

  console.log('JS file loaded');
});