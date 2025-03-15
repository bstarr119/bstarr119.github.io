// Array of all 100 civics test questions
const questions = [
    { text: "What is the supreme law of the land?", category: "American Government", requiredAnswers: 1, correctAnswers: ["the Constitution"] },
    { text: "What does the Constitution do?", category: "American Government", requiredAnswers: 1, correctAnswers: ["sets up the government", "defines the government", "protects basic rights of Americans"] },
    { text: "The idea of self-government is in the first three words of the Constitution. What are these words?", category: "American Government", requiredAnswers: 1, correctAnswers: ["We the People"] },
    { text: "What is an amendment?", category: "American Government", requiredAnswers: 1, correctAnswers: ["a change (to the Constitution)", "an addition (to the Constitution)"] },
    { text: "What do we call the first ten amendments to the Constitution?", category: "American Government", requiredAnswers: 1, correctAnswers: ["the Bill of Rights"] },
    { text: "What is one right or freedom from the First Amendment?", category: "American Government", requiredAnswers: 1, correctAnswers: ["speech", "religion", "assembly", "press", "petition the government"] },
    { text: "How many amendments does the Constitution have?", category: "American Government", requiredAnswers: 1, correctAnswers: ["twenty-seven (27)"] },
    { text: "What did the Declaration of Independence do?", category: "American History", requiredAnswers: 1, correctAnswers: ["announced our independence (from Great Britain)", "declared our independence (from Great Britain)", "said that the United States is free (from Great Britain)"] },
    { text: "What are two rights in the Declaration of Independence?", category: "American History", requiredAnswers: 2, correctAnswers: ["life", "liberty", "pursuit of happiness"] },
    { text: "What is freedom of religion?", category: "American Government", requiredAnswers: 1, correctAnswers: ["You can practice any religion, or not practice a religion."] },
    { text: "What is the economic system in the United States?", category: "American Government", requiredAnswers: 1, correctAnswers: ["capitalist economy", "market economy"] },
    { text: "What is the 'rule of law'?", category: "American Government", requiredAnswers: 1, correctAnswers: ["Everyone must follow the law.", "Leaders must obey the law.", "Government must obey the law.", "No one is above the law."] },
    { text: "Name one branch or part of the government.", category: "American Government", requiredAnswers: 1, correctAnswers: ["Congress", "legislative", "President", "executive", "the courts", "judicial"] },
    { text: "What stops one branch of government from becoming too powerful?", category: "American Government", requiredAnswers: 1, correctAnswers: ["checks and balances", "separation of powers"] },
    { text: "Who is in charge of the executive branch?", category: "American Government", requiredAnswers: 1, correctAnswers: ["the President"] },
    { text: "Who makes federal laws?", category: "American Government", requiredAnswers: 1, correctAnswers: ["Congress", "Senate and House (of Representatives)", "(U.S. or national) legislature"] },
    { text: "What are the two parts of the U.S. Congress?", category: "American Government", requiredAnswers: 2, correctAnswers: ["the Senate", "House (of Representatives)"] },
    { text: "How many U.S. Senators are there?", category: "American Government", requiredAnswers: 1, correctAnswers: ["one hundred (100)"] },
    { text: "We elect a U.S. Senator for how many years?", category: "American Government", requiredAnswers: 1, correctAnswers: ["six (6)"] },
    { text: "Who is one of your state’s U.S. Senators now? (Sample answer)", category: "American Government", requiredAnswers: 1, correctAnswers: ["Chuck Schumer"] },
    { text: "The House of Representatives has how many voting members?", category: "American Government", requiredAnswers: 1, correctAnswers: ["four hundred thirty-five (435)"] },
    { text: "We elect a U.S. Representative for how many years?", category: "American Government", requiredAnswers: 1, correctAnswers: ["two (2)"] },
    { text: "Name your U.S. Representative. (Sample answer)", category: "American Government", requiredAnswers: 1, correctAnswers: ["Nancy Pelosi"] },
    { text: "Who does a U.S. Senator represent?", category: "American Government", requiredAnswers: 1, correctAnswers: ["all people of the state"] },
    { text: "Why do some states have more Representatives than other states?", category: "American Government", requiredAnswers: 1, correctAnswers: ["(because of) the state’s population", "(because) they have more people", "(because) some states have more people"] },
    { text: "We elect a President for how many years?", category: "American Government", requiredAnswers: 1, correctAnswers: ["four (4)"] },
    { text: "In what month do we vote for President?", category: "American Government", requiredAnswers: 1, correctAnswers: ["November"] },
    { text: "What is the name of the President of the United States now? (As of 2023)", category: "American Government", requiredAnswers: 1, correctAnswers: ["Joe Biden"] },
    { text: "What is the name of the Vice President of the United States now? (As of 2023)", category: "American Government", requiredAnswers: 1, correctAnswers: ["Kamala Harris"] },
    { text: "If the President can no longer serve, who becomes President?", category: "American Government", requiredAnswers: 1, correctAnswers: ["the Vice President"] },
    { text: "If both the President and the Vice President can no longer serve, who becomes President?", category: "American Government", requiredAnswers: 1, correctAnswers: ["the Speaker of the House"] },
    { text: "Who is the Commander in Chief of the military?", category: "American Government", requiredAnswers: 1, correctAnswers: ["the President"] },
    { text: "Who signs bills to become laws?", category: "American Government", requiredAnswers: 1, correctAnswers: ["the President"] },
    { text: "Who vetoes bills?", category: "American Government", requiredAnswers: 1, correctAnswers: ["the President"] },
    { text: "What does the President’s Cabinet do?", category: "American Government", requiredAnswers: 1, correctAnswers: ["advises the President"] },
    { text: "What are two Cabinet-level positions?", category: "American Government", requiredAnswers: 2, correctAnswers: ["Secretary of Agriculture", "Secretary of Commerce", "Secretary of Defense", "Secretary of Education", "Secretary of Energy", "Secretary of Health and Human Services", "Secretary of Homeland Security", "Secretary of Housing and Urban Development", "Secretary of the Interior", "Secretary of Labor", "Secretary of State", "Secretary of Transportation", "Secretary of the Treasury", "Secretary of Veterans Affairs", "Attorney General", "Vice President"] },
    { text: "What does the judicial branch do?", category: "American Government", requiredAnswers: 1, correctAnswers: ["reviews laws", "explains laws", "resolves disputes (disagreements)", "decides if a law goes against the Constitution"] },
    { text: "What is the highest court in the United States?", category: "American Government", requiredAnswers: 1, correctAnswers: ["the Supreme Court"] },
    { text: "How many justices are on the Supreme Court? (As of 2023)", category: "American Government", requiredAnswers: 1, correctAnswers: ["nine (9)"] },
    { text: "Who is the Chief Justice of the United States now? (As of 2023)", category: "American Government", requiredAnswers: 1, correctAnswers: ["John Roberts"] },
    { text: "Under our Constitution, some powers belong to the federal government. What is one power of the federal government?", category: "American Government", requiredAnswers: 1, correctAnswers: ["to print money", "to declare war", "to create an army", "to make treaties"] },
    { text: "Under our Constitution, some powers belong to the states. What is one power of the states?", category: "American Government", requiredAnswers: 1, correctAnswers: ["provide schooling and education", "provide protection (police)", "provide safety (fire departments)", "give a driver’s license", "approve zoning and land use"] },
    { text: "Who is the Governor of your state now? (Sample answer)", category: "American Government", requiredAnswers: 1, correctAnswers: ["Gavin Newsom"] },
    { text: "What is the capital of your state? (Sample answer)", category: "Integrated Civics", requiredAnswers: 1, correctAnswers: ["Sacramento"] },
    { text: "What are the two major political parties in the United States?", category: "American Government", requiredAnswers: 2, correctAnswers: ["Democratic", "Republican"] },
    { text: "What is the political party of the President now? (As of 2023)", category: "American Government", requiredAnswers: 1, correctAnswers: ["Democratic"] },
    { text: "What is the name of the Speaker of the House of Representatives now? (As of 2023)", category: "American Government", requiredAnswers: 1, correctAnswers: ["Mike Johnson"] },
    { text: "What are two rights of everyone living in the United States?", category: "American Government", requiredAnswers: 2, correctAnswers: ["freedom of expression", "freedom of speech", "freedom of assembly", "freedom to petition the government", "freedom of religion", "the right to bear arms"] },
    { text: "What do we show loyalty to when we say the Pledge of Allegiance?", category: "Integrated Civics", requiredAnswers: 1, correctAnswers: ["the United States", "the flag"] },
    { text: "What is one promise you make when you become a United States citizen?", category: "American Government", requiredAnswers: 1, correctAnswers: ["give up loyalty to other countries", "defend the Constitution and laws of the United States", "obey the laws of the United States", "serve in the U.S. military (if needed)", "serve (do important work for) the nation (if needed)", "be loyal to the United States"] },
    { text: "How old do citizens have to be to vote for President?", category: "American Government", requiredAnswers: 1, correctAnswers: ["eighteen (18)"] },
    { text: "What are two ways that Americans can participate in their democracy?", category: "American Government", requiredAnswers: 2, correctAnswers: ["vote", "join a political party", "help with a campaign", "join a civic group", "join a community group", "give an elected official your opinion on an issue", "call Senators and Representatives", "publicly support or oppose an issue or policy", "run for office", "write to a newspaper"] },
    { text: "When is the last day you can send in federal income tax forms?", category: "American Government", requiredAnswers: 1, correctAnswers: ["April 15"] },
    { text: "When must all men register for the Selective Service?", category: "American Government", requiredAnswers: 1, correctAnswers: ["at age eighteen (18)", "between eighteen (18) and twenty-six (26)"] },
    { text: "What is one reason colonists came to America?", category: "American History", requiredAnswers: 1, correctAnswers: ["freedom", "political liberty", "religious freedom", "economic opportunity", "practice their religion", "escape persecution"] },
    { text: "Who lived in America before the Europeans arrived?", category: "American History", requiredAnswers: 1, correctAnswers: ["American Indians", "Native Americans"] },
    { text: "What group of people was taken to America and sold as slaves?", category: "American History", requiredAnswers: 1, correctAnswers: ["Africans", "people from Africa"] },
    { text: "Why did the colonists fight the British?", category: "American History", requiredAnswers: 1, correctAnswers: ["because of high taxes (taxation without representation)", "because the British army stayed in their houses (boarding, quartering)", "because they didn’t have self-government"] },
    { text: "Who wrote the Declaration of Independence?", category: "American History", requiredAnswers: 1, correctAnswers: ["(Thomas) Jefferson"] },
    { text: "When was the Declaration of Independence adopted?", category: "American History", requiredAnswers: 1, correctAnswers: ["July 4, 1776"] },
    { text: "There were 13 original states. Name three.", category: "American History", requiredAnswers: 3, correctAnswers: ["New Hampshire", "Massachusetts", "Rhode Island", "Connecticut", "New York", "New Jersey", "Pennsylvania", "Delaware", "Maryland", "Virginia", "North Carolina", "South Carolina", "Georgia"] },
    { text: "What happened at the Constitutional Convention?", category: "American History", requiredAnswers: 1, correctAnswers: ["The Constitution was written.", "The Founding Fathers wrote the Constitution."] },
    { text: "When was the Constitution written?", category: "American History", requiredAnswers: 1, correctAnswers: ["1787"] },
    { text: "The Federalist Papers supported the passage of the U.S. Constitution. Name one of the writers.", category: "American History", requiredAnswers: 1, correctAnswers: ["(James) Madison", "(Alexander) Hamilton", "(John) Jay", "Publius"] },
    { text: "What is one thing Benjamin Franklin is famous for?", category: "American History", requiredAnswers: 1, correctAnswers: ["U.S. diplomat", "oldest member of the Constitutional Convention", "first Postmaster General of the United States", "writer of 'Poor Richard’s Almanac'", "started the first free libraries"] },
    { text: "Who is the 'Father of Our Country'?", category: "American History", requiredAnswers: 1, correctAnswers: ["(George) Washington"] },
    { text: "Who was the first President?", category: "American History", requiredAnswers: 1, correctAnswers: ["(George) Washington"] },
    { text: "What territory did the United States buy from France in 1803?", category: "American History", requiredAnswers: 1, correctAnswers: ["the Louisiana Territory", "Louisiana"] },
    { text: "Name one war fought by the United States in the 1800s.", category: "American History", requiredAnswers: 1, correctAnswers: ["War of 1812", "Mexican-American War", "Civil War", "Spanish-American War"] },
    { text: "Name the U.S. war between the North and the South.", category: "American History", requiredAnswers: 1, correctAnswers: ["the Civil War", "the War between the States"] },
    { text: "Name one problem that led to the Civil War.", category: "American History", requiredAnswers: 1, correctAnswers: ["slavery", "economic reasons", "states’ rights"] },
    { text: "What was one important thing that Abraham Lincoln did?", category: "American History", requiredAnswers: 1, correctAnswers: ["freed the slaves (Emancipation Proclamation)", "saved (or preserved) the Union", "led the United States during the Civil War"] },
    { text: "What did the Emancipation Proclamation do?", category: "American History", requiredAnswers: 1, correctAnswers: ["freed the slaves", "freed slaves in the Confederacy", "freed slaves in the Confederate states", "freed slaves in most Southern states"] },
    { text: "What did Susan B. Anthony do?", category: "American History", requiredAnswers: 1, correctAnswers: ["fought for women’s rights", "fought for civil rights"] },
    { text: "Name one war fought by the United States in the 1900s.", category: "American History", requiredAnswers: 1, correctAnswers: ["World War I", "World War II", "Korean War", "Vietnam War", "Persian Gulf War"] },
    { text: "Who was President during World War I?", category: "American History", requiredAnswers: 1, correctAnswers: ["(Woodrow) Wilson"] },
    { text: "Who was President during the Great Depression and World War II?", category: "American History", requiredAnswers: 1, correctAnswers: ["(Franklin) Roosevelt"] },
    { text: "Who did the United States fight in World War II?", category: "American History", requiredAnswers: 3, correctAnswers: ["Japan", "Germany", "Italy"] },
    { text: "Before he was President, Eisenhower was a general. What war was he in?", category: "American History", requiredAnswers: 1, correctAnswers: ["World War II"] },
    { text: "During the Cold War, what was the main concern of the United States?", category: "American History", requiredAnswers: 1, correctAnswers: ["Communism"] },
    { text: "What movement tried to end racial discrimination?", category: "American History", requiredAnswers: 1, correctAnswers: ["civil rights (movement)"] },
    { text: "What did Martin Luther King, Jr. do?", category: "American History", requiredAnswers: 1, correctAnswers: ["fought for civil rights", "worked for equality for all Americans"] },
    { text: "What major event happened on September 11, 2001, in the United States?", category: "American History", requiredAnswers: 1, correctAnswers: ["Terrorists attacked the United States."] },
    { text: "Name one American Indian tribe in the United States.", category: "Integrated Civics", requiredAnswers: 1, correctAnswers: ["Cherokee", "Navajo", "Sioux", "Chippewa", "Choctaw", "Pueblo", "Apache", "Iroquois", "Creek", "Blackfeet", "Seminole", "Cheyenne", "Arawak", "Shawnee", "Mohegan", "Huron", "Oneida", "Lakota", "Crow", "Teton", "Hopi", "Inuit"] },
    { text: "Name one of the two longest rivers in the United States.", category: "Integrated Civics", requiredAnswers: 1, correctAnswers: ["Missouri (River)", "Mississippi (River)"] },
    { text: "What ocean is on the West Coast of the United States?", category: "Integrated Civics", requiredAnswers: 1, correctAnswers: ["Pacific (Ocean)"] },
    { text: "What ocean is on the East Coast of the United States?", category: "Integrated Civics", requiredAnswers: 1, correctAnswers: ["Atlantic (Ocean)"] },
    { text: "Name one U.S. territory.", category: "Integrated Civics", requiredAnswers: 1, correctAnswers: ["Puerto Rico", "U.S. Virgin Islands", "American Samoa", "Northern Mariana Islands", "Guam"] },
    { text: "Name one state that borders Canada.", category: "Integrated Civics", requiredAnswers: 1, correctAnswers: ["Maine", "New Hampshire", "Vermont", "New York", "Pennsylvania", "Ohio", "Michigan", "Minnesota", "North Dakota", "Montana", "Idaho", "Washington", "Alaska"] },
    { text: "Name one state that borders Mexico.", category: "Integrated Civics", requiredAnswers: 1, correctAnswers: ["California", "Arizona", "New Mexico", "Texas"] },
    { text: "What is the capital of the United States?", category: "Integrated Civics", requiredAnswers: 1, correctAnswers: ["Washington, D.C."] },
    { text: "Where is the Statue of Liberty?", category: "Integrated Civics", requiredAnswers: 1, correctAnswers: ["New York (Harbor)", "Liberty Island"] },
    { text: "Why does the flag have 13 stripes?", category: "Integrated Civics", requiredAnswers: 1, correctAnswers: ["because there were 13 original colonies", "because the stripes represent the original colonies"] },
    { text: "Why does the flag have 50 stars?", category: "Integrated Civics", requiredAnswers: 1, correctAnswers: ["because there is one star for each state", "because there are 50 states"] },
    { text: "What is the name of the national anthem?", category: "Integrated Civics", requiredAnswers: 1, correctAnswers: ["The Star-Spangled Banner"] },
    { text: "When do we celebrate Independence Day?", category: "Integrated Civics", requiredAnswers: 1, correctAnswers: ["July 4"] },
    { text: "Name two national U.S. holidays.", category: "Integrated Civics", requiredAnswers: 2, correctAnswers: ["New Year’s Day", "Martin Luther King, Jr. Day", "Presidents’ Day", "Memorial Day", "Independence Day", "Labor Day", "Columbus Day", "Veterans Day", "Thanksgiving", "Christmas"] }
];

