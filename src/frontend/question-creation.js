const addQuestionButton = document.getElementById('add-question');
const saveQuizButton = document.getElementById('save-quiz');
const deleteQuizButton = document.getElementById('delete-quiz');
const questionPopup = document.getElementById('question-popup');
const overlay = document.getElementById('overlay');
const closePopupButton = document.getElementById('close-popup');
const questionList = document.getElementById('question-list');
const saveQuestionButton = document.getElementById('save-question');
const timeLimitInput = document.getElementById('time-limit');
const timeLimitError = document.getElementById('time-limit-error');
const answerList = document.getElementById('answer-list');
const questionTextInput = document.getElementById('question-text');

let editingItem = null;
let editingIndex = -1;
let isUpdating = false;
let pageQuizId;

const Quiz = {
  name: '',
  questions: [],
};

// Show popup for adding a question
addQuestionButton.addEventListener('click', () => {
  questionPopup.classList.add('active');
  overlay.classList.add('active');
  timeLimitError.textContent = ''; // Clear any previous error messages
  validateInputs(); 
});

// Function to save question
saveQuestionButton.addEventListener('click', saveQuestion);

// Function to save quiz
saveQuizButton.addEventListener('click', () => isUpdating ? updateQuiz(pageQuizId) : saveQuiz());
deleteQuizButton.addEventListener('click', () => {if (isUpdating) {deleteQuiz(pageQuizId)}});

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

document.addEventListener('DOMContentLoaded', async () => {
  const searchParams = new URLSearchParams(window.location.search);
  const quizId = parseInt(searchParams.get("id"));

  console.log('Quiz ID:', quizId);
  if (quizId) {
    await loadQuiz(quizId);
    isUpdating = true;
    pageQuizId = quizId;
  }
})

async function loadQuiz(quizID) {
  fetch(`api/quiz/single?quizId=${quizID}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(res => {
      return res.json();
    })
    .then((quizData) => {
      console.log(quizData);
      if (!quizData || !quizData.id || !quizData.name || !Array.isArray(quizData.questions)) {
        throw new Error('Invalid quiz data');
      }
  
      Quiz.name = quizData.name;
      Quiz.questions = quizData.questions;
  
      document.getElementById('quiz-name').value = Quiz.name;
  
      Quiz.questions.forEach((question) => {
        const questionItem = convertJSONtoHTML(question);
        questionList.appendChild(questionItem);
      });
    })
    .catch ((e) =>{
      console.error('Failed to load quiz:', e);
      alert('Error: Could not load quiz. Please try again later.');
      window.location.href = '/create-quiz';
    });
}

function saveQuiz() {
  const quizName = document.getElementById('quiz-name').value.trim();
  Quiz.name = quizName;
  if (!quizName) {
    alert('Quiz name cannot be empty.');
    return;
  }

  console.log('Saving quiz:', Quiz);
  
  fetch('/api/quiz/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(Quiz),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Quiz saved:', data);
    alert('Quiz saved successfully!');
  })
  .catch((error) => {
    console.error('Error saving quiz:', error);
    alert('Failed to save quiz.');
  });
}

function updateQuiz(quizID) {
  console.log('here');
  const quizName = document.getElementById('quiz-name').value.trim();
  Quiz.name = quizName;
  if (!quizName) {
    alert('Quiz name cannot be empty.');
    return;
  }

  console.log('Updating quiz:', Quiz);
  
  fetch(`/api/quiz/update?quizId=${quizID}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({id: quizID, name: Quiz.name, questions: Quiz.questions}),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Quiz updated:', data);
    alert('Quiz updated successfully!');
  })
  .catch((error) => {
    console.error('Error updating quiz:', error);
    alert('Failed to update quiz.');
  });
}

function deleteQuiz(quizID) {
  fetch(`/api/quiz/delete?quizId=${quizID}`, {
    method: 'DELETE',
  })
  .then((response) => {
    if (response.ok) {
      const data = response.json();
      console.log('Quiz deleted:', data);
      alert('Quiz deleted successfully!');
      window.location.href = "/";
    } else {
      console.error('Error deleting quiz');
      alert('Failed to delete quiz.');
    }
  })
  .catch((error) => {
    console.error('Error deleting quiz:', error);
    alert('Failed to delete quiz.');
  });
}

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

