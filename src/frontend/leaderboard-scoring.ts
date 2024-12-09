import { Participant } from "../backend/database/in-game";

(
  async () => {
    try {
      const sessionId = new URLSearchParams(window.location.search).get('sessionId');
      const leaderboard = await fetch(`http://localhost:8000/api/leaderboard-scoring/getLeaderboard?sessionId=${sessionId}`);

      if (!leaderboard.ok) {
        throw new Error(`Failed to fetch leaderboard: ${leaderboard.status}`);
      }
      const json = await leaderboard.json();

      const leaderboardArray = json.leaderboard;

      const leaderboardElement = document.querySelector('.display-top-players');

      if (leaderboardElement === null) {
        return;
      }

      leaderboardArray.forEach((participant: Participant) => {
        leaderboardElement.appendChild(getParticipantElement(participant));
      });
    }
    catch (error: any) {
      console.error(`Error loading leaderboard: ${error.message}`);
    }
  }
)();

const getParticipantElement = (participant: Participant) => {
  const div = document.createElement("div");
  div.className = "player";

  const player_name = document.createElement("span");
  player_name.className = "player-name";
  player_name.innerHTML = participant.name;

  const player_score = document.createElement("span");
  player_score.className = "player-score";
  player_score.innerHTML = participant.score.toString();

  div.appendChild(player_name);
  div.appendChild(player_score);
  return div;
}