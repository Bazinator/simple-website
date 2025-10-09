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

    // Show backdrop and dim other cards
    backdrop.classList.add('active');
    //projectsGrid.classList.add('dimmed');

    // Disable body scroll
    document.body.style.overflow = 'hidden';

    // Focus the close button for accessibility
    const closeBtn = card.querySelector('.close-btn');
    if (closeBtn) {
      setTimeout(() => closeBtn.focus(), 100);
    }
  }

  // Function to collapse a project card
  function collapseCard(card) {
    card.setAttribute('data-expanded', 'false');
    card.classList.remove('expanded');
    currentlyExpanded = null;

    // Hide backdrop and restore other cards
    backdrop.classList.remove('active');
    projectsGrid.classList.remove('dimmed');

    // Re-enable body scroll
    document.body.style.overflow = '';

    // Focus back to the view more button
    const viewMoreBtn = card.querySelector('.view-more-btn');
    if (viewMoreBtn) {
      viewMoreBtn.focus();
    }
  }

  // Add event listeners to project cards
  projectCards.forEach(card => {
    const viewMoreBtn = card.querySelector('.view-more-btn');
    const closeBtn = card.querySelector('.close-btn');

    // View More button click
    if (viewMoreBtn) {
      viewMoreBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        expandCard(card);
      });
    }

    // Close button click
    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        collapseCard(card);
      });
    }
  });

  // Backdrop click to close expanded card
  backdrop.addEventListener('click', () => {
    if (currentlyExpanded) {
      collapseCard(currentlyExpanded);
    }
  });

  // Escape key to close expanded card
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && currentlyExpanded) {
      collapseCard(currentlyExpanded);
    }
  });

  console.log('JS file loaded');
});