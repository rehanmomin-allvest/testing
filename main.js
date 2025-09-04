// server.js
const express = require('express');
const cors = require('cors');
const hospitalRoutes = require('./routes/hospitalRoutes');
// require('dotenv').config();

const app = express();
const PORT = 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/', (req, res) => {res.send('API is running...')});

// Routes
app.use('/api', hospitalRoutes);
// Example: http://localhost:8000/api/getAllDetails

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Global Error:', err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
