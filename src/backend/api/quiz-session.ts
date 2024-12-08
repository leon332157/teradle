import { getGameController } from "../database";
import { Request, Response } from "express";

export function getSession(req: Request, res: Response) {
    const sessionId = parseInt(req.params.sessionId);
    const gameController = getGameController();
    const game = gameController.getSession(sessionId);
    if (game) {
        res.json(game);
    } else {
        res.status(404).send("Session not found");
    }
}

export function addParticipant(req: Request, res: Response) {
    const sessionId = parseInt(req.params.sessionId);
    const participant = req.body;
    const gameController = getGameController();
    const success = gameController.addParticipant(sessionId, participant);
    if (success) {
        res.send("Participant added");
    } else {
        res.status(404).send("Session not found");
    }
}

export function updateParticipantsCount(req: Request, res: Response) {
    const sessionId = parseInt(req.params.sessionId);
    const gameController = getGameController();
    const success = gameController.updateParticipantsCount(sessionId);
    if (success) {
        res.send("Participants count updated successfully");
    } else {
        res.status(404).send("Session not found");
    }
}

