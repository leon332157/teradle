import express from "express";

import { getTest } from "./test";
import { getSingleQuiz } from "./quiz";
import { getSession, addParticipant, updateParticipantsCount } from "./quiz-session";

export class ApiRouter {
  private router: express.Router;

  constructor() {
    this.router = express.Router();
    this.initRoutes();
  }

  private initRoutes() {
    // Test route
    this.router.get('/api/test', getTest);

    // quiz routes
    this.router.get('/api/test', getTest);
    this.router.get('/api/quiz/single', getSingleQuiz);

    /// Quiz session routes
    this.router.get('/api/session', getSession);
    this.router.post('/api/session/addParticipant', addParticipant);
    this.router.post('/api/session/updateParticipantsCount', updateParticipantsCount);
  }

  public getRouter() {
    return this.router;
  }
}