// question-creation.js

const addQuestionButton = document.getElementById('add-question');
const questionPopup = document.getElementById('question-popup');
const overlay = document.getElementById('overlay');
const closePopupButton = document.getElementById('close-popup');
const questionList = document.getElementById('question-list');
const saveQuestionButton = document.getElementById('save-question');
const timeLimitInput = document.getElementById('time-limit');
const timeLimitError = document.getElementById('time-limit-error');
const answerList = document.getElementById('answer-list');
const questionTextInput = document.getElementById('question-text');

// Show popup for adding a question
addQuestionButton.addEventListener('click', () => {
  questionPopup.classList.add('active');
  overlay.classList.add('active');
  timeLimitError.textContent = ''; // Clear any previous error messages
  validateInputs(); 
});

// Close popup
overlay.addEventListener('click', closePopup);
closePopupButton.addEventListener('click', closePopup);
saveQuestionButton.disabled = true;

// Add event listeners for validation
timeLimitInput.addEventListener('input', validateInputs);
questionTextInput.addEventListener('input', validateInputs); // Validate on question input
document.querySelectorAll('input[name="question-type"]').forEach((radio) => {
  radio.addEventListener('change', editAnswerOptions);
});

// Function to close the popup and clear the form
function closePopup() {
  questionPopup.classList.remove('active');
  overlay.classList.remove('active');
  clearForm(); 
}

// Validate inputs to enable/disable save button
function validateInputs() {
  const questionText = questionTextInput.value.trim();
  const timeLimit = parseInt(timeLimitInput.value);
  const questionType = document.querySelector('input[name="question-type"]:checked');
  let isValid = questionText !== '' && !isNaN(timeLimit) && timeLimit >= 10 && timeLimit <= 60 && questionType;

  // Time limit validation message
  if (isNaN(timeLimit) || timeLimit < 10 || timeLimit > 60) {
    timeLimitError.textContent = 'Time limit must be between 10 and 60 seconds.';
    timeLimitError.classList.add('visible');
  } else {
    timeLimitError.textContent = '';
    timeLimitError.classList.remove('visible');
  }

  if (questionType && questionType.value === 'multiple-choice') {
    const answerInputs = Array.from(answerList.querySelectorAll('input[type="text"]'));
    const correctAnswer = Array.from(answerList.querySelectorAll('input[type="radio"]')).some(radio => radio.checked);
    if (answerInputs.length !== 4 || answerInputs.some(input => input.value.trim() === '') || !correctAnswer) {
      isValid = false;
    }
  } else if (questionType && questionType.value === 'true-false') {
    const correctAnswer = Array.from(answerList.querySelectorAll('input[type="radio"]')).some(radio => radio.checked);
    if (!correctAnswer) {
      isValid = false;
    }
  }

  saveQuestionButton.disabled = !isValid;
}

// Edit answer options based on question type selection
function editAnswerOptions() {
  answerList.innerHTML = '';
  const questionType = document.querySelector('input[name="question-type"]:checked').value;

  if (questionType === 'true-false') {
    ['True', 'False'].forEach((text) => {
      const answer = document.createElement('li');
      answer.innerHTML = `
        <input type="text" value="${text}" readonly>
        <input type="radio" name="correct-answer">
      `;
      answerList.appendChild(answer);
    });

    answerList.querySelectorAll('input[type="radio"]').forEach(radio => {
      radio.addEventListener('change', validateInputs);
    });

  } else if (questionType === 'multiple-choice') {
    for (let i = 0; i < 4; i++) {
      const answer = document.createElement('li');
      answer.innerHTML = `
        <input type="text" placeholder="Option ${i + 1}">
        <input type="radio" name="correct-answer">
      `;
      answerList.appendChild(answer);
    }

    answerList.querySelectorAll('input[type="text"]').forEach(input => {
      input.addEventListener('input', validateInputs);
    });

    answerList.querySelectorAll('input[type="radio"]').forEach(radio => {
      radio.addEventListener('change', validateInputs);
    });
  }

  validateInputs();
}

// Function to save question
saveQuestionButton.addEventListener('click', saveQuestion); // Ensure button click triggers save

function saveQuestion() {
  console.log('Attempting to save question...'); // Debug log
  const questionText = questionTextInput.value.trim();
  const questionType = document.querySelector('input[name="question-type"]:checked')?.value;
  const timeLimit = parseInt(timeLimitInput.value);

  if (!questionText || !questionType || isNaN(timeLimit)) {
    console.error('Missing required fields'); // Log error if fields are missing
    return;
  }

  const answers = [];
  let correctAnswer = null;

  answerList.querySelectorAll('li').forEach((li) => {
    const answerText = li.querySelector('input[type="text"]').value;
    const isCorrect = li.querySelector('input[type="radio"]').checked;
    answers.push(answerText);
    if (isCorrect) correctAnswer = answerText;
  });

  // Create a question item for the list
  const questionItem = document.createElement('li');
  questionItem.classList.add('question-item');

  questionItem.innerHTML = `
    <div class="question-header">
      <p><strong></strong></p> <!-- Placeholder for dynamic numbering -->
      <p><em>Time Limit: ${timeLimit}s</em></p>
      <p>${questionText}</p>
    </div>
    <div class="answer-container">
      ${answers.map(answer => `<p class="answer-item">${answer} ${answer === correctAnswer ? '(Correct)' : ''}</p>`).join('')}
    </div>
  `;
  
  const deleteButton = document.createElement('button');
  deleteButton.classList.add('delete-button');
  deleteButton.textContent = 'Delete';
  deleteButton.onclick = () => {
    questionItem.remove();
    renumberQuestions(); // Renumber questions after deletion
  };

  questionItem.appendChild(deleteButton);
  questionList.appendChild(questionItem);

  console.log('Question saved successfully.'); // Confirm save success
  renumberQuestions(); // Renumber questions after adding a new one
  clearForm();
}

// Function to renumber questions
function renumberQuestions() {
  const questionItems = document.querySelectorAll('.question-item');
  questionItems.forEach((item, index) => {
    const questionNumberElement = item.querySelector('.question-header p strong');
    questionNumberElement.textContent = `${index + 1}. ${item.querySelector('.question-header').textContent.includes('True/False') ? 'True/False' : 'Multiple Choice'} Question`;
  });
}

// Function to clear form inputs after saving
function clearForm() {
  if (document.querySelector('input[name="question-type"]:checked')) {
    document.querySelector('input[name="question-type"]:checked').checked = false;
  }
  questionTextInput.value = '';
  timeLimitInput.value = '';
  answerList.innerHTML = '';
  validateInputs();
}
