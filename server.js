const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const Status = require('./models/Status');
const app = express();

app.use(express.json());

// Wichtig: Zeigt auf den Ordner 'public' im Hauptverzeichnis
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log(">> Obsidian Core: Connected"))
    .catch(err => console.error(">> DB Error:", err));

app.get('/api/status', async (req, res) => {
    try {
        let status = await Status.findOne();
        if (!status) status = await Status.create({});
        res.json(status);
    } catch (e) { res.status(500).json({ error: "Fetch error" }); }
});

app.post('/api/admin/update', async (req, res) => {
    const { adminKey, newState, newObsidian } = req.body;
    if (adminKey === process.env.ADMIN_KEY) {
        try {
            const updated = await Status.findOneAndUpdate({}, 
                { state: newState, obsidian: newObsidian, lastUpdated: new Date().toLocaleString('de-DE') },
                { new: true, upsert: true }
            );
            return res.json({ success: true, status: updated });
        } catch (e) { return res.status(500).json({ success: false }); }
    }
    res.status(401).json({ success: false });
});

// Fallback für die index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`>> Live on Port ${PORT}`));