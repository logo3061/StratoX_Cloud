const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

// Importiere das Modell (Stelle sicher, dass der Pfad stimmt)
const Status = require('./models/Status');

const app = express();

// Middleware
app.use(express.json());
app.use(express.static('public'));

// 1. Verbindung zur Datenbank (MongoDB Atlas)
// Die URL kommt aus deinen Render Environment Variables
mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log("✅ Obsidian_DB verbunden"))
    .catch(err => console.error("❌ DB Verbindungsfehler:", err));

// 2. Public API: Status abrufen
app.get('/api/status', async (req, res) => {
    try {
        // Findet den ersten (und einzigen) Status-Eintrag
        let currentStatus = await Status.findOne();
        
        // Falls noch gar kein Eintrag existiert (beim ersten Start), erstelle einen
        if (!currentStatus) {
            currentStatus = await Status.create({});
        }
        
        res.json(currentStatus);
    } catch (err) {
        res.status(500).json({ error: "Fehler beim Laden des Status" });
    }
});

// 3. Secure Admin API: Status aktualisieren
app.post('/api/admin/update', async (req, res) => {
    const { adminKey, newState, newObsidian } = req.body;

    // Sicherheits-Check: Passwort vom Server-Environment
    if (adminKey !== process.env.ADMIN_KEY) {
        console.warn("🚫 Unautorisierter Zugriffsversuch!");
        return res.status(401).json({ success: false, message: "Falscher Key" });
    }

    try {
        // Aktualisiert den Eintrag in MongoDB (oder erstellt ihn, falls nicht vorhanden)
        const updated = await Status.findOneAndUpdate(
            {}, // Suchfilter (leeres Objekt nimmt das erste Dokument)
            {
                state: newState,
                obsidian: newObsidian,
                lastUpdated: new Date().toLocaleString('de-DE', { timeZone: 'Europe/Berlin' })
            },
            { new: true, upsert: true }
        );

        console.log(`🚀 Status Update: ${newState} | ${newObsidian}`);
        res.json({ success: true, status: updated });
    } catch (err) {
        console.error("❌ Update Fehler:", err);
        res.status(500).json({ success: false, error: "Datenbank-Fehler" });
    }
});

// 4. Fallback: Alle anderen Anfragen senden die index.html (SPA-Routing)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Port-Konfiguration für Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`
    -------------------------------------------
    TEK Studios™ Core live auf Port ${PORT}
    Obsidian™ System initialisiert.
    -------------------------------------------
    `);
});