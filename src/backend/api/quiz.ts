import { getQuizDatabase } from "../database";
import { Request, Response } from "express";

/**
    * This function sends a single quiz as json item, if the quiz is not found, it sends a 404
    * IT expects a quiz id in the request parameters, "api/quiz/single?id=<id>"
*/
export function getSingleQuiz(req: Request, res: Response) {
  const quizDatabase = getQuizDatabase();
  const quiz = quizDatabase.getQuiz(parseInt(req.params.id));
  if (quiz) {
    res.json(quiz);
  } else {
    res.status(404).send('Quiz not found');
  }
}

/**
    * This function creates a quiz from the request body
    * It expects a quiz object in the request body
*/
export function createQuiz(req: Request, res: Response) {
  const quizDatabase = getQuizDatabase();
  const quiz = req.body; // json
  if (!quiz) {
    res.status(400).send({ message: 'Invalid quiz' });
    return;
  }
  if (quizDatabase.createQuiz(quiz)) {
    res.json({ message: 'Quiz created' });
  } else {
    res.status(401).send({ message: 'Error occurred' });
  }
}