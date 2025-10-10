//assign scores from localStorage to the results page
//can add more if needed
document.getElementById('final-score').innerText = localStorage.getItem('latestScore') || '0';
document.getElementById('top-score').innerText = localStorage.getItem('TopScore') || '0';