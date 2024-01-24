require('dotenv').config();
const express = require('express');
const cors = require('cors'); // Include CORS
const aiRoutes = require('./routes/ai');

const app = express();
const port = process.env.PORT || 5000;

// Set up CORS middleware with appropriate configuration
// You may need to adjust the origin depending on where your frontend is hosted
app.use(cors({
  origin: 'http://localhost:3000', // Replace with the URL of your frontend application
  methods: 'GET,POST,PUT,DELETE', // Allowed HTTP methods
  credentials: true, // This allows session cookies to be sent back and forth
}));

app.use(express.json());

app.use('/api', aiRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

