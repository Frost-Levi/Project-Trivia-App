// Theme toggle with localStorage persistence

document.addEventListener('DOMContentLoaded', function() {
  // Restore theme from localStorage
  const savedTheme = localStorage.getItem('theme');
  if(savedTheme === 'dark') {
    document.documentElement.classList.add('dark-mode');
  } else {
    document.documentElement.classList.remove('dark-mode');
  }

  const btn = document.getElementById('theme-toggle');
  function updateBtn() {
    if(document.documentElement.classList.contains('dark-mode')) {
      btn.textContent = 'Light Theme';
    } else {
      btn.textContent = 'Dark Theme';
    }
  }
  btn.addEventListener('click', function() {
    document.documentElement.classList.toggle('dark-mode');
    // Save theme to localStorage
    if(document.documentElement.classList.contains('dark-mode')) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
    setTimeout(updateBtn, 10);
  });
  updateBtn();
});