// Theme toggle with localStorage persistence

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Restore theme from localStorage (if set)
  const savedTheme = localStorage.getItem('theme');
  if(savedTheme === 'dark') {
    // If user previously chose dark mode, enable it
    document.documentElement.classList.add('dark-mode');
  } else {
    // Otherwise, use light mode by default
    document.documentElement.classList.remove('dark-mode');
  }


  const btn = document.getElementById('theme-toggle');

  // Update the button text to match the current theme
  function updateBtn() {
    if(document.documentElement.classList.contains('dark-mode')) {
      btn.textContent = 'Light Theme'; 
    } else {
      btn.textContent = 'Dark Theme'; 
    }
  }

  // When the button is clicked, toggle the theme
  btn.addEventListener('click', function() {
    document.documentElement.classList.toggle('dark-mode');
    // Save theme to localStorage
    if(document.documentElement.classList.contains('dark-mode')) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
    // Update the button text after toggling
    setTimeout(updateBtn, 10);
  });

  // Set the initial button text
  updateBtn();
});