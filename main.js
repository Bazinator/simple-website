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

  console.log('JS file loaded');
});