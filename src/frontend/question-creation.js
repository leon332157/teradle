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

// Global variable to track editing state
let editingItem = null;

function saveQuestion() {
  const questionText = questionTextInput.value.trim();
  const questionType = document.querySelector('input[name="question-type"]:checked')?.value;
  const timeLimit = parseInt(timeLimitInput.value);

  if (!questionText || !questionType || isNaN(timeLimit)) {
    console.error('Missing required fields');
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

  // Use the question template
  const template = document.getElementById('question-template');
  const questionItem = template.content.cloneNode(true);

  // Fill the template with question data
  questionItem.querySelector('.question-title').textContent = `${questionText}`;
  questionItem.querySelector('.time-limit').textContent = `Time Limit: ${timeLimit}s`;

  const answerContainer = questionItem.querySelector('.answer-container');
  answers.forEach((answer) => {
    const answerElement = document.createElement('p');
    answerElement.classList.add('answer-item');
    answerElement.textContent = `${answer}${answer === correctAnswer ? ' (Correct)' : ''}`;
    answerContainer.appendChild(answerElement);
  });

  // Add event listeners for edit and delete buttons
  const editButton = questionItem.querySelector('.edit-button');
  const deleteButton = questionItem.querySelector('.delete-button');

  editButton.onclick = () => {
    // Set editing state
    editingItem = editButton.closest('.question-item');
    questionPopup.classList.add('active');
    overlay.classList.add('active');

    // Populate form with current question data
    timeLimitInput.value = timeLimit;
    questionTextInput.value = questionText;
    document.querySelector(`input[value="${questionType}"]`).checked = true;
    editAnswerOptions();
    answerList.querySelectorAll('li').forEach((li, index) => {
      li.querySelector('input[type="text"]').value = answers[index];
      li.querySelector('input[type="radio"]').checked = answers[index] === correctAnswer;
    });
    validateInputs();
  };

  deleteButton.onclick = () => {
    const itemToDelete = deleteButton.closest('.question-item');
    itemToDelete.remove();
    renumberQuestions();
  };

  // Append or replace the question item
  if (editingItem) {
    questionList.replaceChild(questionItem, editingItem);
    editingItem = null; // Clear editing state
  } else {
    questionList.appendChild(questionItem);
  }

  closePopup();
  // Renumber questions and clear the form
  renumberQuestions();
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
