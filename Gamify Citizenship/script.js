// All 100 civics test questions
const questions = [
 { text: "What is the supreme law of the land?", answers: ["the Constitution"], numRequired: 1 },
 { text: "What does the Constitution do?", answers: ["sets up the government", "defines the government", "protects basic rights of Americans"], numRequired: 1 },
 { text: "The idea of self-government is in the first three words of the Constitution. What are these words?", answers: ["We the People"], numRequired: 1 },
 { text: "What is an amendment?", answers: ["a change to the Constitution", "an addition to the Constitution"], numRequired: 1 },
 { text: "What do we call the first ten amendments to the Constitution?", answers: ["the Bill of Rights"], numRequired: 1 },
 { text: "What is one right or freedom from the First Amendment?", answers: ["speech", "religion", "assembly", "press", "petition the government"], numRequired: 1 },
 { text: "How many amendments does the Constitution have?", answers: ["27"], numRequired: 1 },
 { text: "What did the Declaration of Independence do?", answers: ["announced our independence from Great Britain", "declared our independence from Great Britain", "said that the United States is free from Great Britain"], numRequired: 1 },
 { text: "What are two rights in the Declaration of Independence?", answers: ["life", "liberty", "pursuit of happiness"], numRequired: 2 },
 { text: "What is freedom of religion?", answers: ["You can practice any religion, or not practice a religion."], numRequired: 1 },
 { text: "What is the economic system in the United States?", answers: ["capitalist economy", "market economy"], numRequired: 1 },
 { text: "What is the 'rule of law'?", answers: ["Everyone must follow the law.", "Leaders must obey the law.", "Government must obey the law.", "No one is above the law."], numRequired: 1 },
 { text: "Name one branch or part of the government.", answers: ["Congress", "legislative", "President", "executive", "the courts", "judicial"], numRequired: 1 },
 { text: "What stops one branch of government from becoming too powerful?", answers: ["checks and balances", "separation of powers"], numRequired: 1 },
 { text: "Who is in charge of the executive branch?", answers: ["the President"], numRequired: 1 },
 { text: "Who makes federal laws?", answers: ["Congress", "Senate and House of Representatives", "U.S. or national legislature"], numRequired: 1 },
 { text: "What are the two parts of the U.S. Congress?", answers: ["the Senate and House of Representatives"], numRequired: 1 },
 { text: "How many U.S. Senators are there?", answers: ["100"], numRequired: 1 },
 { text: "We elect a U.S. Senator for how many years?", answers: ["6"], numRequired: 1 },
 { text: "Who is one of your state’s U.S. Senators now?", answers: ["Answers vary; e.g., Chuck Schumer (NY)"], numRequired: 1 },
 { text: "The House of Representatives has how many voting members?", answers: ["435"], numRequired: 1 },
 { text: "We elect a U.S. Representative for how many years?", answers: ["2"], numRequired: 1 },
 { text: "Name your U.S. Representative.", answers: ["Answers vary; e.g., Nancy Pelosi (CA)"], numRequired: 1 },
 { text: "Who does a U.S. Senator represent?", answers: ["all people of the state"], numRequired: 1 },
 { text: "Why do some states have more Representatives than other states?", answers: ["because of the state’s population", "because they have more people", "because some states have more people"], numRequired: 1 },
 { text: "We elect a President for how many years?", answers: ["4"], numRequired: 1 },
 { text: "In what month do we vote for President?", answers: ["November"], numRequired: 1 },
 { text: "What is the name of the President of the United States now?", answers: ["Joe Biden"], numRequired: 1 },
 { text: "What is the name of the Vice President of the United States now?", answers: ["Kamala Harris"], numRequired: 1 },
 { text: "If the President can no longer serve, who becomes President?", answers: ["the Vice President"], numRequired: 1 },
 { text: "If both the President and the Vice President can no longer serve, who becomes President?", answers: ["the Speaker of the House"], numRequired: 1 },
 { text: "Who is the Commander in Chief of the military?", answers: ["the President"], numRequired: 1 },
 { text: "Who signs bills to become laws?", answers: ["the President"], numRequired: 1 },
 { text: "Who vetoes bills?", answers: ["the President"], numRequired: 1 },
 { text: "What does the President’s Cabinet do?", answers: ["advises the President"], numRequired: 1 },
 { text: "What are two Cabinet-level positions?", answers: ["Secretary of Agriculture", "Secretary of Commerce", "Secretary of Defense", "Secretary of Education", "Secretary of Energy", "Secretary of Health and Human Services", "Secretary of Homeland Security", "Secretary of Housing and Urban Development", "Secretary of the Interior", "Secretary of Labor", "Secretary of State", "Secretary of Transportation", "Secretary of the Treasury", "Secretary of Veterans Affairs", "Attorney General", "Vice President"], numRequired: 2 },
 { text: "What does the judicial branch do?", answers: ["reviews laws", "explains laws", "resolves disputes", "decides if a law goes against the Constitution"], numRequired: 1 },
 { text: "What is the highest court in the United States?", answers: ["the Supreme Court"], numRequired: 1 },
 { text: "How many justices are on the Supreme Court?", answers: ["9"], numRequired: 1 },
 { text: "Who is the Chief Justice of the United States now?", answers: ["John Roberts"], numRequired: 1 },
 { text: "Under our Constitution, some powers belong to the federal government. What is one power of the federal government?", answers: ["to print money", "to declare war", "to create an army", "to make treaties"], numRequired: 1 },
 { text: "Under our Constitution, some powers belong to the states. What is one power of the states?", answers: ["provide schooling and education", "provide protection (police)", "provide safety (fire departments)", "give a driver’s license", "approve zoning and land use"], numRequired: 1 },
 { text: "Who is the Governor of your state now?", answers: ["Answers vary; e.g., Gavin Newsom (CA)"], numRequired: 1 },
 { text: "What is the capital of your state?", answers: ["Answers vary; e.g., Sacramento (CA)"], numRequired: 1 },
 { text: "What are the two major political parties in the United States?", answers: ["Democratic and Republican"], numRequired: 1 },
 { text: "What is the political party of the President now?", answers: ["Democratic"], numRequired: 1 },
 { text: "What is the name of the Speaker of the House of Representatives now?", answers: ["Mike Johnson"], numRequired: 1 },
 { text: "There are four amendments to the Constitution about who can vote. Describe one of them.", answers: ["Citizens eighteen (18) and older can vote.", "You don’t have to pay (a poll tax) to vote.", "Any citizen can vote. (Women and men can vote.)", "A male citizen of any race can vote."], numRequired: 1 },
 { text: "What is one responsibility that is only for United States citizens?", answers: ["serve on a jury", "vote in a federal election"], numRequired: 1 },
 { text: "Name one right only for United States citizens.", answers: ["vote in a federal election", "run for federal office"], numRequired: 1 },
 { text: "What are two rights of everyone living in the United States?", answers: ["freedom of expression", "freedom of speech", "freedom of assembly", "freedom to petition the government", "freedom of religion", "the right to bear arms"], numRequired: 2 },
 { text: "What do we show loyalty to when we say the Pledge of Allegiance?", answers: ["the United States", "the flag"], numRequired: 1 },
 { text: "What is one promise you make when you become a United States citizen?", answers: ["give up loyalty to other countries", "defend the Constitution and laws of the United States", "obey the laws of the United States", "serve in the U.S. military (if needed)", "serve (do important work for) the nation (if needed)", "be loyal to the United States"], numRequired: 1 },
 { text: "How old do citizens have to be to vote for President?", answers: ["18"], numRequired: 1 },
 { text: "What are two ways that Americans can participate in their democracy?", answers: ["vote", "join a political party", "help with a campaign", "join a civic group", "join a community group", "give an elected official your opinion on an issue", "call Senators and Representatives", "publicly support or oppose an issue or policy", "run for office", "write to a newspaper"], numRequired: 2 },
 { text: "When is the last day you can send in federal income tax forms?", answers: ["April 15"], numRequired: 1 },
 { text: "When must all men register for the Selective Service?", answers: ["at age 18", "between 18 and 26"], numRequired: 1 },
 { text: "What is one reason colonists came to America?", answers: ["freedom", "political liberty", "religious freedom", "economic opportunity", "practice their religion", "escape persecution"], numRequired: 1 },
 { text: "Who lived in America before the Europeans arrived?", answers: ["American Indians", "Native Americans"], numRequired: 1 },
 { text: "What group of people was taken to America and sold as slaves?", answers: ["Africans", "people from Africa"], numRequired: 1 },
 { text: "Why did the colonists fight the British?", answers: ["because of high taxes (taxation without representation)", "because the British army stayed in their houses (boarding, quartering)", "because they didn’t have self-government"], numRequired: 1 },
 { text: "Who wrote the Declaration of Independence?", answers: ["Thomas Jefferson"], numRequired: 1 },
 { text: "When was the Declaration of Independence adopted?", answers: ["July 4, 1776"], numRequired: 1 },
 { text: "There were 13 original states. Name three.", answers: ["New Hampshire", "Massachusetts", "Rhode Island", "Connecticut", "New York", "New Jersey", "Pennsylvania", "Delaware", "Maryland", "Virginia", "North Carolina", "South Carolina", "Georgia"], numRequired: 3 },
 { text: "What happened at the Constitutional Convention?", answers: ["The Constitution was written.", "The Founding Fathers wrote the Constitution."], numRequired: 1 },
 { text: "When was the Constitution written?", answers: ["1787"], numRequired: 1 },
 { text: "The Federalist Papers supported the passage of the U.S. Constitution. Name one of the writers.", answers: ["James Madison", "Alexander Hamilton", "John Jay", "Publius"], numRequired: 1 },
 { text: "What is one thing Benjamin Franklin is famous for?", answers: ["U.S. diplomat", "oldest member of the Constitutional Convention", "first Postmaster General of the United States", "writer of 'Poor Richard’s Almanac'", "started the first free libraries"], numRequired: 1 },
 { text: "Who is the 'Father of Our Country'?", answers: ["George Washington"], numRequired: 1 },
 { text: "Who was the first President?", answers: ["George Washington"], numRequired: 1 },
 { text: "What territory did the United States buy from France in 1803?", answers: ["the Louisiana Territory", "Louisiana"], numRequired: 1 },
 { text: "Name one war fought by the United States in the 1800s.", answers: ["War of 1812", "Mexican-American War", "Civil War", "Spanish-American War"], numRequired: 1 },
 { text: "Name the U.S. war between the North and the South.", answers: ["the Civil War", "the War between the States"], numRequired: 1 },
 { text: "Name one problem that led to the Civil War.", answers: ["slavery", "economic reasons", "states’ rights"], numRequired: 1 },
 { text: "What was one important thing that Abraham Lincoln did?", answers: ["freed the slaves (Emancipation Proclamation)", "saved (or preserved) the Union", "led the United States during the Civil War"], numRequired: 1 },
 { text: "What did the Emancipation Proclamation do?", answers: ["freed the slaves", "freed slaves in the Confederacy", "freed slaves in the Confederate states", "freed slaves in most Southern states"], numRequired: 1 },
 { text: "What did Susan B. Anthony do?", answers: ["fought for women’s rights", "fought for civil rights"], numRequired: 1 },
 { text: "Name one war fought by the United States in the 1900s.", answers: ["World War I", "World War II", "Korean War", "Vietnam War", "Persian Gulf War"], numRequired: 1 },
 { text: "Who was President during World War I?", answers: ["Woodrow Wilson"], numRequired: 1 },
 { text: "Who was President during the Great Depression and World War II?", answers: ["Franklin Roosevelt"], numRequired: 1 },
 { text: "Who did the United States fight in World War II?", answers: ["Japan, Germany, and Italy"], numRequired: 1 },
 { text: "Before he was President, Eisenhower was a general. What war was he in?", answers: ["World War II"], numRequired: 1 },
 { text: "During the Cold War, what was the main concern of the United States?", answers: ["Communism"], numRequired: 1 },
 { text: "What movement tried to end racial discrimination?", answers: ["civil rights movement"], numRequired: 1 },
 { text: "What did Martin Luther King, Jr. do?", answers: ["fought for civil rights", "worked for equality for all Americans"], numRequired: 1 },
 { text: "What major event happened on September 11, 2001, in the United States?", answers: ["Terrorists attacked the United States."], numRequired: 1 },
 { text: "Name one American Indian tribe in the United States.", answers: ["Cherokee", "Navajo", "Sioux", "Chippewa", "Choctaw", "Pueblo", "Apache", "Iroquois", "Creek", "Blackfeet", "Seminole", "Cheyenne", "Arawak", "Shawnee", "Mohegan", "Huron", "Oneida", "Lakota", "Crow", "Teton", "Hopi", "Inuit"], numRequired: 1 },
 { text: "Name one of the two longest rivers in the United States.", answers: ["Missouri River", "Mississippi River"], numRequired: 1 },
 { text: "What ocean is on the West Coast of the United States?", answers: ["Pacific Ocean"], numRequired: 1 },
 { text: "What ocean is on the East Coast of the United States?", answers: ["Atlantic Ocean"], numRequired: 1 },
 { text: "Name one U.S. territory.", answers: ["Puerto Rico", "U.S. Virgin Islands", "American Samoa", "Northern Mariana Islands", "Guam"], numRequired: 1 },
 { text: "Name one state that borders Canada.", answers: ["Maine", "New Hampshire", "Vermont", "New York", "Pennsylvania", "Ohio", "Michigan", "Minnesota", "North Dakota", "Montana", "Idaho", "Washington", "Alaska"], numRequired: 1 },
 { text: "Name one state that borders Mexico.", answers: ["California", "Arizona", "New Mexico", "Texas"], numRequired: 1 },
 { text: "What is the capital of the United States?", answers: ["Washington, D.C."], numRequired: 1 },
 { text: "Where is the Statue of Liberty?", answers: ["New York Harbor", "Liberty Island"], numRequired: 1 },
 { text: "Why does the flag have 13 stripes?", answers: ["because there were 13 original colonies", "because the stripes represent the original colonies"], numRequired: 1 },
 { text: "Why does the flag have 50 stars?", answers: ["because there is one star for each state", "because each star represents a state", "because there are 50 states"], numRequired: 1 },
 { text: "What is the name of the national anthem?", answers: ["The Star-Spangled Banner"], numRequired: 1 },
 { text: "When do we celebrate Independence Day?", answers: ["July 4"], numRequired: 1 },
 { text: "Name two national U.S. holidays.", answers: ["New Year’s Day", "Martin Luther King, Jr. Day", "Presidents’ Day", "Memorial Day", "Independence Day", "Labor Day", "Columbus Day", "Veterans Day", "Thanksgiving", "Christmas"], numRequired: 2 }
];

