// server.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

// WICHTIG: Hier wird der Pfad definiert, den das Frontend sucht
app.use('/api/projects', require('./routes/projectRoutes')); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));