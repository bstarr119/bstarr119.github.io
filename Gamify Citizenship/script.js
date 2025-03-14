// Sample questions (expand to 100 for full game)
const questions = [
 { id: 1, text: "What is the supreme law of the land?", category: "Government", requiredAnswers: 1, correctAnswers: ["the Constitution"] },
 { id: 2, text: "What does the Constitution do?", category: "Government", requiredAnswers: 1, correctAnswers: ["sets up the government", "defines the government", "protects basic rights of Americans"] },
 { id: 9, text: "What are two rights in the Declaration of Independence?", category: "Government", requiredAnswers: 2, correctAnswers: ["life", "liberty", "pursuit of happiness"] },
 { id: 58, text: "What is one reason colonists came to America?", category: "History", requiredAnswers: 1, correctAnswers: ["freedom", "political liberty", "religious freedom", "economic opportunity", "practice their religion", "escape persecution"] },
 { id: 100, text: "Name two national U.S. holidays.", category: "Civics", requiredAnswers: 2, correctAnswers: ["New Year's Day", "Martin Luther King, Jr. Day", "Presidents' Day", "Memorial Day", "Independence Day", "Labor Day", "Columbus Day", "Veterans Day", "Thanksgiving", "Christmas"] }
];

// Collect all possible answers for distractors
const allAnswers = new Set();
questions.forEach(q => q.correctAnswers.forEach(a => allAnswers.add(a)));

// Load or initialize progress
let progress = JSON.parse(localStorage.getItem('progress')) || {};
questions.forEach(q => {
 if (!progress[q.id]) {
 progress[q.id] = { mc: false, fib: false };
 }
});

// Game state
let currentMode = null;
let currentCategory = null;
let currentQuestionIndex = 0;
let quizQuestions = [];
let score = 0;

// Event listeners for mode selection
document.getElementById('quiz-mode').addEventListener('click', () => {
 currentMode = 'quiz';
 document.getElementById('category-select').style.display = 'none';
 startQuiz();
});

document.getElementById('practice-mode').addEventListener('click', () => {
 currentMode = 'practice';
 document.getElementById('category-select').style.display = 'block';
 document.getElementById('question-card').style.display = 'none';
 document.getElementById('feedback').style.display = 'none';
 document.getElementById('result').style.display = 'none';
});

document.getElementById('category-select').addEventListener('change', (e) => {
 currentCategory = e.target.value;
 startPractice();
});

// Start Quiz Mode
function startQuiz() {
 quizQuestions = shuffle([...questions]).slice(0, 10);
 currentQuestionIndex = 0;
 score = 0;
 document.getElementById('result').style.display = 'none';
 showQuestion(quizQuestions[currentQuestionIndex], 'mc');
}

// Start Practice Mode
function startPractice() {
 const categoryQuestions = questions.filter(q => q.category === currentCategory);
 let question = categoryQuestions.find(q => !progress[q.id].mc || !progress[q.id].fib);
 if (!question) {
 alert('You have mastered all questions in this category!');
 document.getElementById('category-select').value = '';
 return;
 }
 const type = progress[question.id].mc ? 'fib' : 'mc';
 showQuestion(question, type);
}

// Display a question
function showQuestion(question, type) {
 const card = document.getElementById('question-card');
 const questionNumber = document.getElementById('question-number');
 const questionText = document.getElementById('question-text');
 const optionsDiv = document.getElementById('options');
 
 card.style.display = 'block';
 if (currentMode === 'quiz') {
 questionNumber.textContent = `Question ${currentQuestionIndex + 1}/10: `;
 } else {
 questionNumber.textContent = `Question ${question.id}: `;
 }
 questionText.textContent = question.text;
 optionsDiv.innerHTML = '';

 if (type === 'mc') {
 if (question.requiredAnswers === 1) {
 const correctOption = question.correctAnswers.length === 1 
 ? question.correctAnswers[0] 
 : question.correctAnswers[Math.floor(Math.random() * question.correctAnswers.length)];
 const distractors = shuffle([...allAnswers].filter(a => !question.correctAnswers.includes(a))).slice(0, 3);
 const options = shuffle([correctOption, ...distractors]);
 options.forEach(opt => {
 const radio = document.createElement('input');
 radio.type = 'radio';
 radio.name = 'answer';
 radio.value = opt;
 const label = document.createElement('label');
 label.textContent = opt;
 optionsDiv.appendChild(radio);
 optionsDiv.appendChild(label);
 optionsDiv.appendChild(document.createElement('br'));
 });
 } else {
 const correctOptions = question.correctAnswers.length <= 4 
 ? question.correctAnswers 
 : shuffle([...question.correctAnswers]).slice(0, 4);
 const distractors = shuffle([...allAnswers].filter(a => !question.correctAnswers.includes(a))).slice(0, 2);
 const options = shuffle([...correctOptions, ...distractors]);
 optionsDiv.innerHTML = `<p>Select exactly ${question.requiredAnswers} answers:</p>`;
 options.forEach(opt => {
 const checkbox = document.createElement('input');
 checkbox.type = 'checkbox';
 checkbox.name = 'answer';
 checkbox.value = opt;
 const label = document.createElement('label');
 label.textContent = opt;
 optionsDiv.appendChild(checkbox);
 optionsDiv.appendChild(label);
 optionsDiv.appendChild(document.createElement('br'));
 });
 }
 } else {
 const input = document.createElement('input');
 input.type = 'text';
 input.id = 'fib-input';
 input.placeholder = question.requiredAnswers > 1 ? 'Enter answers separated by commas' : 'Type your answer';
 optionsDiv.appendChild(input);
 }

 document.getElementById('submit-button').addEventListener('click', () => checkAnswer(question, type), { once: true });
}

