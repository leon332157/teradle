"use strict";

let sessionId = null;
document.addEventListener('DOMContentLoaded', async () => {
    const quizId = parseInt(new URLSearchParams(window.location.search).get('quizId') ?? '0');
    console.log('Quiz ID:', quizId);
    const resp = await fetch(`/api/session/create?quizId=${quizId}`, {
        method: 'POST',
    })
    if (!resp.ok) {
        console.error('Failed to create session');
        return;
    }
    const data = await resp.json()
    console.log('Session created:', data);
    sessionId = data.pin;
    const sessionPin = document.getElementById('pin');
    sessionPin.innerText = sessionId;
    // Now that sessionId is available, start fetching player list
    setInterval(async () => {
            const playerList = document.getElementById('player-list');
            const playerCount = document.getElementById('player-count');
            const players = await getSessionPlayers();
            updatePlayerList(players, playerList, playerCount);
        }, 1000);

    const startButton = document.getElementById('start-button');
    if (startButton) {
        startButton.addEventListener('click', startGame);
    }
});
async function getSessionPlayers() {
    if (!sessionId) {
        console.error('Session ID not found');
        return [];
    }
    const resp = await fetch(`/api/session/participants?sessionId=${sessionId}`);
    const players = await resp.json();
    return players;
}
function updatePlayerList(players, playerList, playerCount) {
    playerList.innerHTML = '';
    players.forEach((player) => {
        const playerDiv = document.createElement('div');
        playerDiv.className = 'player';
        playerDiv.textContent = player.name;
        playerList.appendChild(playerDiv);
    });
    playerCount.textContent = `${players.length} Players`;
}
function startGame() {
    if (sessionId) {
        fetch(`/api/session/start?sessionId=${sessionId}`, { method: 'POST' })
            .then(response => response.json())
            .then(data => {
            if (data.message === 'Game session started successfully') {
                alert('Game started!');
                window.location.href = '/in-game/instructor?sessionId=' + sessionId;
            }
            else {
                alert('Failed to start game.');
            }
        })
            .catch(error => console.error('Error:', error));
    }
    else {
        alert('Session ID not found.');
    }
}

//# sourceMappingURL=quiz-session.js.map
