import { getGameController } from "../database";
import { Request, Response } from "express";

// ** This function is responsible for creating a new session for the given quiz id
export function createSession(req: Request, res: Response) {
  const quizId = parseInt(req.params.quizId);
  const gameController = getGameController();
  const game = gameController.createSession(quizId);
  if (game instanceof Error) {
    res.status(404).send(game.message);
  } else {
    res.json(game);
  }
}

export function startGameSession(req: Request, res: Response) {
  const sessionId = parseInt(req.params.sessionId);
  const gameController = getGameController();
  const success = gameController.startSession(sessionId);
  if (success) {
      res.json({ message: 'Game session started successfully' });
  } else {
      res.status(404).json({ error: 'Session not found' });
  }
}

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

export async function addParticipant(req: Request, res: Response) {
  const sessionId = parseInt(req.params.sessionId);
  const participant = req.body;
  const gameController = getGameController();
  const success: boolean = await gameController.addParticipant(sessionId, participant);
  if (success) {
    res.send("Participant added");
  } else {
    res.status(404).send("Session not found");
  }
}

export function nextQuestion(req: Request, res: Response) {
  const sessionId = parseInt(req.params.sessionId);
  const gameController = getGameController();
  const game = gameController.getSession(sessionId);
  if (game) {
    res.json(game.questions[game.currentQuestion]);
  } else {
    res.status(404).send("Session not found");
  }
}