// Game state variables
let currentMode = 'quiz';
let currentLevel = 'multiple-choice';
let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let unlockedFillInBlank = localStorage.getItem('unlockedFillInBlank') === 'true';

// Collect all possible answers for distractors
const allAnswers = new Set();
questions.forEach(q => q.correctAnswers.forEach(a => allAnswers.add(a)));

// Start the quiz
function startQuiz() {
    currentQuestions = questions.sort(() => 0.5 - Math.random()).slice(0, 10);
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
}

// Display the current question
function showQuestion() {
    const question = currentQuestions[currentQuestionIndex];
    document.getElementById('question-text').textContent = question.text;
    const optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = '';

    if (currentLevel === 'multiple-choice') {
        const options = generateOptions(question);
        if (question.requiredAnswers === 1) {
            options.forEach(opt => {
                const label = document.createElement('label');
                label.innerHTML = `<input type="radio" name="answer" value="${opt}"> ${opt}`;
                optionsDiv.appendChild(label);
                optionsDiv.appendChild(document.createElement('br'));
            });
        } else {
            options.forEach(opt => {
                const label = document.createElement('label');
                label.innerHTML = `<input type="checkbox" name="answer" value="${opt}"> ${opt}`;
                optionsDiv.appendChild(label);
                optionsDiv.appendChild(document.createElement('br'));
            });
        }
    } else {
        for (let i = 0; i < question.requiredAnswers; i++) {
            const input = document.createElement('input');
            input.type = 'text';
            input.name = `answer-${i}`;
            input.placeholder = `Answer ${i + 1}`;
            optionsDiv.appendChild(input);
            optionsDiv.appendChild(document.createElement('br'));
        }
    }
}

