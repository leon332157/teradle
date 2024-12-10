import { Request, Response } from "express";
import { PlayerDatabase } from "../database/player";
import { getPlayerDatabase } from "../database";


export async function getParticipants(req: Request, res: Response) {
    const playerDatabase: PlayerDatabase = getPlayerDatabase();
    const sessionId: number = parseInt(req.query.sessionId as string);
    const players: string[] | undefined = await playerDatabase.getPlayersForSession(sessionId);

    if (players) {
        res.json({ players });
    }
    else {
        res.status(404).send(`Game not found with id: ${req.query.sessionId}`);
    }
    //res.json(["kevin", "selena", "jiejie", "xiaocong"]);
}
