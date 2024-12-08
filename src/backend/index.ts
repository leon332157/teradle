import express from 'express';
import { join, dirname } from 'path';

import { ApiRouter } from './api/router';
const app = express();
const port = 8000;

// Serve static files from the 'public' directory
app.use(express.static(join(dirname(__filename), '..')));

/* router for the API */
const apiRouter = new ApiRouter();
app.use(apiRouter.getRouter());

const frontendRouter = express.Router();
frontendRouter.get('/', (req, res) => {
  res.sendFile(join(dirname(__filename), '..', 'quiz-list.html'));
});

frontendRouter.get('/create-quiz', (req, res) => {
  res.sendFile(join(dirname(__filename), '..', 'create-quiz.html'));
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

app.on('error', (err) => {
  console.error(err);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
