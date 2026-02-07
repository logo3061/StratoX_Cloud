// server.js im Hauptverzeichnis
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

// Middleware (Wichtig für die Kommunikation mit der Website)
app.use(cors()); // Erlaubt den Zugriff von deiner Website-Domain
app.use(express.json()); // Erlaubt das Lesen von JSON-Daten

// Datenbankverbindung
connectDB();

// ROUTEN AKTIVIEREN
// Dieser Pfad muss exakt mit deinem Frontend übereinstimmen
app.use('/api/projects', require('./routes/projectRoutes')); 

// Startet den Server auf dem von Render zugewiesenen Port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server läuft auf Port ${PORT}`));