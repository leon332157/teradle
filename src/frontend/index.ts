async function fetchSessionDetails() {
    try {
        const response = await fetch('http://localhost:3000/api/quiz');
        const sessionData = await response.json();
        updateGamePin(sessionData.pin);

        updatePlayerList(sessionData.players);

        updatePlayerCount(sessionData.players.length);
    } catch (error) {
        console.error('Error fetching session details', error)
    }
}

function updateGamePin(pin: number) {
    const pinElement = document.getElementById('pin')
    if (pinElement) {
        pinElement.textContent = `${pin} Players`;
    }
}

function updatePlayerList(players: string[]) {
    const playerListElement = document.getElementById('player-list')
    if (playerListElement) {
        players.forEach(player => {
            const playerDiv = document.createElement('div');
            playerDiv.className = 'player';
            playerDiv.textContent = player;
            playerListElement.appendChild(playerDiv);
        });
    }
}

function updatePlayerCount(count: number) {
    const playerListElement = document.getElementById('player-list')
    if (playerListElement) {
        playerListElement.textContent = `${count} Players`;
    }
}

function start() {
    console.log("Quiz has started!")

    const playerCount = document.getElementById('player-count');
    const sessionDetails = document.getElementById('session-details');
    const startButton = document.getElementById('start-button') as HTMLButtonElement;

}

function displayQuizDetails(quizName: string, pin: number, numJoined: number) {
    const sessionDetails = document.getElementById('session-details')

    if (sessionDetails) {
        sessionDetails.innerHTML = `
            <h3>Quiz Name: ${quizName}</h3>
            <p>PIN: ${pin} </p>
            <p>Number of People Joined: ${numJoined}</p>
        `
    }
}

window.onload = fetchSessionDetails;