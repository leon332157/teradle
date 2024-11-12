const addQuestionButton = document.getElementById('add-question');
const questionPopup = document.getElementById('question-popup');
const overlay = document.getElementById('overlay');
const questionList = document.getElementById('question-list');
const saveQuestionButton = document.getElementById('save-question');
const timeLimitInput = document.getElementById('time-limit');
const timeLimitError = document.getElementById('time-limit-error');

let questionNumber = 1; // Track question number

addQuestionButton.addEventListener('click', () => {
  questionPopup.classList.add('active');
  overlay.classList.add('active');

  timeLimitError.textContent = 'The time limit must be between 10 and 60 seconds.';
  timeLimitError.classList.add('visible');
  timeLimitInput.style.color = 'black';
});

overlay.addEventListener('click', () => {
  closePopup();
});

saveQuestionButton.addEventListener('click', () => {
  saveQuestion();
  closePopup();
});

// Automatically adjust the time limit if it goes out of range (10-60) when typing
timeLimitInput.addEventListener('input', () => {
  adjustTimeLimit();
});

// Adjust the time limit when the Enter key is pressed
timeLimitInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    adjustTimeLimit();
  }
});

function adjustTimeLimit() {
  let timeLimit = parseInt(timeLimitInput.value);

  if (isNaN(timeLimit)) {
    timeLimitInput.value = ''; 
    timeLimitError.classList.add('visible'); 
  } else if (timeLimit < 10 || timeLimit > 60) {
    timeLimitInput.style.color = 'red'; 
    timeLimitError.classList.add('visible'); 
  } else {
    timeLimitInput.style.color = 'black'; 
    timeLimitError.classList.remove('visible'); 
  }
}

// Close the popup and overlay
function closePopup() {
  questionPopup.classList.remove('active');
  overlay.classList.remove('active');
}

function editAnswerOptions() {
  const answerList = document.getElementById('answer-list');
  answerList.innerHTML = '';
  const questionTypeElement = document.querySelector('input[name="question-type"]:checked');
  const questionType = questionTypeElement ? questionTypeElement.value : null;
  
  if (questionType === 'true-false') {
    const trueAnswer = document.createElement('li');
    const falseAnswer = document.createElement('li');

    trueAnswer.innerHTML = `<input type="text" value="True">`;
    falseAnswer.innerHTML = `<input type="text" value="False">`;
    
    answerList.appendChild(trueAnswer);
    answerList.appendChild(falseAnswer);
  } else if (questionType === 'multiple-choice') {
    for (let i = 0; i < 4; i++) {
      const answer = document.createElement('li');
      answer.innerHTML = `<input type="text" value="Option ${i + 1}">`;
      answerList.appendChild(answer);
    }
  }
}

function saveQuestion() {
  const questionTypeElement = document.querySelector('input[name="question-type"]:checked');
  const questionType = questionTypeElement ? questionTypeElement.value : null;
  const questionName = questionType === 'true-false' ? 'True/False' : 'Multiple Choice';
  let timeLimit = parseInt(timeLimitInput.value);

  if (isNaN(timeLimit) || timeLimit < 10) {
    timeLimit = 10;
  } else if (timeLimit > 60) {
    timeLimit = 60;
  }

  timeLimitInput.style.color = 'black';
  timeLimitError.classList.remove('visible');
  
  const answers = [];
  document.querySelectorAll('#answer-list input[type="text"]').forEach(input => {
    answers.push(input.value);
  });

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
