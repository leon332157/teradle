import express from 'express';
import { join, dirname } from 'path';

import { ApiRouter } from './api/router';
const app = express();
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

frontendRouter.get('/in-game/instructor/:sessionid/:questionNum', (req, res) => {
});

frontendRouter.get('/in-game/student/:sessionid/:questionNum', (req, res) => {
});

frontendRouter.get('/leaderboard/instructor/:sessionid', (req, res) => {

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
