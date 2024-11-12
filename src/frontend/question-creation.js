const addQuestionButton = document.getElementById('add-question');
const questionPopup = document.getElementById('question-popup');
const overlay = document.getElementById('overlay');
const closePopupButton = document.getElementById('close-popup');
const questionList = document.getElementById('question-list');
const saveQuestionButton = document.getElementById('save-question');
const timeLimitInput = document.getElementById('time-limit');
const timeLimitError = document.getElementById('time-limit-error');
const answerList = document.getElementById('answer-list');

let questionNumber = 1;

addQuestionButton.addEventListener('click', () => {
  questionPopup.classList.add('active');
  overlay.classList.add('active');
  timeLimitError.textContent = 'The time limit must be between 10 and 60 seconds.';
  validateInputs(); 
});

overlay.addEventListener('click', closePopup);

closePopupButton.addEventListener('click', closePopup);

saveQuestionButton.disabled = true;

timeLimitInput.addEventListener('input', validateInputs);
document.querySelectorAll('input[name="question-type"]').forEach((radio) => {
  radio.addEventListener('change', editAnswerOptions);
});

timeLimitInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    validateInputs();
  }
});

saveQuestionButton.addEventListener('click', () => {
  saveQuestion();
  closePopup();
});

function closePopup() {
  questionPopup.classList.remove('active');
  overlay.classList.remove('active');
  clearForm(); 
}

function validateInputs() {
  const timeLimit = parseInt(timeLimitInput.value);
  const questionType = document.querySelector('input[name="question-type"]:checked');
  let isValid = true;

  if (isNaN(timeLimit) || timeLimit < 10 || timeLimit > 60) {
    timeLimitError.classList.add('visible');
    isValid = false;
  } else {
    timeLimitError.classList.remove('visible');
  }

  if (!questionType) {
    isValid = false;
  } else if (questionType.value === 'multiple-choice') {
    const answerInputs = Array.from(answerList.querySelectorAll('input[type="text"]'));
    if (answerInputs.length !== 4 || answerInputs.some(input => input.value.trim() === '')) {
      isValid = false;
    }
  }

  saveQuestionButton.disabled = !isValid;
}

function editAnswerOptions() {
  answerList.innerHTML = '';
  const questionTypeElement = document.querySelector('input[name="question-type"]:checked');
  const questionType = questionTypeElement ? questionTypeElement.value : null;

  if (questionType === 'true-false') {
    const trueAnswer = document.createElement('li');
    const falseAnswer = document.createElement('li');

    trueAnswer.innerHTML = `<input type="text" value="True" readonly>`;
    falseAnswer.innerHTML = `<input type="text" value="False" readonly>`;
    
    answerList.appendChild(trueAnswer);
    answerList.appendChild(falseAnswer);
  } else if (questionType === 'multiple-choice') {
    for (let i = 0; i < 4; i++) {
      const answer = document.createElement('li');
      answer.innerHTML = `<input type="text" placeholder="Option ${i + 1}">`;
      answerList.appendChild(answer);
    }

    answerList.querySelectorAll('input[type="text"]').forEach(input => {
      input.addEventListener('input', validateInputs);
    });
  }

  validateInputs(); 
}

function saveQuestion() {
  const questionTypeElement = document.querySelector('input[name="question-type"]:checked');
  const questionType = questionTypeElement ? questionTypeElement.value : null;
  const questionName = questionType === 'true-false' ? 'True/False' : 'Multiple Choice';
  let timeLimit = parseInt(timeLimitInput.value);

  const answers = [];
  document.querySelectorAll('#answer-list input[type="text"]').forEach(input => {
    answers.push(input.value);
  });

  // Create the question item for the list
  const questionItem = document.createElement('li');
  questionItem.classList.add('question-item');

  const questionHeader = document.createElement('div');
  questionHeader.classList.add('question-header');
  questionHeader.innerHTML = `
    <p><strong>${questionNumber}. ${questionName} Question</strong></p>
    <p><em>Time Limit: ${timeLimit}s</em></p>
  `;

  const answerContainer = document.createElement('div');
  answerContainer.classList.add('answer-container');
  answers.forEach(answerText => {
    const answerElement = document.createElement('p');
    answerElement.classList.add('answer-item');
    answerElement.textContent = answerText;
    answerContainer.appendChild(answerElement);
  });

  const deleteButton = document.createElement('button');
  deleteButton.classList.add('delete-button');
  deleteButton.textContent = 'Delete';
  deleteButton.onclick = () => questionItem.remove();

  questionItem.appendChild(questionHeader);
  questionItem.appendChild(answerContainer);
  questionItem.appendChild(deleteButton);
  questionList.appendChild(questionItem);

  questionNumber++;
}

function clearForm() {
  document.querySelector('input[name="question-type"]:checked').checked = false;
  timeLimitInput.value = '';
  answerList.innerHTML = '';
  validateInputs();
}
