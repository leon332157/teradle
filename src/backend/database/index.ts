import {QuizDatabase} from './quiz';

let quizDatabase:QuizDatabase = new QuizDatabase();

// singleton pattern
export function getQuizDatabase() {
    if (!quizDatabase) {
        quizDatabase = new QuizDatabase();
    }
    return quizDatabase;
}

