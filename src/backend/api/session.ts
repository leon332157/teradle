import { Request, Response } from "express";
import { getPlayerDatabase } from "../database";

export function getParticipants(req: Request, res: Response) {
    const playerDatabase = getPlayerDatabase();
    const sessionId: number = parseInt(req.query.sessionId as string);
    playerDatabase.getPlayersForSession(sessionId).then((players) => {
        if (players) {
            res.json(players);
        } else {
            res.status(404).send(`Game not found with id: ${req.query.sessionId}`);
        }
    });
}
