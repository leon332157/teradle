import express from "express";

import { getTest } from "./test";
import { getSingleQuiz, createQuiz, getAllQuizzes } from "./quiz";
import { getSession, createSession, addParticipant, nextQuestion } from "./in-game";

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
    this.router.get('/api/quiz/all', getAllQuizzes);
    this.router.post('/api/quiz/create', createQuiz);

    // game routes
    this.router.get('/api/session', getSession)
    this.router.get('/api/createSession', createSession)
    this.router.get('/api/addParticipant', addParticipant)
    this.router.post('/api/nextQuestion', nextQuestion)
  }

  public getRouter() {
    return this.router;
  }
}