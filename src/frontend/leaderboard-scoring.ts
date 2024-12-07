document.addEventListener("DOMContentLoaded", () => {
  const leaderboard = document.querySelector('.display-top-players');

  if (leaderboard) {
    const players = Array.from(leaderboard.getElementsByClassName('player')) as HTMLElement[];

    players.sort((a, b) => {
      const scoreA = parseInt(a.querySelector('.player-score')?.textContent || '0', 10);
      const scoreB = parseInt(b.querySelector('.player-score')?.textContent || '0', 10);
      return scoreB - scoreA;
    });

    leaderboard.innerHTML = '';
    players.forEach(player => leaderboard.appendChild(player));
  }
})