// Generate multiple-choice options
function generateOptions(question) {
    const options = [];
    const correct = question.correctAnswers;
    const required = question.requiredAnswers;

    if (required === 1) {
        const correctAnswer = correct[Math.floor(Math.random() * correct.length)];
        options.push(correctAnswer);
        while (options.length < 4) {
            const distractor = Array.from(allAnswers)[Math.floor(Math.random() * allAnswers.size)];
            if (!correct.includes(distractor) && !options.includes(distractor)) {
                options.push(distractor);
            }
        }
    } else {
        const numCorrectToShow = Math.min(4, correct.length);
        const selectedCorrect = correct.sort(() => 0.5 - Math.random()).slice(0, numCorrectToShow);
        options.push(...selectedCorrect);
        while (options.length < 6) {
            const distractor = Array.from(allAnswers)[Math.floor(Math.random() * allAnswers.size)];
            if (!correct.includes(distractor) && !options.includes(distractor)) {
                options.push(distractor);
            }
        }
    }
    return options.sort(() => 0.5 - Math.random());
}

// Check the user's answer
function checkAnswer(question, userAnswers) {
    if (currentLevel === 'multiple-choice') {
        if (question.requiredAnswers === 1) {
            return userAnswers.length === 1 && question.correctAnswers.includes(userAnswers[0]);
        } else {
            if (userAnswers.length !== question.requiredAnswers) return false;
            return userAnswers.every(ans => question.correctAnswers.includes(ans));
        }
    } else {
        const normalizedUserAnswers = userAnswers.map(ans => ans.toLowerCase().trim()).filter(ans => ans !== '');
        const correctSet = new Set(question.correctAnswers.map(ans => ans.toLowerCase().trim()));
        const userSet = new Set(normalizedUserAnswers);
        if (userSet.size !== question.requiredAnswers) return false;
        return normalizedUserAnswers.every(ans => correctSet.has(ans));
    }
}

