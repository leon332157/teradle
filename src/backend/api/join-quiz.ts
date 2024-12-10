import { Request, Response } from "express";
import { getSessionDatabase, getPlayerDatabase } from "../database";

export function joinQuiz(req: Request, res: Response) {
    const sessionId = parseInt(req.body.sessionId);
    const playerName = req.body.playerName as string;
    const sessionDatabase = getSessionDatabase();
    const playerDatabase = getPlayerDatabase();
    sessionDatabase.doesSessionExist(sessionId).then((exists) => {
        if (exists) {
            playerDatabase.addPlayer(sessionId, playerName).then((success) => {
                if (success) {
                    res.status(200).json({ message: 'Joined successfully' });
                } else {
                    res.status(404).json({ message: 'Session not found' });
                }
            });
        } else {
            res.status(404).json({ message: 'Session not found' });
        }
    });
}

export function checkSessionStarted(req: Request, res: Response) {
    const sessionId = parseInt(req.params.sessionId);

    const sessionDatabase = getSessionDatabase();
    sessionDatabase.getCurrentQuestionNumber(sessionId).then((currentQuestion) => {
        if (currentQuestion === -1) {
            res.status(200).json({ started: false });
        } else {
            res.status(200).json({ started: true });
        }
    }
    );
}
