const express = require('express');
const mongoose = require('mongoose'); // Hinzugefügt für DB
const path = require('path');
require('dotenv').config();

const Status = require('./models/Status'); // Dein Status-Modell importieren

const app = express();
app.use(express.json());
app.use(express.static('public'));

// 1. DATENBANK-VERBINDUNG
mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log(">> core_linked: obsidian_db_active"))
    .catch(err => console.error(">> sync_error: db_connection_failed", err));

// 2. PUBLIC API (Holt Daten aus MongoDB)
app.get('/api/status', async (req, res) => {
    try {
        let status = await Status.findOne();
        if (!status) status = await Status.create({}); // Erstellt Standard-Status falls DB leer
        res.json(status);
    } catch (e) {
        res.status(500).json({ error: "sync_failure" });
    }
});

// 3. SECURE ADMIN API (Die "Unhackable" Route)
app.post('/api/admin/update', async (req, res) => {
    const { adminKey, newState, newObsidian } = req.body;

    // Sicherheits-Check gegen Render Env-Var
    if (adminKey === process.env.ADMIN_KEY) {
        try {
            const updated = await Status.findOneAndUpdate(
                {}, // Wir nehmen das erste Dokument
                { 
                    state: newState, 
                    obsidian: newObsidian, 
                    lastUpdated: new Date().toLocaleString('de-DE') 
                },
                { new: true, upsert: true } // Wichtig: upsert erstellt es, falls es fehlt
            );
            
            console.log(`>> sync_confirmed: ${newState}`);
            return res.json({ success: true, status: updated });
        } catch (e) {
            return res.status(500).json({ success: false, message: "db_write_error" });
        }
    }
    
    console.warn(">> alert: unauthorized_access_attempt");
    res.status(401).json({ success: false });
});

app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`>> system_online: port_${PORT}`));