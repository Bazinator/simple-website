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

  // Dark mode functionality
  const darkModeToggle = document.getElementById('darkModeToggle');
  const body = document.body;

  // Check for saved user preference
  const isDarkMode = localStorage.getItem('darkMode') === 'true';

  // Set initial mode
  if (isDarkMode) {
    body.classList.add('dark-mode');
  }

  // Toggle dark mode
  darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', body.classList.contains('dark-mode'));
  });

  console.log('JS file loaded');
});