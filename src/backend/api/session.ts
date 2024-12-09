import { Request, Response } from "express";
export function getParticipants(req: Request, res: Response) {
    // const playerDatabase: PlayerDatabase = getPlayerDatabase();
    // const players: string[] | undefined = playerDatabase.getPlayersForSession(req.query.sessionId);

    // if (players) {
    //     res.json({ players });
    // }
    // else {
    //     res.status(404).send(`Game not found with id: ${req.query.sessionId}`);
    // }
    res.json(["kevin", "selena", "jiejie", "xiaocong"]);
}