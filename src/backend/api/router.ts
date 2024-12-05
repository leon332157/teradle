import express from "express";

import {getTest} from "./test";
import {getSingleQuiz} from "./quiz";

export class ApiRouter {
  private router: express.Router;

  constructor() {
    this.router = express.Router();
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get('/api/test', getTest);
    this.router.get('/api/quiz/single', getSingleQuiz);
  }

  public getRouter() {
    return this.router;
  }
}