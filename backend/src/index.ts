import app from './app';
import { connectMongo } from './db/mongo';
import { sequelize } from './db/sql';
import { User } from './models/User';

const PORT = process.env.PORT || 5050;

const startServer = async () => {
  try {
    await connectMongo();
    // await sequelize.sync(); // Uncomment if needed

    console.log('MongoDB connected');
    console.log('PostgreSQL connected');

    const server = app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });

    server.on('error', (err: NodeJS.ErrnoException) => {
      if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Please use a different port.`);
      } else {
        console.error('Server failed to start:', err);
      }
    });

  } catch (err) {
    console.error('Failed to initialize server:', err);
  }
};

startServer();
