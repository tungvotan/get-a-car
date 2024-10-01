import express, { Application } from 'express';
import formRoutes from './routes/form'; // Assuming formRoutes is the combined form submission and loan offer logic
import morgan from 'morgan';
import cors from 'cors';

const app: Application = express();

// List of allowed origins
const allowedOrigins = ['http://localhost:3000'];
const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS')); // Origin is not allowed
    }
  },
};
app.use(cors(corsOptions));

// limit json size to prevent out of memory
// since we're using in-memory
app.use(express.json({ limit: '50kb' }));
app.use(morgan('tiny'));

// Register Routes
app.use('/api/forms', formRoutes);

export default app;
