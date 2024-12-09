import { QuizDatabase } from './quiz';
import { SessionDatabase } from './session';
import { PlayerDatabase } from './player';
import { GameController } from './in-game';

// Singletons
let quizDatabase: QuizDatabase = new QuizDatabase();
let sessionDatabase: SessionDatabase = new SessionDatabase();
let playerDatabase: PlayerDatabase = new PlayerDatabase();
let gameController: GameController = new GameController();

export function getQuizDatabase() {
  if (!quizDatabase) {
    quizDatabase = new QuizDatabase();
  }
  return quizDatabase;
}

export function getSessionDatabase() {
  if (!sessionDatabase) {
    sessionDatabase = new SessionDatabase();
  }
  return sessionDatabase;
}

export function getPlayerDatabase() {
  if (!playerDatabase) {
    playerDatabase = new PlayerDatabase();
  }
  return playerDatabase;
}

export function getGameController() {
  if (!gameController) {
    gameController = new GameController();
  }
  return gameController;
}