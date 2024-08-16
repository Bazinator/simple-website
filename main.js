console.log("JS LOaded")
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

  const isDarkMode = localStorage.getItem('darkMode') == 'true';

  // const for the images
  const githubPng = document.getElementById('github-png')
  const instaPng = document.getElementById('insta-png')
  const linkedinPng = document.getElementById('linkedin-png')



  const applyDarkMode = () => {
    document.documentElement.style.setProperty('--background-color', '#1a1a1a')
    document.documentElement.style.setProperty('--text-color', '#f0f0f0')
    document.documentElement.style.setProperty('--box-shadow-color', 'rgba(255, 255, 255, 0.1)')
    darkModeToggle.classList.add('dark-mode');
    if (githubPng) githubPng.src = 'Assets/github-mark-white.png';
    if (instaPng) instaPng.src = 'Assets/instapngwhite.png';
    if (linkedinPng) linkedinPng.src = 'Assets/linkedinblack.png';

    }
  const applyLightMode = () => {
    document.documentElement.style.setProperty('--background-color', 'rgb(255, 255, 255)')
    document.documentElement.style.setProperty('--text-color', 'rgb(0, 0, 0)')
    document.documentElement.style.setProperty('--box-shadow-color', 'rgba(0, 0, 0, 0.5)')
    darkModeToggle.classList.remove('dark-mode');
    if (githubPng) githubPng.src = 'Assets/github-mark.png';
    if (instaPng) instaPng.src = 'Assets/instapng.png';
    if (linkedinPng) linkedinPng.src = 'Assets/linkedin.png';
    
  }
  if (isDarkMode) {
    applyDarkMode();
  } else {
    applyLightMode();
  }
  darkModeToggle.addEventListener('click', () => {
    if (document.documentElement.style.getPropertyValue('--background-color') === 'rgb(255, 255, 255)' ) {
      applyDarkMode();
      localStorage.setItem('darkMode', 'true');
    } else {
      applyLightMode();
      localStorage.setItem('darkMode', 'false')
    }
  })

  console.log('JS file loaded');
});