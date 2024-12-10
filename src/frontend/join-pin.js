document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('joinGameForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const pin = document.getElementById('gamePin').value;
        const playerName = document.getElementById('playerName').value;

        fetch(`/api/join?pin=${pin}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ pin, playerName })
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(data.error);
            } else {
                document.body.innerHTML = 'You have joined.';
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