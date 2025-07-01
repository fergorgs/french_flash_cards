let verbs = [];
let currentVerbIndex = 0;
let fields = ["sign", "presJe", "presTu", "presIl", "presNous", "presVous", "presIls", "passComp", "passImpJe", "passImpTu", "passImpIl", "passImpNous", "passImpVous", "passImpIls", "maisPer"]

async function loadVerbs() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/fergorgs/french_flash_cards/refs/heads/master/verbs.json');
        verbs = await response.json();
        displayCurrentVerb();
    } catch (error) {
        console.error('Error loading verbs:', error);
    }
}

function displayCurrentVerb() {
    if (verbs.length > 0) {
        document.getElementById('verb-display').textContent = verbs[currentVerbIndex].verb;
        clearInputs();
        clearResult();
    }
}

function clearInputs() {
    for (const field of fields) {
        document.getElementById(field).value = '';
        document.getElementById(field).className = '';
        const correctSpan = document.getElementById(field + '-correct');
        if (correctSpan) correctSpan.remove();
    }
}

function clearResult() {
    document.getElementById('result').textContent = '';
}

function checkAnswers() {
    const currentVerb = verbs[currentVerbIndex];
    let correct = 0;
    let total = 15;
    
    for (const field of fields) {
        const input = document.getElementById(field);
        const userAnswer = input.value.trim().toLowerCase();
        const correctAnswer = currentVerb[field].toLowerCase();
        
        if (userAnswer === correctAnswer) {
            input.className = 'correct';
            correct++;
        } else {
            input.className = 'incorrect';
            const correctSpan = document.createElement('span');
            correctSpan.id = field + '-correct';
            correctSpan.className = 'correct-answer';
            correctSpan.textContent = currentVerb[field];
            input.parentNode.appendChild(correctSpan);
        }
    }
    
    document.getElementById('result').textContent = `Score: ${correct}/${total}`;
}

function nextVerb() {
    currentVerbIndex = Math.floor(Math.random() * verbs.length);
    displayCurrentVerb();
}

document.getElementById('check-btn').addEventListener('click', checkAnswers);
document.getElementById('next-btn').addEventListener('click', nextVerb);

loadVerbs();