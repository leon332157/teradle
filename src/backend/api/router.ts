import express from "express";

import { getSingleQuiz, createQuiz, updateQuiz, getAllQuizzes, deleteQuiz } from "./quiz";
import { getSession, createSession, nextQuestion, startGameSession, currentQuestion, recordAnswer, shouldGoNext } from "./in-game";
import { getLeaderboard } from "./leaderboard-scoring";
import { joinQuiz, checkSessionStarted } from "./join-quiz";
import { getParticipants } from "./session";

export class ApiRouter {
  private router: express.Router;

  constructor() {
    this.router = express.Router();
    this.initRoutes();
  }

  private initRoutes() {
    // quiz routes
    this.router.get('/api/quiz/single', getSingleQuiz);
    this.router.get('/api/quiz/all', getAllQuizzes);
    this.router.post('/api/quiz/create', createQuiz);
    this.router.put(`/api/quiz/update`, updateQuiz);
    this.router.delete(`/api/quiz/delete`, deleteQuiz);

    // game routes
    this.router.get('/api/session', getSession)
    this.router.get('/api/session/participants', getParticipants)
    this.router.get('/api/session/started', checkSessionStarted)
    this.router.post('/api/session/create', createSession)
    this.router.post('/api/session/start', startGameSession)
    this.router.post('/api/session/join', joinQuiz);
    this.router.post('/api/session/next', nextQuestion);
    this.router.post('/api/session/shouldGoNext', shouldGoNext);
    this.router.get('/api/session/currentQuestion', currentQuestion);
    this.router.post('/api/session/answer', recordAnswer);
    // leaderboard routes
    this.router.get('/api/leaderboard-scoring/getLeaderboard', getLeaderboard);
  }

  public getRouter() {
    return this.router;
  }
}