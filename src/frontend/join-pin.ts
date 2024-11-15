//API request by join button
//alert error if code wrong
//alert sucesss-> swap page to "You have joined"

document.addEventListener('DOMContentLoaded', joinGame);

function joinGame() {
    const form = document.getElementById('joinGameForm') as HTMLFormElement | null;
    
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const gamePinInput = document.getElementById('gamePin') as HTMLInputElement;
            const playerNameInput = document.getElementById('playerName') as HTMLInputElement;
            
            const gamePin = gamePinInput.value;
            const playerName = playerNameInput.value;
            
            // TODO: url
            const apiUrl = 'url';
            
            fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    pin: gamePin,
                    name: playerName
                })
            })
            .then(response => response.json())
            .then(data => handleResponse(data))
            .catch(error => {
                console.error('Error:', error);
                alert('Failed to join the game. Please try again.');
            });
        });
    }
}

function handleResponse(data: any) {
    if (data.error) {
        alert(data.error);
    } else {
        alert('You have joined the game!');
        window.location.href = 'URL'; // TODO:
    }
}