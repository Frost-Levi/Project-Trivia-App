// Get references to DOM elements for displaying questions and answers
const quizQuestion = document.querySelector('.quiz-question');
const answer1 = document.getElementById('answer-1');
const answer2 = document.getElementById('answer-2');
const answer3 = document.getElementById('answer-3');
const answer4 = document.getElementById('answer-4');
const screen = document.querySelector('.AnswerReveal');

// Retrieve questions from localStorage
const questions = JSON.parse(localStorage.getItem('questions'));
// Track the current question index and user score
var currentQuestionIndex = 0;
var score = 0;

// On page load, display the first question or redirect if none found
addEventListener('DOMContentLoaded', function() {
    if (questions && questions.length > 0) {
        displayQuestions(questions, 0);
    } else { // If no questions found, return to home page
        console.log('No questions found');
        window.location.href = 'index.html';
    }
});


// Display the current question and randomize its answers
function displayQuestions(questions, index) {
    quizQuestion.innerHTML = questions[index].question + `<br><span class="QuestionInfo">(${index + 1} of ${questions.length})</span>`;
    randomizeAnswers(questions[index]);
}

// Randomize and display answer options for the current question
function randomizeAnswers(question) {
    const answers = [
        question.correct_answer,
        ...question.incorrect_answers
    ];
    if (question.type === 'boolean') {
        // For boolean questions, only show two answers
        answer3.style.display = 'none';
        answer4.style.display = 'none';
        answer1.style.height = '100%';
        answer2.style.height = '100%';
        answers.splice(2, 2); // Remove last two answers for boolean type
        answer1.innerHTML = 'True';
        answer2.innerHTML = 'False';
        AddcorrectAttribute(question);
    } else {
        // For multiple choice, show all four answers and randomize order
        answer3.style.display = 'block';
        answer4.style.display = 'block';
        answer1.style.height = '40%';
        answer2.style.height = '40%';
        answers.sort(() => Math.random() - 0.5);
        answer1.innerHTML = answers[0];
        answer2.innerHTML = answers[1];
        answer3.innerHTML = answers[2];
        answer4.innerHTML = answers[3];
        AddcorrectAttribute(question);
    }
}

// Set data-correct attribute for each answer button for later checking
function AddcorrectAttribute(question) {
    // Decode HTML entities in correct answer for accurate comparison
    var doc = new DOMParser().parseFromString(question.correct_answer, 'text/html');
    question.correct_answer = doc.documentElement.textContent;

    // Mark which answer is correct
    if (answer1.innerHTML === question.correct_answer) {
        answer1.dataset.correct = 'true';
    } else {
        answer1.dataset.correct = 'false';
    }
    if (answer2.innerHTML === question.correct_answer) {
        answer2.dataset.correct = 'true';
    } else {
        answer2.dataset.correct = 'false';
    }
    if (answer3.innerHTML === question.correct_answer) {
        answer3.dataset.correct = 'true';
    } else {
        answer3.dataset.correct = 'false';
    }
    if (answer4.innerHTML === question.correct_answer) {
        answer4.dataset.correct = 'true';
    } else {
        answer4.dataset.correct = 'false';
    }
}


// Add click event listeners to each answer button
answer1.addEventListener('click', function() {
    if (answer1.dataset.correct === 'true') {
        correctAnswer(questions[currentQuestionIndex]);
    } else {
        incorrectAnswer(questions[currentQuestionIndex]);
    }
});
answer2.addEventListener('click', function() {
    if (answer2.dataset.correct === 'true') {
        correctAnswer(questions[currentQuestionIndex]);
    } else {
        incorrectAnswer(questions[currentQuestionIndex]);
    }
});
answer3.addEventListener('click', function() {
    if (answer3.dataset.correct === 'true') {
        correctAnswer(questions[currentQuestionIndex]);
    } else {
        incorrectAnswer(questions[currentQuestionIndex]);
    }
});
answer4.addEventListener('click', function() {
    if (answer4.dataset.correct === 'true') {
        correctAnswer(questions[currentQuestionIndex]);
    } else {
        incorrectAnswer(questions[currentQuestionIndex]);
    }
});


// Handle correct answer: update score, show feedback, and next button
function correctAnswer(question) {
    var modifier = 1;
    var text = '';
    if (question.type === 'multiple') {
        modifier = 2;
    }
    // Award points based on difficulty and type
    switch(question.difficulty) {
        case 'easy':
            score += 5 * modifier;
            text = 'Easy question answered correctly! +' + (5 * modifier) + ' points';
            break;
        case 'medium':
            score += 10 * modifier;
            text = 'Medium question answered correctly! +' + (10 * modifier) + ' points';
            break;
        case 'hard':
            score += 15 * modifier;
            text = 'Hard question answered correctly! +' + (15 * modifier) + ' points';
            break;
    }
    // Show feedback and next question button
    console.log("Correct answer display attempt");
    screen.innerHTML = 'Correct!<br>' + text + '<br><button onclick="nextqn()" class="Button">Next</button>';
    screen.style.display = 'block';
    console.log("Success");
}

// Handle incorrect answer: show correct answer and next button
function incorrectAnswer(question) {
    console.log("Incorrect answer display attempt");
    screen.innerHTML = 'Incorrect!<br> The answer was: ' + question.correct_answer + '<br><button onclick="nextqn()" class="Button">Next</button>';
    screen.style.display = 'block';
    console.log("Success");
}

// Move to the next question or finish the quiz
function nextqn() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        displayQuestions(questions, currentQuestionIndex);
        screen.style.display = 'none';
    } else {
        // Save score and redirect to results page
        localStorage.setItem('latestScore', score);
        const topScore = localStorage.getItem('TopScore');
        if (score > topScore) {
            localStorage.setItem('TopScore', score);
        }
        window.location.href = 'Results.html';
    }
}