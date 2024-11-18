/*
Question information such as time remaining, question number, and question text should be fetched into localstorage
username should be stored cookie

*/

document.addEventListener('DOMContentLoaded', initPage);
const userNameElem = document.getElementById('username');
const questionTitleElem = document.getElementById('question-title');
const questionDetailElem = document.getElementById('question-detail');

let timerEvent: number;

function initPage() {
    const answerList = document.querySelector('.answer');
    if (answerList) {
        answerList.childNodes.forEach((node) => {
            node.addEventListener('click', (event) => {
            });

        })
    }

    const timer_elem = document.getElementById('nav-timer');
    //const timeInit = localStorage.getItem('timeInit');
    let timeLeft = 30; // seconds
    if (timer_elem == null) {
        console.error('Timer element not found');
    }
    timer_elem!.innerText = `${timeLeft}s`;
    timerEvent = window.setInterval(() => {
        timer_elem!.innerText = `${--timeLeft}s`;
        if (timeLeft === 0) {
            timeUp();
        }
    }, 1000);

    window.localStorage.setItem('username', 'Player1');
    userNameElem!.innerText = window.localStorage.getItem('username')!;
    window.localStorage.setItem('gameState', JSON.stringify({})); // TODO
    fetchQuestion();

    for (let answerBtn of document.getElementsByClassName('answer')) {
        answerBtn.addEventListener('click', handleButtonClick);
    } // Handle button click
}

function handleButtonClick(event:Event) {
    const button = event.target as HTMLButtonElement;
    alert(`You clicked ${button.innerText}`);
    disableAllButtons();
    questionTitleElem!.innerText = 'Did you get that right?';
    questionDetailElem!.innerText = 'The correct answer is...';
}

function timeUp() {
    alert('Time is up!');
    disableAllButtons();
    clearInterval(timerEvent);
}

function disableAllButtons() {
    for (let answerBtn of document.querySelectorAll('.answer')) {
        answerBtn.setAttribute('disabled', 'true');
        //answerBtn.('style', 'filter: saturate(90%);');
    }
}

function endQuestion(){ // TODO

}

function fetchQuestion() {
    // TODO: fetch question information
    // store in localstorage
    window.localStorage.setItem('question', JSON.stringify({}));

}
