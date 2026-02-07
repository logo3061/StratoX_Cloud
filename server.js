const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db'); // Deine funktionierende db.js
require('dotenv').config();

const app = express();

// Datenbank starten
connectDB(); 

// Middleware
app.use(cors()); // Erlaubt deiner Website den Zugriff
app.use(express.json()); // Erlaubt dem Server, JSON-Daten zu lesen

// DIE ROUTE: Das hier behebt dein "Not Found" Problem
// Es verbindet den Ordner "routes" mit dem Pfad "/api/projects"
app.use('/api/projects', require('./routes/projectRoutes'));

// Test-Route (Nur zum Prüfen, ob der Server überhaupt lebt)
app.get('/', (req, res) => {
    res.send('Stratox-Cloud Engine is ONLINE');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`[SYSTEM] Engine running on port ${PORT}`);
});