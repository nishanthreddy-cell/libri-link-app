const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const dbURI = 'mongodb://localhost:27017/libri-link';

console.log('Attempting to connect to MongoDB...');

mongoose.connect(dbURI)
  .then(() => {
    console.log('MongoDB connected successfully.');
    
  
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, '0.0.0.0', () => { 
      console.log(`Server running on port ${PORT}`);
    });
  

  })
  .catch(err => {
    console.error('Could not connect to MongoDB. Error:', err);
  });

app.use('/api/books', require('./routes/bookRoutes'));