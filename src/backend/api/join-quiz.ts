import { Request, Response } from "express";
import { getSessionDatabase, getPlayerDatabase } from "../database";

/**
 * This function handles the request to join a quiz session.
 * It expects a sessionId and playerName in the request body.
 * 
 * @param req - The request object containing sessionId and playerName in the body.
 * @param res - The response object used to send back the appropriate response.
 */
export function joinQuiz(req: Request, res: Response) {
    const sessionId = parseInt(req.query.sessionId as string);
    const userName = req.body.userName as string;
    const sessionDatabase = getSessionDatabase();
    const playerDatabase = getPlayerDatabase();

    // Check if the session exists in the session database
    sessionDatabase.doesSessionExist(sessionId).then((exists) => {
        if (exists) {
            playerDatabase.addPlayer(sessionId, userName).then((success) => {
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

/**
 * This function checks if the session has started.
 * It expects a sessionId in the request parameters.
 * @param req - The request object containing the sessionId in the parameters.
 * @param res - The response object used to send back the appropriate response.
 */
export function checkSessionStarted(req: Request, res: Response) {
    const sessionId = parseInt(req.query.sessionId as string);

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
