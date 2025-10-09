const quizQuestion = document.querySelector('.quiz-question');
    const answer1 = document.getElementById('answer-1');
    const answer2 = document.getElementById('answer-2');
    const answer3 = document.getElementById('answer-3');
    const answer4 = document.getElementById('answer-4');
    const questions = JSON.parse(localStorage.getItem('questions'));
addEventListener('DOMContentLoaded', function() {
    if (questions && questions.length > 0) {
        displayQuestions(questions, 0);
    }
});

function displayQuestions(questions, index) {
    
    console.log(questions);
    quizQuestion.innerHTML = questions[index].question;
    randomizeAnswers(questions[index]);

    
}

function randomizeAnswers(question) {
    const answers = [
        question.correct_answer,
        ...question.incorrect_answers
    ];
    if (question.type === 'boolean') {
        answer3.style.display = 'none';
        answer4.style.display = 'none';
        answer1.style.height = '100%';
        answer2.style.height = '100%';
        answers.splice(2, 2); // Remove last two answers for boolean type
        answer1.innerHTML = 'True';
        answer2.innerHTML = 'False';
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
    } else {
        answer3.style.display = 'block';
        answer4.style.display = 'block';
        answer1.style.height = '45%';
        answer2.style.height = '45%';
    
    answers.sort(() => Math.random() - 0.5);
    answer1.innerHTML = answers[0];
    answer2.innerHTML = answers[1];
    answer3.innerHTML = answers[2];
    answer4.innerHTML = answers[3];
    // Decode HTML entities in correct answer for accurate comparison
    var doc = new DOMParser().parseFromString(question.correct_answer, 'text/html');
    question.correct_answer = doc.documentElement.textContent;

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
}

answer1.addEventListener('click', function() {
    if (answer1.dataset.correct === 'true') {
        alert('Correct!');
    } else {
        alert('Incorrect!');
    }
});
answer2.addEventListener('click', function() {
    if (answer2.dataset.correct === 'true') {
        alert('Correct!');
    } else {
        alert('Incorrect!');
    }
});
answer3.addEventListener('click', function() {
    if (answer3.dataset.correct === 'true') {
        alert('Correct!');
    } else {
        alert('Incorrect!');
    }
});
answer4.addEventListener('click', function() {
    if (answer4.dataset.correct === 'true') {
        alert('Correct!');
    } else {
        alert('Incorrect!');
    }
});