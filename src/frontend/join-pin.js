document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('joinGameForm');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const sessionId = document.getElementById('sessionId').value;
        const userName = document.getElementById('userName').value;

        fetch(`/api/session/join?sessionId=${sessionId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sessionId:sessionId, userName:userName })
        })
            .then(response => {
                if (!response.ok) {
                    alert('Failed to join the game. Please try again.');
                } else {
                    response.json().then((data) => {
                        localStorage.setItem('username', userName);
                        const status = document.getElementById('status');
                        status.innerHTML = 'Waiting for the game to start...';
                        checkIfStarted(pin);
                    })
                }
            })
    });
});

function checkIfStarted(pin) {
    setInterval(() => {
        fetch(`/api/session/started?sessionId=${pin}`)
            .then(response => {
                response.json().then((data) => {
                    if (data.started) {
                        window.location.href = `/in-game?sessionId=${pin}`;
                    }
                })
            })
    }, 10);
}