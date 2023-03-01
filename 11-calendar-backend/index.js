const express = require('express');
const { dbConnection } = require('./database/dbConnection');
require('dotenv').config();

const port = process.env.PORT || 3000;

const app = express();

// DB config
dbConnection();

// Public folder config
app.use(express.static('public'));

// Read Jsons from the requests.
app.use(express.json());

// Route configuration
app.use('/api/auth', require('./routes/authRoutes'));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
