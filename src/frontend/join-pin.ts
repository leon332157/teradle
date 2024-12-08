document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('joinGameForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const pin = document.getElementById('gamePin').value;
        fetch('/api/join', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ pin })
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(data.error);
            } else {
                alert('Successfully joined the quiz!');
                window.location.href = `/in-game/${pin}/1`;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to join the game. Please try again.');
        });
    });
});
