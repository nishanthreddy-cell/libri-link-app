const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- Database Connection ---
// The connection string is now loaded from an environment variable for security
const dbURI = process.env.MONGODB_URI;

console.log('Attempting to connect to MongoDB...');

mongoose.connect(dbURI)
  .then(() => {
    console.log('MongoDB connected successfully.');
    
    // Start the server ONLY after the database is connected
    // Use the port provided by the hosting service, or 5000 for local development
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    // This will show a detailed error if the connection fails
    console.error('Could not connect to MongoDB. Error:', err);
  });

// --- API Routes ---
app.use('/api/books', require('./routes/bookRoutes'));
// Add other routes here as you build them
// app.use('/api/members', require('./routes/memberRoutes'));