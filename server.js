require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
connectDB(); // Initialize Database

app.use(cors());
app.use(express.json());

app.use('/api/projects', require('./routes/projectRoutes'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`SYSTEM_ONLINE_PORT_${PORT}`));