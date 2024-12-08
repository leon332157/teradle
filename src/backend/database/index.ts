import {QuizDatabase} from './quiz';
import {GameController} from './in-game';

let quizDatabase:QuizDatabase = new QuizDatabase();
let gameController:GameController = new GameController();
// singleton pattern
export function getQuizDatabase() {
    if (!quizDatabase) {
        quizDatabase = new QuizDatabase();
    }
    return quizDatabase;
}

export function getGameController() {
    if (!gameController) {
        gameController = new GameController();
    }
    return gameController;
}