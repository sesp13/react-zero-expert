const express = require('express');
const { dbConnection } = require('./database/dbConnection');
const cors = require('cors');
require('dotenv').config();

const port = process.env.PORT || 3000;

const app = express();

// DB config
dbConnection();

// Cors config
app.use(cors());

// Public folder config
app.use(express.static('public'));

// Read Jsons from the requests.
app.use(express.json());

// Route configuration
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/events', require('./routes/eventsRoutes'));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
