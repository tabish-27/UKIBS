import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());

// Test backend route
app.get('/api/test-server', (req, res) => {
  res.send('Backend server is running!');
});

// Test DB route (if DB connected)
app.get('/api/test-db', (req, res) => {
  res.send('Database connected!');
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
