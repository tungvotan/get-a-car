import express, { Application } from 'express';
import formRoutes from './routes/form'; // Assuming formRoutes is the combined form submission and loan offer logic
import morgan from 'morgan';

const app: Application = express();

// limit json size to prevent out of memory
// since we're using in-memory
app.use(express.json({ limit: '50kb' }));
app.use(morgan('tiny'));

// Register Routes
app.use('/api/forms', formRoutes);

export default app;
