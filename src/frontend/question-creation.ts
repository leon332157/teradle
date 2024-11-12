const addQuestionButton = document.getElementById('add-question') as HTMLButtonElement;
const questionPopup = document.getElementById('question-popup') as HTMLDivElement;
const overlay = document.getElementById('overlay') as HTMLDivElement;
const questionList = document.getElementById('question-list') as HTMLUListElement;
const saveQuestionButton = document.getElementById('save-question') as HTMLButtonElement;

let questionNumber = 1; // Track question number

addQuestionButton.addEventListener('click', () => {
  questionPopup.classList.add('active');
  overlay.classList.add('active');
});

overlay.addEventListener('click', () => {
  closePopup();
});

saveQuestionButton.addEventListener('click', () => {
  saveQuestion();
  closePopup();
});

// Close the popup and overlay
function closePopup(): void {
  questionPopup.classList.remove('active');
  overlay.classList.remove('active');
}

function editAnswerOptions(): void {
  const answerList = document.getElementById('answer-list') as HTMLUListElement;
  answerList.innerHTML = '';
  const questionType = (document.querySelector('input[name="question-type"]:checked') as HTMLInputElement).value;
  
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

function saveQuestion(): void {
    const questionType = (document.querySelector('input[name="question-type"]:checked') as HTMLInputElement).value;
    const questionName = questionType === 'true-false' ? 'True/False' : 'Multiple Choice';
    const timeLimitInput = document.getElementById('time-limit') as HTMLInputElement;
    let timeLimit = parseInt(timeLimitInput.value);
  
    if (timeLimit < 10) {
      timeLimit = 10;
      timeLimitInput.value = timeLimit.toString();
    } else if (timeLimit > 60) {
      timeLimit = 60;
      timeLimitInput.value = timeLimit.toString();
    }
  
    const answers: string[] = [];
    document.querySelectorAll('#answer-list input[type="text"]').forEach(input => {
      answers.push((input as HTMLInputElement).value);
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
  
  
