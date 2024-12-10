import { Request, Response } from "express";
import { PlayerDatabase } from "../database/player";
import { getPlayerDatabase, getSessionDatabase } from "../database";
import { SessionDatabase } from "../database/session";

//fix this function so that it sorts and slices
export async function getLeaderboard(req: Request, res: Response) {
  const sessionId: number = parseInt(req.query.sessionId as string);
  const sessionDatabase: SessionDatabase = getSessionDatabase();
  const playerDatabase: PlayerDatabase = getPlayerDatabase();

  if (await sessionDatabase.doesSessionExist(sessionId)) //temporary to make sure mock data returns
  {
    const playersAndScores: { playerName: string, score: number }[] = await playerDatabase.getTopNPlayers(sessionId, 6);
    console.log(playersAndScores);
    let leaderboard: { playerName: string, score: number }[] = playersAndScores
      .sort((a, b) => b.score - a.score)

    // TEMPORARY
    // leaderboard = [
    //   { playerName: "Kevin", score: 1000 },
    //   { playerName: "Selena", score: 1 },
    //   { playerName: "Xiaocong", score: 100000 },
    //   { playerName: "Phoebe", score: 0 },
    //   { playerName: "Shuby", score: -1 },
    //   { playerName: "Jerry", score: -1000 }
    // ];

    res.json(leaderboard);
  }
  else {
    res.status(404).send(`Game not found with id: ${sessionId}`);
  }
}