// End the quiz and show results
function endQuiz() {
    const card = document.getElementById('question-card');
    card.innerHTML = `<h2>Quiz Completed</h2><p>You scored ${score} out of 10.</p>`;
    if (score >= 6) {
        card.innerHTML += '<p>Congratulations! You passed the quiz and unlocked Fill-in-the-Blank Mode!</p>';
        unlockedFillInBlank = true;
        localStorage.setItem('unlockedFillInBlank', 'true');
        document.getElementById('fill-in-blank-mode').disabled = false;
    } else {
        card.innerHTML += '<p>Sorry, you did not pass. Try again to unlock Fill-in-the-Blank Mode!</p>';
    }
}

// Event listeners
document.getElementById('submit-button').addEventListener('click', () => {
    const question = currentQuestions[currentQuestionIndex];
    let userAnswers = [];
    if (currentLevel === 'multiple-choice') {
        if (question.requiredAnswers === 1) {
            const selected = document.querySelector('input[name="answer"]:checked');
            if (selected) userAnswers = [selected.value];
        } else {
            const checked = document.querySelectorAll('input[name="answer"]:checked');
            userAnswers = Array.from(checked).map(input => input.value);
        }
    } else {
        const inputs = document.querySelectorAll('#options input[type="text"]');
        userAnswers = Array.from(inputs).map(input => input.value.trim());
    }

    const feedback = document.getElementById('feedback');
    const isCorrect = checkAnswer(question, userAnswers);
    if (isCorrect) {
        score++;
        feedback.textContent = 'Correct!';
        feedback.style.color = 'green';
    } else {
        feedback.textContent = `Incorrect. Correct answer(s): ${question.correctAnswers.join(', ')}`;
        feedback.style.color = 'red';
    }

    setTimeout(() => {
        feedback.textContent = '';
        currentQuestionIndex++;
        if (currentQuestionIndex < 10) {
            showQuestion();
        } else {
            endQuiz();
        }
    }, 2000);
});

document.getElementById('quiz-mode').addEventListener('click', () => {
    currentMode = 'quiz';
    currentLevel = 'multiple-choice';
    startQuiz();
});

document.getElementById('fill-in-blank-mode').addEventListener('click', () => {
    if (unlockedFillInBlank) {
        currentMode = 'quiz';
        currentLevel = 'fill-in-the-blank';
        startQuiz();
    }
});

document.getElementById('practice-mode').addEventListener('click', () => {
    alert('Practice Mode is not implemented yet. Please use Quiz Mode.');
});

// Initialize the game
if (unlockedFillInBlank) {
    document.getElementById('fill-in-blank-mode').disabled = false;
}
startQuiz();
​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​