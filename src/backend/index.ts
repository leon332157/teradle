import express from 'express';
import { join, dirname } from 'path';

const app = express();
const port = 8000;

// Serve static files from the 'public' directory
app.use(express.static(join(dirname(__filename), '..')));

app.on('error', (err) => {
  console.error(err);
}
);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
