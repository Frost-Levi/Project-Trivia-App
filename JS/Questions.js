const submitButton = document.getElementById('submitButton');

submitButton.addEventListener('click', function submitAnswers() {
    // Get the entered values
    const amount = document.getElementById('amount').value;
    const category = document.getElementById('category').value;
    const difficulty = document.getElementById('difficulty').value;
    const type = document.getElementById('type').value;
    if (amount < 1 || amount > 50) {
        alert('Please enter a number of questions between 1 and 50.');
        return;
    }
    fetchQuestions(amount, category, difficulty, type);
});

async function fetchQuestions(amount, category, difficulty, type) {
    if (category) var categoryString = `&category=${category}`;
    if (difficulty) var difficultyString = `&difficulty=${difficulty}`;
    if (type) var typeString = `&type=${type}`;
    const baseurl = `https://opentdb.com/api.php?amount=${amount}`;
    const url = baseurl + (categoryString || '') + (difficultyString || '') + (typeString || '');
    try {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(url);
    console.log(data.results);
    if (data.results.length < amount) alert(`Can't load enough questions for selected options. Please choose different options.`);
    return data.results;
    
    } catch (error) {
        console.error('Error fetching questions:', error);
        throw error;
    }
}
