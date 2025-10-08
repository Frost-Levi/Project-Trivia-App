const submitButton = document.getElementById('submitButton');

submitButton.addEventListener('click', function submitAnswers() {
    // Get the entered values
    const amount = document.getElementById('amount').value;
    const category = document.getElementById('category').value;
    const difficulty = document.getElementById('difficulty').value;
    const type = document.getElementById('type').value;

    // Validate the number of questions
    if (amount < 1 || amount > 50) {
        alert('Please enter a number of questions between 1 and 50.');
        return;
    }
    // Fetch questions from the API with the selected options
    fetchQuestions(amount, category, difficulty, type);
});

// Fetch questions from the Open Trivia Database API
async function fetchQuestions(amount, category, difficulty, type) {
    // Build query string parts if options are selected
    if (category) var categoryString = `&category=${category}`;
    if (difficulty) var difficultyString = `&difficulty=${difficulty}`;
    if (type) var typeString = `&type=${type}`;
    // Construct the API URL
    const baseurl = `https://opentdb.com/api.php?amount=${amount}`;
    const url = baseurl + (categoryString || '') + (difficultyString || '') + (typeString || '');
    try {
        // Fetch data from the API
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        // Parse the JSON response
        const data = await response.json();
        // Log the URL and results for debugging
        console.log(url);
        console.log(data.results);
        // Alert if not enough questions are available for the selected options
        if (data.results.length < amount) alert(`Can't load enough questions for selected options. Please choose different options.`);
        return data.results;
    } catch (error) {
        // Log and rethrow errors
        console.error('Error fetching questions:', error);
        throw error;
    }
}