// Collect all unique answers for distractors
const allAnswers = [...new Set(questions.flatMap(q => q.answers))];

// Utility function to shuffle an array
function shuffle(array) {
 for (let i = array.length - 1; i > 0; i--) {
 const j = Math.floor(Math.random() * (i + 1));
 [array[i], array[j]] = [array[j], array[i]];
 }
 return array;
}

// Get random distractors for multiple-choice options
function getDistractors(question, num) {
 const correctAnswers = question.answers;
 const distractors = allAnswers.filter(a => !correctAnswers.includes(a));
 return shuffle(distractors).slice(0, num);
}

// Game state variables
let currentLevel = 'multiple-choice';
let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];

// Event listeners for starting the game
document.getElementById('start-quiz').addEventListener('click', () => {
 startQuiz('multiple-choice');
});

document.getElementById('practice-mode').addEventListener('click', () => {
 alert('Practice Mode: Review all 100 questions (coming soon)!');
});

// Start a new quiz level
function startQuiz(level) {
 currentLevel = level;
 currentQuestions = shuffle([...questions]).slice(0, 10); // Select 10 random questions
 currentQuestionIndex = 0;
 score = 0;
 userAnswers = [];
 document.getElementById('start-screen').style.display = 'none';
 document.getElementById('quiz-container').style.display = 'block';
 document.getElementById('results').style.display = 'none';
 document.getElementById('progress').style.display = 'block';
 showQuestion();
}

