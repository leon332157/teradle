import {Request, Response} from 'express';
export function getTest(req: Request, res: Response) {
  res.json({ message: 'Hello from API' });
}