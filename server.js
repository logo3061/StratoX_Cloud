// server.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();
connectDB(); // Startet die MongoDB-Verbindung

app.use(cors()); // WICHTIG: Erlaubt deiner Website den Zugriff
app.use(express.json());

// Diese Zeile verbindet deinen Ordner "routes" mit dem Pfad "/api/projects"
// Achte auf die exakte Schreibweise (Linux auf Render ist case-sensitive!)
app.use('/api/projects', require('./routes/projectRoutes')); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server läuft auf Port ${PORT}`));