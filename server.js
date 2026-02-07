// server.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db'); // Deine DB-Verbindung
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Datenbank verbinden
connectDB();

// ROUTEN-REGISTRIERUNG
// WICHTIG: Hier muss '/api/projects' stehen, damit dein Frontend die Route findet
app.use('/api/projects', require('./routes/projectRoutes')); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`[SYSTEM] Engine online at port ${PORT}`));