import express from "express";

import { getTest } from "./test";
import { getSingleQuiz, createQuiz } from "./quiz";
import { getSession, createSession, addParticipant, nextQuestion } from "./in-game";
import { getParticipants } from "./session";

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
    this.router.get('/api/getParticipants', getParticipants)
  }

  public getRouter() {
    return this.router;
  }
}