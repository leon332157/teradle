import express from "express";

import { getTest } from "./test";
import { getSingleQuiz } from "./quiz";
import { getLeaderboard } from "./leaderboard-scoring";

export class ApiRouter {
  private router: express.Router;

  constructor() {
    this.router = express.Router();
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get('/api/test', getTest);
    this.router.get('/api/quiz/single', getSingleQuiz);
    this.router.get('/api/leaderboard-scoring', getLeaderboard);
  }

  public getRouter() {
    return this.router;
  }
}