const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// GET: Alle Projekte abrufen (Für deine Website)
// URL: https://stratox-cloud.onrender.com/api/projects
router.get('/', async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (err) {
        res.status(500).json({ error: "Fehler beim Laden der Daten" });
    }
});

// PATCH: Projekt aktualisieren (Für curl/PowerShell)
// URL: https://stratox-cloud.onrender.com/api/projects/:id
router.patch('/:id', async (req, res) => {
    const masterKey = req.headers['x-api-key'];
    
    // Checkt den STUDIO_MASTER_KEY aus deinen Render-Einstellungen
    if (masterKey !== process.env.STUDIO_MASTER_KEY) {
        return res.status(403).json({ error: "API Key ungültig" });
    }

    try {
        const updated = await Project.findOneAndUpdate(
            { id: req.params.id },
            { $set: req.body },
            { new: true, upsert: true } // Erstellt das Projekt, falls es nicht existiert
        );
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;