// Display the current question
function showQuestion() {
 const question = currentQuestions[currentQuestionIndex];
 document.getElementById('question').textContent = `${currentLevel === 'multiple-choice' ? 'Multiple Choice' : 'Fill in the Blank'}: ${question.text}`;
 document.getElementById('progress').textContent = `Question ${currentQuestionIndex + 1} of 10`;
 const optionsDiv = document.getElementById('options');
 optionsDiv.innerHTML = '';

 if (currentLevel === 'multiple-choice') {
 if (question.numRequired === 1) {
 // Single-answer question with radio buttons
 const correctAnswer = question.answers[Math.floor(Math.random() * question.answers.length)];
 const distractors = getDistractors(question, 3);
 const options = shuffle([correctAnswer, ...distractors]);
 options.forEach(option => {
 const label = document.createElement('label');
 label.innerHTML = `<input type="radio" name="answer" value="${option}"> ${option}`;
 optionsDiv.appendChild(label);
 optionsDiv.appendChild(document.createElement('br'));
 });
 } else {
 // Multi-answer question with checkboxes
 const correctAnswers = question.answers;
 const distractors = getDistractors(question, Math.max(3, 6 - correctAnswers.length));
 const options = shuffle([...correctAnswers, ...distractors]);
 options.forEach(option => {
 const label = document.createElement('label');
 label.innerHTML = `<input type="checkbox" name="answer" value="${option}"> ${option}`;
 optionsDiv.appendChild(label);
 optionsDiv.appendChild(document.createElement('br'));
 });
 optionsDiv.insertAdjacentHTML('beforeend', `<p>Select ${question.numRequired} answer(s).</p>`);
 }
 } else {
 // Fill-in-the-blank question
 const input = document.createElement('input');
 input.type = 'text';
 input.id = 'answer-input';
 input.placeholder = question.numRequired > 1 ? 'Enter answers separated by commas' : 'Enter your answer';
 optionsDiv.appendChild(input);
 }
 document.getElementById('feedback').textContent = '';
}

