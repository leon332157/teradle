// Run at dom load
(() => {
    setInterval(async () => {
        const playerList: HTMLDivElement = document.getElementById('player-list') as HTMLDivElement;
        const playerCount: HTMLParagraphElement = document.getElementById('player-count') as HTMLParagraphElement;

        const players: string[] = await getSessionPlayers();
        updatePlayerList(players, playerList, playerCount);
    }, 3000);
})();

async function getSessionPlayers(): Promise<string[]> {
    return await fetch("/api/getParticipants").then(async (res: Response): Promise<string[]> => {
        return await res.json();
        // JSON.parse(await res.json());
    }).catch((reason: any) => {
        console.error(reason);
        return [];
    });
}

function updatePlayerList(players: string[], playerList: HTMLElement, playerCount: HTMLElement): void {
    playerList.innerHTML = '';

    players.forEach((player) => {
        const playerDiv = document.createElement('div');
        playerDiv.className = 'player';
        playerDiv.textContent = player;
        playerList.appendChild(playerDiv);
    });

    playerCount.textContent = `${players.length} Players`;
}

