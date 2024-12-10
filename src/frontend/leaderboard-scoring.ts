(
  async () => {
    try {
      const sessionId = new URLSearchParams(window.location.search).get('sessionId');
      const leaderboard = await fetch(`api/leaderboard-scoring/getLeaderboard?sessionId=${sessionId}`);

      if (!leaderboard.ok) {
        throw new Error(`Failed to fetch leaderboard: ${leaderboard.status}`);
      }

      const leaderboardArray = await leaderboard.json();

      const leaderboardElement = document.querySelector('.display-top-players');

      if (leaderboardElement === null) {
        return;
      }

      leaderboardArray.forEach((player: { playerName: string, score: number }) => {
        leaderboardElement.appendChild(getParticipantElement(player));
      });

      document.querySelector('.next-button')?.addEventListener('click', async () => {
        console.log('next');
        await fetch(`/api/session/next?sessionId=${sessionId}`, {
          method: 'POST'
        }).then((response) => {
          if (response.status == 200) window.location.href = "/in-game/instructor?sessionId=" + sessionId; // Redirect the browser to the new location
          else if (response.status == 204) alert('No more questions');
          else alert('Failed to move to the next question');
        });
      });
    }
    catch (error: any) {
      console.error(`Error loading leaderboard: ${error.message}`);
    }
  }
)();

const getParticipantElement = (player: { playerName: string, score: number }) => {
  const div = document.createElement("div");
  div.className = "player";

  const player_name = document.createElement("span");
  player_name.className = "player-name";
  player_name.innerHTML = player.playerName;

  const player_score = document.createElement("span");
  player_score.className = "player-score";
  player_score.innerHTML = player.score.toString();

  div.appendChild(player_name);
  div.appendChild(player_score);
  return div;
}