function saveGameData() {
    localStorage.setItem('score', score);
    localStorage.setItem('level', level);
}

function loadGameData() {
    score = parseInt(localStorage.getItem('score')) || 0;
    level = parseInt(localStorage.getItem('level')) || 1;
}

// Load data when the game starts
loadGameData();

// Optionally, call saveGameData() at game over or after level changes.
