import { Request, Response } from "express";
import { GameDatabase, Participant } from "../database/in-game";

export function getLeaderboard(req: Request, res: Response) {
  const gameDatabase = new GameDatabase();
  const game = gameDatabase.getGame(parseInt(req.params.id));

  if (game) {
    const leaderboard = [...game.participants].sort((a, b) => b.score - a.score);
    res.json({ leaderboard });
  }
  else {
    res.status(404).send("Game not found");
  }
}