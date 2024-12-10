/*
Question information such as time remaining, question number, and question text should be fetched into localstorage
username should be stored cookie

*/
type Player = {
    sessionId: number; // the id of the session
    name: string; // the name of the player
    score: number; // the score of the player
}

type Game = {
    sessionId: number; // the unique session id
    participants: Player[]; // list of participants
    questions: Question[]; // list of questions loaded from quiz database
    currentQuestion: number; // index of the current question
    isStarted: boolean; //flag to indicate if the game has started
}

type Answer = {
    questionIndex: number; // the index of the question
    index: number; // the index of the answer
    time: number; // the time taken to answer
    PlayerName: string; // the name of the player
}

type Question = {
    id: number;
    type: "multiple" | "single"; // multiple: multiple choice, single: single choice
    question: string; // the question text
    options: string[]; // list of options
    answer: number; // index of the correct answer
    timeLimit: number; // time limit in seconds
}

type Quiz = {
    id: number; // unique id of the quiz
    name: string; // name of the quiz 
    questions: Question[]; // list of questions
}

document.addEventListener('DOMContentLoaded', initPage);

const userNameElem = document.getElementById('username');
const questionTitleElem = document.getElementById('question-title');
const answerBtnListElem = document.getElementById('answer-btn-list');
const timerElem = document.getElementById('nav-timer');

const isInstructor = window.location.href.includes('/instructor');
const pageURL = new URL(window.location.href);
const sessionId = pageURL.searchParams.get('sessionId');
let timerEvent: number;
let timeLeft: number = -1;

function fetchQuestion() {
    // TODO: fetch question information
    // store in localstorage
    const sessionId = pageURL.searchParams.get('sessionId');
    fetch(`/api/session/currentQuestion?sessionId=${sessionId}`).then((response) => {
        if (response.ok) {
            response.json().then(
                (data) => {
                    window.localStorage.setItem('question', JSON.stringify(data));
                    renderQuestion(data as Question);
                }
            )
        } else {
            window.localStorage.setItem('question', JSON.stringify(null));
            console.error('Failed to fetch question', response);
            alert('Failed to fetch question');
        }
    });
}

function renderQuestion(questionObj: Question) {
    questionTitleElem!.innerText = questionObj.question;
    if (!isInstructor) { // only render answer buttons for players
        const buttonColors = ['#007BFF', '#28A745', '#DC3545', '#FFC107'];
        for (let i = 0; i < questionObj.options.length; i++) {
            const answerBtn = document.createElement('button');
            answerBtn.classList.add('answer');
            answerBtn.setAttribute('data-answer', i.toString());
            answerBtn.style.backgroundColor = buttonColors[i]
            answerBtn.innerText = questionObj.options[i];
            answerBtnListElem!.appendChild(answerBtn);
            answerBtn.addEventListener('click', handleButtonClick);
        }
    }
}

function disableAllButtons() {
    for (let answerBtn of document.querySelectorAll('.answer')) {
        answerBtn.setAttribute('disabled', 'true');
        //answerBtn.('style', 'filter: saturate(90%);');
    }
}

function timeUp() {
    alert('Time is up!');
    disableAllButtons();
    clearInterval(timerEvent);
    endQuestion();
}


async function initPage() {
    //const timeInit = localStorage.getItem('timeInit');
    await fetchQuestion()
    let currQuestion = JSON.parse(window.localStorage.getItem('question')!) as Question;
    timeLeft = currQuestion.timeLimit;
    if (timerElem == null) {
        console.error('Timer element not found');
    }
    timerElem!.innerText = `${timeLeft}s`;
    timerEvent = window.setInterval(() => {
        timerElem!.innerText = `${--timeLeft}s`;
        if (timeLeft === 0) {
            timeUp();
        }
    }, 1000);
    userNameElem!.innerText = window.localStorage.getItem('username')!;
}

function handleButtonClick(event: Event) {
    const button = event.target as HTMLButtonElement;
    alert(`You clicked ${button.innerText}`);
    disableAllButtons();
    questionTitleElem!.innerText = 'Did you get that right?';

    const answer = parseInt(button.getAttribute('data-answer')!);
    const userName = window.localStorage.getItem('username');
    if (userName === null) {
        alert('Username not found! Can not submit answer');
        return;
    }
    const answerObj: Answer = {
        questionIndex: JSON.parse(window.localStorage.getItem('question')!).id,
        index: answer,
        time: timeLeft,
        PlayerName: userName
    };
    fetch('/api/session/answer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(answerObj)
    }).then((response) => {
        if (response.ok) {
            console.log('Answer submitted successfully');
            response.json().then((data: { isCorrect: boolean, correctIdx: number, correctAnswer: string }) => {
                // store updated game state
                window.localStorage.setItem('answer', JSON.stringify(data));
            });
        } else {
            console.error('Failed to submit answer', response);
            alert('Failed to submit answer');
        }
    }
    );
}



function endQuestion() {
    if (isInstructor) {
        // TODO: redirect to leaderboard
        window.location.href = `/leaderboard?sessionId=${sessionId}`;
    } else {
        // TODO: render correct answer
        const currQuestion = JSON.parse(window.localStorage.getItem('question')!) as Question;
        const answer: { isCorrect: boolean, correctIdx: number, correctAnswer: string } = JSON.parse(window.localStorage.getItem('answer')!);
        questionTitleElem!.innerText = `The correct answer is ${answer.correctAnswer}, you ${answer.isCorrect ? 'got it right!' : 'got it wrong!'}`;
        setInterval(() => {
            fetch(`/api/session/shouldGoNext?sessionID={sessionID}&currentQuestion={currQuestion.id}`, {
                method: 'POST',
            }).then((response) => {
                if (response.status === 302) {
                    initPage();
                }
            })
        }, 100);
    }
}

