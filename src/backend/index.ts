import express from 'express';
import { join, dirname } from 'path';
import cors from 'cors';

import { ApiRouter } from './api/router';
const app = express();
app.use(cors())
const port = 8000;

// add json body parser
app.use(express.json());

/* router for the API */
const apiRouter = new ApiRouter();
app.use(apiRouter.getRouter());

const frontendRouter = express.Router();
frontendRouter.get('/', (req, res) => {
  res.sendFile(join(dirname(__filename), '..', 'quiz-list.html'));
});

frontendRouter.get('/quiz-list', (req, res) => {
  res.sendFile(join(dirname(__filename), '..', 'quiz-list.html'));
});

frontendRouter.get('/create-quiz', (req, res) => {
  res.sendFile(join(dirname(__filename), '..', 'question-creation.html'));
});

frontendRouter.get('/edit-quiz', (req, res) => {
  res.sendFile(join(dirname(__filename), '..', 'question-creation.html'));
});

frontendRouter.get('/join-quiz', (req, res) => {
  res.sendFile(join(dirname(__filename), '..', 'join-pin.html'));
});

frontendRouter.get('/host-quiz', (req, res) => {
  res.sendFile(join(dirname(__filename), '..', 'quiz-session.html'));
});

frontendRouter.post('/next-question', (req, res) => {
  const sessionId: string = req.query.sessionId as string;
  console.log(sessionId);
  res.redirect(`/in-game/instructor?sessionId=${sessionId}`);
})

frontendRouter.get('/in-game/instructor', (req, res) => {
  res.sendFile(join(dirname(__filename), '..', 'in-game.html'));
});

frontendRouter.get('/in-game/', (req, res) => {
  res.sendFile(join(dirname(__filename), '..', 'in-game.html')); 
});

frontendRouter.get('/leaderboard', (req, res) => {
  res.sendFile(join(dirname(__filename), '..', 'leaderboard-scoring.html'));
});

app.use(frontendRouter);

// add static file serving last
app.use(express.static(join(dirname(__filename), '..')));
app.on('error', (err) => {
  console.error(err);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