// Check user's answer
function checkAnswer(question, type) {
 const feedbackDiv = document.getElementById('feedback');
 feedbackDiv.style.display = 'block';
 feedbackDiv.className = '';

 if (type === 'mc') {
 if (question.requiredAnswers === 1) {
 const selected = document.querySelector('input[name="answer"]:checked');
 const isCorrect = selected && question.correctAnswers.includes(selected.value);
 feedbackDiv.textContent = isCorrect 
 ? 'Correct!' 
 : `Incorrect. The correct answer is: ${question.correctAnswers.join(', ')}`;
 feedbackDiv.className = isCorrect ? 'correct' : 'incorrect';
 if (isCorrect) {
 if (currentMode === 'practice') {
 progress[question.id].mc = true;
 saveProgress();
 } else {
 score++;
 }
 }
 } else {
 const selected = Array.from(document.querySelectorAll('input[name="answer"]:checked')).map(cb => cb.value);
 const isCorrect = selected.length === question.requiredAnswers && selected.every(s => question.correctAnswers.includes(s));
 feedbackDiv.textContent = isCorrect 
 ? 'Correct!' 
 : `Incorrect. Correct answers include: ${question.correctAnswers.slice(0, question.requiredAnswers).join(', ')}`;
 feedbackDiv.className = isCorrect ? 'correct' : 'incorrect';
 if (isCorrect) {
 if (currentMode === 'practice') {
 progress[question.id].mc = true;
 saveProgress();
 } else {
 score++;
 }
 }
 }
 } else {
 const input = document.getElementById('fib-input').value.trim().toLowerCase();
 if (question.requiredAnswers === 1) {
 const isCorrect = question.correctAnswers.map(a => a.toLowerCase()).includes(input);
 feedbackDiv.textContent = isCorrect 
 ? 'Correct!' 
 : `Incorrect. The correct answer is: ${question.correctAnswers.join(', ')}`;
 feedbackDiv.className = isCorrect ? 'correct' : 'incorrect';
 if (isCorrect && currentMode === 'practice') {
 progress[question.id].fib = true;
 saveProgress();
 }
 } else {
 const answers = input.split(',').map(a => a.trim().toLowerCase());
 const isCorrect = answers.length === question.requiredAnswers && answers.every(a => question.correctAnswers.map(ca => ca.toLowerCase()).includes(a));
 feedbackDiv.textContent = isCorrect 
 ? 'Correct!' 
 : `Incorrect. Correct answers include: ${question.correctAnswers.slice(0, question.requiredAnswers).join(', ')}`;
 feedbackDiv.className = isCorrect ? 'correct' : 'incorrect';
 if (isCorrect && currentMode === 'practice') {
 progress[question.id].fib = true;
 saveProgress();
 }
 }
 }

 if (currentMode === 'quiz') {
 currentQuestionIndex++;
 if (currentQuestionIndex < 10) {
 setTimeout(() => {
 showQuestion(quizQuestions[currentQuestionIndex], 'mc');
 feedbackDiv.style.display = 'none';
 }, 2000);
 } else {
 setTimeout(() => {
 document.getElementById('question-card').style.display = 'none';
 feedbackDiv.style.display = 'none';
 document.getElementById('result').style.display = 'block';
 document.getElementById('result').textContent = `You scored ${score}/10. ${score >= 6 ? 'You passed!' : 'You did not pass.'}`;
 }, 2000);
 }
 } else {
 setTimeout(() => {
 startPractice();
 feedbackDiv.style.display = 'none';
 }, 2000);
 }
}

// Shuffle array function
function shuffle(array) {
 for (let i = array.length - 1; i > 0; i--) {
 const j = Math.floor(Math.random() * (i + 1));
 [array[i], array[j]] = [array[j], array[i]];
 }
 return array;
}

// Save progress to localStorage
function saveProgress() {
 localStorage.setItem('progress', JSON.stringify(progress));
}
​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​