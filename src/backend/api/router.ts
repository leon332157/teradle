import express from "express";

import { getTest } from "./test";
import { getSingleQuiz, createQuiz, updateQuiz } from "./quiz";
import { getSession, createSession, addParticipant, nextQuestion } from "./in-game";
import { getLeaderboard } from "./leaderboard-scoring";

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
    this.router.put(`/api/quiz/update`, updateQuiz);

    // game routes
    this.router.get('/api/session', getSession)
    this.router.get('/api/createSession', createSession)
    this.router.get('/api/addParticipant', addParticipant)
    this.router.post('/api/nextQuestion', nextQuestion)
    this.router.get('/api/leaderboard-scoring/getLeaderboard', getLeaderboard);
  }

  public getRouter() {
    return this.router;
  }
}