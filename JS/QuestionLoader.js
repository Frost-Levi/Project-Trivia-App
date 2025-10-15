// Get references to DOM elements for displaying questions and answers
const quizQuestion = document.querySelector('.quiz-question');
const answer1 = document.getElementById('answer-1');
const answer2 = document.getElementById('answer-2');
const answer3 = document.getElementById('answer-3');
const answer4 = document.getElementById('answer-4');
const screen = document.querySelector('.AnswerReveal');
const timer = document.getElementById('timer'); 
var countdown; // Make countdown global
var elapsedSeconds = 0;
var elapsedInterval;
var gamelist = localStorage.getItem('gamelist') ? JSON.parse(localStorage.getItem('gamelist')) : [];
var select = localStorage.getItem('quizOptions') ? JSON.parse(localStorage.getItem('quizOptions')) : null;

// Retrieve questions from localStorage
const questions = JSON.parse(localStorage.getItem('questions'));
// Track the current question index and user score
var currentQuestionIndex = 0;
var score = 0;

// On page load, display the first question or redirect if none found
addEventListener('DOMContentLoaded', function() {
    if (questions && questions.length > 0) {
        elapsedSeconds = 0;
        if (elapsedInterval) clearInterval(elapsedInterval);
        elapsedInterval = setInterval(() => {
            elapsedSeconds++;
        }, 1000);
        displayQuestions(questions, 0);
    } else { // If no questions found, return to home page
        console.log('No questions found');
        window.location.href = './index.html';
    }
});


// Display the current question and randomize its answers
function displayQuestions(questions, index) {
    quizQuestion.innerHTML = questions[index].question + `<br><span class="QuestionInfo">(${index + 1} of ${questions.length})</span>`;
    randomizeAnswers(questions[index]);
    Timer();
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
        incorrectAnswer(questions[currentQuestionIndex], false);
    }
});
answer2.addEventListener('click', function() {
    if (answer2.dataset.correct === 'true') {
        correctAnswer(questions[currentQuestionIndex]);
    } else {
        incorrectAnswer(questions[currentQuestionIndex], false);
    }
});
answer3.addEventListener('click', function() {
    if (answer3.dataset.correct === 'true') {
        correctAnswer(questions[currentQuestionIndex]);
    } else {
        incorrectAnswer(questions[currentQuestionIndex], false);
    }
});
answer4.addEventListener('click', function() {
    if (answer4.dataset.correct === 'true') {
        correctAnswer(questions[currentQuestionIndex]);
    } else {
        incorrectAnswer(questions[currentQuestionIndex], false);
    }
});


// Handle correct answer: update score, show feedback, and next button
// Track time left globally for scoring
var timeLeftGlobal = 15;
function correctAnswer(question) {
    clearInterval(countdown); // Stop timer when answered
    var modifier = 1;
    var text = '';
    if (question.type === 'multiple') {
        modifier = 2;
    }
    // Award points based on difficulty and type
    let basePoints = 0;
    switch(question.difficulty) {
        case 'easy':
            basePoints = 5 * modifier;
            break;
        case 'medium':
            basePoints = 10 * modifier;
            break;
        case 'hard':
            basePoints = 15 * modifier;
            break;
    }
    // Subtract 1 point for each second waited (max 15 seconds)
    let secondsWaited = 15 - timeLeftGlobal;
    let pointsAwarded = Math.max(basePoints - secondsWaited, 1); // Ensure at least 1 point is awarded
    score += pointsAwarded;
    text = `${question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)} question answered correctly! +${pointsAwarded} points`;
    // Show feedback and next question button
    console.log("Correct answer display attempt");
    screen.innerHTML = '<h1>Correct!<br>' + text + '</h1><br><button onclick="nextqn()" class="Button">Next</button>';
    screen.style.display = 'block';
    console.log("Success");
}

// Handle incorrect answer: show correct answer and next button
function incorrectAnswer(question, timeup) {
    clearInterval(countdown); // Stop timer when answered or time is up
    if (timeup) {
        console.log("Time up display attempt");
        screen.innerHTML = '<h1>Time is up!<br> The answer was: ' + question.correct_answer + '</h1><br><button onclick="nextqn()" class="Button">Next</button>';
    } else {
        console.log("Incorrect answer display attempt");
        screen.innerHTML = '<h1>Incorrect!<br> The answer was: ' + question.correct_answer + '</h1><br><button onclick="nextqn()" class="Button">Next</button>';
    }
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
        if (elapsedInterval) clearInterval(elapsedInterval);
                localStorage.getItem('fastestTime');
            let FastestTime = localStorage.getItem('FastestTime') || Infinity;
            if (elapsedSeconds < FastestTime) {
                FastestTime = elapsedSeconds;
                localStorage.setItem('FastestTime', FastestTime);
            }
            var currentDate = new Date();
            var gameRecord = {
                date: currentDate.toLocaleDateString() + ' ' + currentDate.toLocaleTimeString(),
                score: score,
                time: elapsedSeconds,
                category: select ? select.category : "Any",
                difficulty: select ? select.difficulty : "Any",
            };
            gamelist.push(gameRecord);
            localStorage.setItem('gamelist', JSON.stringify(gamelist));
        // Format elapsedSeconds as mm:ss
        let minutes = Math.floor(elapsedSeconds / 60);
        let seconds = elapsedSeconds % 60;
        let formattedTime = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        screen.innerHTML = `
         <div class="results-center">
            <h1>Quiz Results</h1>
            <h2>Score: ${score}</h2>
            <h2>Time Taken: ${formattedTime}</h2>
            <div class="button-row">
                <a href="./Quiz.html"><button class="Button">Restart Quiz</button></a>
                <a href="./Stats.html"><button class="Button">View Your Stats</button></a>
                <a href="./index.html"><button class="Button">Back to Home</button></a>
            </div>
        </div>`
    }
}

function Timer() {
    timeLeftGlobal = 15;
    timer.innerHTML = timeLeftGlobal;

    clearInterval(countdown); // Clear any previous timer
    countdown = setInterval(() => {
        timeLeftGlobal--;
        timer.innerHTML = timeLeftGlobal;

        if (timeLeftGlobal <= 0) {
            clearInterval(countdown);
            // Handle time up scenario
            incorrectAnswer(questions[currentQuestionIndex], true);
        }
    }, 1000);
}
