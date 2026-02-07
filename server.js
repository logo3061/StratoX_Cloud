const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

// Datenbank verbinden
connectDB();

// Middleware
app.use(cors()); // Erlaubt deiner Website den Zugriff
app.use(express.json()); // Erlaubt das Lesen von JSON-Daten

// Routen registrieren
// WICHTIG: '/api/projects' muss exakt so im Frontend stehen
app.use('/api/projects', require('./routes/projectRoutes'));

// Test-Endpunkt für den Browser
app.get('/', (req, res) => res.send('Stratox-Cloud Engine ONLINE'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server läuft auf Port ${PORT}`));