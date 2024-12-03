import express from 'express';
import { join, dirname } from 'path';

import { ApiRouter } from './api/router';
const app = express();
const port = 8000;

// Serve static files from the 'public' directory
app.use(express.static(join(dirname(__filename), '..')));
app.on('error', (err) => {
  console.error(err);
}
);


const apiRouter = new ApiRouter();

app.use(apiRouter.getRouter());

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
