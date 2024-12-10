import { getGameController } from "../database";
import { Request, Response } from "express";
import { Answer } from "../database/in-game";
/** 
* This function is responsible for creating a new session for the given quiz id
* @Response {object} onsuccess: { message: 'Session created successfully', pin: code }
* @Response {object} onfailure: { message: 'Quiz not found', pin: -1 }
*/
export function createSession(req: Request, res: Response) {
  const quizId = parseInt(req.query.quizId as string);
  const gameController = getGameController();
  gameController.createSession(quizId).then((code) => {
    if (code !== -1) {
      res.status(200).json({ message: 'Session created successfully', pin: code });
    } else {
      res.status(404).json({ message: 'Quiz not found', pin: -1 });
    }
  });
}

/**
 * This function is responsible for starting the game session
 * @Response {object} onsuccess: { message: 'Game session started successfully' }
*/

export function startGameSession(req: Request, res: Response) {
  const sessionId = parseInt(req.query.sessionId as string);
  const gameController = getGameController();
  gameController.startSession(sessionId).then((success) => {
    if (success) {
      res.status(200).json({ message: 'Game session started successfully' });
    } else {
      res.status(404).send("Session not found");
    }
  });
}

/**
 * This function is responsible for getting the game session
 * @param req 
 * @param res 
 */
export function getSession(req: Request, res: Response) {
  const sessionId = parseInt(req.query.sessionId as string);
  const gameController = getGameController();
  const game = gameController.getSession(sessionId);
  if (game) {
    res.json(game);
  } else {
    res.status(404).send("Session not found");
  }
}

/**
 * This function is responsible for moving to the next question in the game session
 * @param req 
 * @param res 
 */
export function nextQuestion(req: Request, res: Response) {
  const sessionId = parseInt(req.query.sessionId as string);
  const gameController = getGameController();
  gameController.nextQuestion(sessionId).then((success) => {
    if (success) {
      res.send("Next question");
    } else {
      res.status(404).send("Session not found");
    }
  });
}

/**
 * This function is responsible for getting the current question in the game session
 * @param req 
 * @param res 
 */
export function currentQuestion(req: Request, res: Response) {
  const sessionId = parseInt(req.query.sessionId as string);
  const gameController = getGameController();
  const question = gameController.getCurrentQuestion(sessionId);
  if (question) {
    res.json(question);
  } else {
    res.status(404).send("Session not found");
  }
}

/**
 * This function is responsible for recording the answer to the current question
 * @param req 
 * @param res 
 */
export function recordAnswer(req: Request, res: Response) {
  const sessionId = parseInt(req.query.sessionId as string);
  const answer = req.body as Answer;
  const gameController = getGameController();
  gameController.recordAnswer(sessionId, answer).then((resp) => {
    res.json(resp);
  })
}

/**
 * This function is responsible for checking if the game session should move to the next question
 * @param req 
 * @param res 
 */
export function shouldGoNext(req: Request, res: Response) {
  const sessionId = parseInt(req.query.sessionId as string);
  const currentQuestion = parseInt(req.query.currentQuestion as string);
  const gameController = getGameController();
  gameController.shouldGoNext(sessionId, currentQuestion).then((resp) => {
    if (resp) res.status(302).send("Go to next question");
    else res.status(200).send("Wait for next question");
  });
}