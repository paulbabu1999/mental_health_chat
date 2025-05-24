import express from 'express';
import cors from 'cors';
import chatRoutes from './routes/chatRoutes';

const app = express();

// ✅ Enable CORS for all origins during development
app.use(cors());

// ✅ Fix for Express 5+ preflight requests
// app.options('/*', cors());

app.use(express.json());
app.use('/api', chatRoutes);

export default app;
