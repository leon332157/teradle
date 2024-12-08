import { Request, Response } from "express";
import { GameController, Participant } from "../database/in-game";

export function getLeaderboard(req: Request, res: Response) {
  const gameController = new GameController();
  // const game = gameController.getSession(parseInt(req.body.sessionId));
  const game = null;

  if (!game) {
    // let leaderboard: Participant[] = [...game.participants]
    //   .sort((a, b) => b.score - a.score)
    //   .slice(6);

    // TEMPORARY
    const leaderboard = [
      { id: 1, name: "Kevin", score: 1000 },
      { id: 2, name: "Selena", score: 1 },
      { id: 3, name: "Xiaocong", score: 100000 },
      { id: 4, name: "Phoebe", score: 0 },
      { id: 5, name: "Shuby", score: -1 },
      { id: 6, name: "Jerry", score: -1000 }
    ];

    leaderboard
      .sort((a, b) => b.score - a.score)
      .slice(6);

    res.json({ leaderboard });
  }
  else {
    res.status(404).send("Game not found");
  }
}