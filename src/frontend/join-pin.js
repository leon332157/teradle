document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('joinGameForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const pin = document.getElementById('gamePin').value;
        const userName = document.getElementById('userName').value;

        fetch(`/api/join?pin=${pin}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ pin, userName })
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(data.error);
            } else {
                localStorage.setItem('userName', userName);
                document.body.innerHTML = '<p>You have joined. Waiting for the session to start...</p>';
                checkIfStarted(pin);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to join the game. Please try again.');
        });
    });
});

function checkIfStarted(pin) {
    setInterval(() => {
        fetch(`/api/session/${pin}/started`)
            .then(response => response.json())
            .then(data => {
                if (data.started) {
                    window.location.href = `/in-game/${pin}/1`;
                }
            })
            .catch(error => {
                console.error('Error checking session status:', error);
            });
    }, 5000);
}