// Handle answer submission
document.getElementById('submit-answer').addEventListener('click', () => {
 const question = currentQuestions[currentQuestionIndex];
 let userAnswer;

 if (currentLevel === 'multiple-choice') {
 if (question.numRequired === 1) {
 const selected = document.querySelector('input[name="answer"]:checked');
 userAnswer = selected ? [selected.value] : [];
 } else {
 const checked = document.querySelectorAll('input[name="answer"]:checked');
 userAnswer = Array.from(checked).map(input => input.value);
 }
 } else {
 const input = document.getElementById('answer-input');
 userAnswer = input.value.trim().split(',').map(a => a.trim()).filter(a => a);
 }

 const isCorrect = checkAnswer(question, userAnswer);
 userAnswers.push({ question: question.text, userAnswer, isCorrect });

 const feedback = document.getElementById('feedback');
 feedback.textContent = isCorrect ? 'Correct!' : `Incorrect. Correct answer: ${question.answers.join(', ')}`;
 feedback.className = isCorrect ? 'correct' : 'incorrect';

 if (isCorrect) score++;

 setTimeout(() => {
 currentQuestionIndex++;
 if (currentQuestionIndex < 10) {
 showQuestion();
 } else {
 showResults();
 }
 }, 1500); // Delay to allow feedback to be seen
});

