import app from './app';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from a .env file

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
