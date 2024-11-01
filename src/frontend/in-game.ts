/*
Question information such as time remaining, question number, and question text shuld be fetched into localstorage
username should be stored cookie

*/

document.addEventListener('DOMContentLoaded', initPage);

function initPage() {
    const answerList = document.querySelector('.answer');
    if (answerList) {
        answerList.childNodes.forEach((node) => {
            node.addEventListener('click', (event) => {
            });

        })
    }

    const timer_elem = document.getElementById('timer');
    //const timeInit = localStorage.getItem('timeInit');
    let timeLeft = 30; // seconds
    if (timer_elem) {
        timer_elem.innerHTML = `Timer: ${timeLeft}s`;
    }
    setInterval(() => {
        if (timer_elem) {
            timer_elem.innerHTML = `Timer: ${--timeLeft}s`;
        }
    }, 1000);
    if (timeLeft === 0) {
        timeUp();
    }
}

function timeUp() {
    alert('Time is up!');
}

function fetchQuestion() {
    // TODO: fetch question information
    // store in localstorage
}