// Check if the user's answer is correct
function checkAnswer(question, userAnswer) {
 const correctAnswers = question.answers.map(a => a.toLowerCase());
 const userAnswers = userAnswer.map(a => a.toLowerCase());

 if (question.numRequired === 1) {
 return userAnswers.length === 1 && correctAnswers.includes(userAnswers[0]);
 } else {
 const selectedCorrect = userAnswers.filter(ua => correctAnswers.includes(ua));
 return selectedCorrect.length === question.numRequired && userAnswers.length === question.numRequired;
 }
}

// Display results and handle level progression
function showResults() {
 document.getElementById('quiz-container').style.display = 'none';
 document.getElementById('results').style.display = 'block';
 document.getElementById('progress').style.display = 'none';
 document.getElementById('score').textContent = `You got ${score} out of 10 correct (${currentLevel} level).`;

 const nextLevelButton = document.getElementById('next-level');
 nextLevelButton.style.display = 'none';

 if (score >= 6) {
 if (currentLevel === 'multiple-choice') {
 nextLevelButton.style.display = 'inline';
 nextLevelButton.onclick = () => startQuiz('fill-in-the-blank');
 } else {
 alert('Congratulations! You’ve passed the Fill-in-the-Blank level and completed the Civics Challenge!');
 }
 }

 document.getElementById('retry').onclick = () => startQuiz(currentLevel);
 document.getElementById('practice').onclick = () => {
 document.getElementById('results').style.display = 'none';
 document.getElementById('start-screen').style.display = 'block';
 };
}
​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​