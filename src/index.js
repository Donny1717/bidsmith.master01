/**
 * BidSmith ASF entrypoint
 */
import dotenv from 'dotenv';
import { createServer } from './api/server.js';

dotenv.config();

const app = createServer();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`BidSmith ASF API listening on port ${PORT}`);
});

export default app;
