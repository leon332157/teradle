import { Request, Response } from "express";
import { getGameController } from "../database";

export function joinQuiz(req: Request, res: Response){
    const pin = parseInt(req.body.pin);
    const gameController = getGameController();
    const session = gameController.getSession(pin);
    if (!session) {
        res.status(404).json({ error: 'Session not found' });
    }
    //TODO: Implement isStarted, might need to change a in-game.ts file.
    if (session.isStarted) {
        res.status(400).json({ error: 'Session already started' });
    }
    res.json({ message: 'Joined successfully' });
}

export function checkSessionStarted(req: Request, res: Response){
    const pin = parseInt(req.params.pin);
    const gameController = getGameController();
    const session = gameController.getSession(pin);
    if (!session) {
        res.status(404).json({ error: 'Session not found' });
    }
    res.json({ started: session.isStarted });
}