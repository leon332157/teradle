import { Request, Response } from "express";
import { getGameController } from "../database";

export function joinQuiz(req: Request, res: Response) {
    const pin = parseInt(req.body.pin);
    const playerName = req.body.playerName;
    const gameController = getGameController();
    const session = gameController.getSession(pin);

    if (!session) {
        res.status(404).json({ error: 'Session not found' });
        return;
    }

    if (session.isStarted) {
        res.status(400).json({ error: 'Session already started' });
    }

    const participant = { id: Date.now(), name: playerName, score: 0 };
    gameController.addParticipant(pin, participant);

    res.json({ message: 'Joined successfully' });
}

export function checkSessionStarted(req: Request, res: Response) {
    const pin = parseInt(req.params.pin);
    const gameController = getGameController();
    const session = gameController.getSession(pin);

    if (!session) {
        res.status(404).json({ error: 'Session not found' });
        return;
    }

    res.json({ started: session.isStarted });
}