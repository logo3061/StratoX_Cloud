const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

// DB verbinden
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routen registrieren
// Alles in 'projectRoutes.js' startet jetzt mit '/api/projects'
app.use('/api/projects', require('./routes/projectRoutes'));

// Root-Check für den Browser
app.get('/', (req, res) => res.send('Stratox-Cloud Engine ONLINE'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server läuft auf Port ${PORT}`));