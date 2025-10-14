var Gamelist = localStorage.getItem('gamelist') ? JSON.parse(localStorage.getItem('gamelist')) : [];
var FastestTime = localStorage.getItem('FastestTime') ? parseInt(localStorage.getItem('FastestTime')) : null;
const FastestTimeDisplay = document.getElementById('time');
const TotalGamesDisplay = document.getElementById('Games');
const AverageScoreDisplay = document.getElementById('Score');


// On page load, display game statistics
addEventListener('DOMContentLoaded', function() {
    displayStats();
});

// Function to display game statistics
function displayStats() {
    const statsContainer = document.getElementById('stats-container');
    statsContainer.innerHTML = '';
    if (Gamelist.length === 0) {
        statsContainer.innerHTML = '<p>No game data available.</p>';
        return;
    }
    // Show the last game at the top by iterating in reverse order
    Gamelist.slice().reverse().forEach((game, index) => {
        const gameDiv = document.createElement('div');
        gameDiv.classList.add('game-entry');
        gameDiv.innerHTML = `
            <h3>Game ${Gamelist.length - index}</h3>
            <p>Date: ${new Date(game.date).toLocaleString()}</p>
            <p>Score: ${game.score}</p>
            <p>Time: ${game.time} seconds</p>
            <p>Category: ${GetCategory(game.category)}</p>
            <p>Difficulty: ${game.difficulty}</p>
            <hr>
        `;
        statsContainer.appendChild(gameDiv);
        FastestTimeDisplay.textContent = FastestTime !== null ? `Fastest Time: ${FastestTime} seconds` : 'N/A';
        TotalGamesDisplay.textContent = `Total Games played: ${Gamelist.length}`;
        const totalScore = Gamelist.reduce((sum, game) => sum + game.score, 0);
        const averageScore = (totalScore / Gamelist.length).toFixed(2);
        AverageScoreDisplay.textContent = `Average Score: ${averageScore}`;
    });
}

clearStats = () => {
    if (confirm('Are you sure you want to clear all statistics? This action cannot be undone.')) {
        localStorage.removeItem('gamelist');
        localStorage.removeItem('FastestTime');
        location.reload();
    }
}

function GetCategory(id) {
    const categories = {
        9: "General Knowledge",
        10: "Entertainment: Books",
        11: "Entertainment: Film",
        12: "Entertainment: Music",
        13: "Entertainment: Musicals & Theatres",
        14: "Entertainment: Television",
        15: "Entertainment: Video Games",
        16: "Entertainment: Board Games",
        17: "Science & Nature",
        18: "Science: Computers",
        19: "Science: Mathematics",
        20: "Mythology",
        21: "Sports",
        22: "Geography",
        23: "History",
        24: "Politics",
        25: "Art",
        26: "Celebrities",
        27: "Animals",
        28: "Vehicles",
        29: "Entertainment: Comics",
        30: "Science: Gadgets",
        31: "Entertainment: Japanese Anime & Manga",
        32: "Entertainment: Cartoon & Animations"
    };
    return categories[id] || "Any";
}