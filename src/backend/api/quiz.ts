import { getQuizDatabase } from "../database";
import { Request, Response } from "express";

/**
    * This function sends a singele quiz as json item, if the quiz is not found, it sends a 404
    * IT expects a quiz id in the request parameters, "api/quiz/single?id=<id>"
*/
export function getSingleQuiz(req:Request, res:Response) {
    const quizDatabase = getQuizDatabase();
    quizDatabase.getQuiz(parseInt(req.query.id as string))
    .then(data => {
        console.log("Quiz returned: ", data);
        if (data) {
            res.json(data);
        } else {
            res.status(404).send('Quiz not found');
        }
    });
}

export function getAllQuizzes(req:Request, res:Response) {
    const quizDatabase = getQuizDatabase();
    quizDatabase.getAllQuizzes(parseInt(req.query.id as string))
    .then(data => {
        console.log("Quiz returned: ", data);
        if (data) {
            res.json(data);
        } else {
            res.status(404).send('Quiz not found');
        }
    });
}

/**
    * This function creates a quiz from the request body
    * It expects a quiz object in the request body
*/
export async function createQuiz(req:Request, res:Response) {
    const quizDatabase = getQuizDatabase();
    const quiz = req.body; // json
    console.log(quiz);
    if (!quiz) {
        res.status(400).send({message: 'Invalid quiz'});
        return;
    }
    if (await quizDatabase.createQuiz(quiz)) {
        res.json({message: 'Quiz created'});
    } else {
        res.status(401).send({message: 'Error occured'});
    }
}