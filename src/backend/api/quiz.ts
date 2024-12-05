import { getQuizDatabase } from "../database";
import { Request, Response } from "express";

/*
    * This function sends a singele quiz as json item, if the quiz is not found, it sends a 404
    * IT expects a quiz id in the request parameters, "api/quiz/single?id=<id>"
*/
export function getSingleQuiz(req:Request, res:Response) {
    const quizDatabase = getQuizDatabase();
    const quiz = quizDatabase.getQuiz(parseInt(req.params.id));
    if (quiz) {
        res.json(quiz);
    } else {
        res.status(404).send('Quiz not found');
    }
}