function saveQuestion() {
  const questionText = questionTextInput.value.trim();
  const questionType = document.querySelector('input[name="question-type"]:checked')?.value;
  const timeLimit = parseInt(timeLimitInput.value);
  const options = [];
  let answer = -1;

  answerList.querySelectorAll('li').forEach((li, i) => {
    const answerText = li.querySelector('input[type="text"]').value;
    const isCorrect = li.querySelector('input[type="radio"]').checked;
    options.push(answerText);
    if (isCorrect) answer = i;
  });

  const Question = {
    type: questionType === 'multiple-choice' ? 'multiple' : 'single',
    question: questionText,
    options: options,
    answer: answer,
    timeLimit: timeLimit,
  };

  const questionItem = convertJSONtoHTML(Question);

  // Append or replace the question item
  if (editingItem && editingIndex >= 0) {
    questionList.replaceChild(questionItem, editingItem);
    Quiz.questions[editingIndex] = Question;
    editingItem = null;
    editingIndex = -1;
  } else {
    questionList.appendChild(questionItem);
    Quiz.questions.push(Question);
  }

  closePopup();
  renumberQuestions();
  clearForm();
}

function convertJSONtoHTML (question) {
  const questionText = question.question;
  const answers = question.options;
  const answerIndex = question.answer;
  const timeLimit = question.timeLimit;
  const questionType = question.type === 'multiple' ? 'multiple-choice' : 'true-false';
  // Use the question template
  console.log(question);
  const template = document.getElementById('question-template');
  const questionItem = template.content.cloneNode(true);

  // Fill the template with question data
  questionItem.querySelector('.question-title').textContent = `${questionText}`;
  questionItem.querySelector('.time-limit').textContent = `Time Limit: ${timeLimit}s`;

  const answerContainer = questionItem.querySelector('.answer-container');
  
  answers.forEach((answer) => {
    const answerElement = document.createElement('p');
    answerElement.classList.add('answer-item');
    answerElement.textContent = `${answer}${answer === answers[answerIndex] ? ' (Correct)' : ''}`;
    answerContainer.appendChild(answerElement);
  });

  // Add event listeners for edit and delete buttons
  const editButton = questionItem.querySelector('.edit-button');
  const deleteButton = questionItem.querySelector('.delete-button');

  editButton.onclick = () => {
    // Set editing state
    const questionItems = Array.from(document.querySelectorAll('.question-item'));
    editingItem = editButton.closest('.question-item');
    editingIndex = questionItems.indexOf(editingItem);
    questionPopup.classList.add('active');
    overlay.classList.add('active');

    // Populate form with current question data
    timeLimitInput.value = timeLimit;
    questionTextInput.value = questionText;
    document.querySelector(`input[value="${questionType}"]`).checked = true;
    editAnswerOptions();
    answerList.querySelectorAll('li').forEach((li, i) => {
      li.querySelector('input[type="text"]').value = answers[i];
      li.querySelector('input[type="radio"]').checked = i === answerIndex;
    });
    validateInputs();
  };

  deleteButton.onclick = () => {
    const questionItems = Array.from(document.querySelectorAll('.question-item'));  
    const itemToDelete = deleteButton.closest('.question-item');
    const index = questionItems.indexOf(itemToDelete);
    console.log(index);
    itemToDelete.remove();
    Quiz.questions = Quiz.questions.filter((_, i) => i !== index);
    renumberQuestions();
  };

  return questionItem;
}

// Function to renumber questions
function renumberQuestions() {
  const questionItems = document.querySelectorAll('.question-item');
  questionItems.forEach((item) => {
    const questionHeader = item.querySelector('.question-header');
    const questionTitleElement = questionHeader?.querySelector('.question-title');

    if (questionTitleElement) {
      questionTitleElement.textContent = `${questionTitleElement.textContent}`;
    } else {
      console.error('Invalid question item structure:', item);
    }
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