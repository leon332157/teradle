import express from "express";

import { getTest } from "./test";
import { getSingleQuiz, createQuiz } from "./quiz";
import { getSession, createSession, addParticipant, nextQuestion, startGameSession } from "./in-game";
import { joinQuiz,checkSessionStarted } from "./join-quiz";

export class ApiRouter {
  private router: express.Router;

  constructor() {
    this.router = express.Router();
    this.initRoutes();
  }

  private initRoutes() {
    // quiz routes
    this.router.get('/api/test', getTest);
    this.router.get('/api/quiz/single', getSingleQuiz);
    this.router.post('/api/quiz/create', createQuiz);

    // game routes
    this.router.get('/api/session', getSession)
    this.router.get('/api/createSession', createSession)
    this.router.get('/api/addParticipant', addParticipant)
    this.router.post('/api/nextQuestion', nextQuestion)

    // join quiz route
    this.router.post('/api/join',joinQuiz);
    // check if session started route
    this.router.get('/api/session/:pin/started', checkSessionStarted);
    this.router.post('/api/session/:sessionId/start', startGameSession);
  }

  public getRouter() {
    return this.router;
  }
}