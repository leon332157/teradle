"use strict";
document.addEventListener("DOMContentLoaded", () => {
  console.log('sorting function');
  const leaderboard = document.querySelector('.display-top-players');
  if (leaderboard) {
    const players = Array.from(leaderboard.getElementsByClassName('player'));
    players.sort((a, b) => {
      const scoreA = parseInt(a.querySelector('.player-score')?.textContent || '0', 10);
      const scoreB = parseInt(b.querySelector('.player-score')?.textContent || '0', 10);
      return scoreB - scoreA;
    });
    console.log('sorted players', players);
    leaderboard.innerHTML = '';
    players.forEach(player => leaderboard.appendChild(player));
  }
});