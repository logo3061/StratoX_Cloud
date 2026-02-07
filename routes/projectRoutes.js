const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// 1. Alle Projekte abrufen (Für deine Website)
// Erreichbar unter: https://stratox-cloud.onrender.com/api/projects
router.get('/', async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: "Fehler beim Laden der Cloud-Daten" });
    }
});

// 2. Status/Version updaten (Für deinen curl-Befehl)
router.patch('/:id', async (req, res) => {
    // Sicherheits-Check mit deinem STUDIO_MASTER_KEY von Render
    if (req.headers['x-api-key'] !== process.env.STUDIO_MASTER_KEY) {
        return res.status(403).json({ message: "Zugriff verweigert: Falscher API-Key" });
    }

    try {
        const updated = await Project.findOneAndUpdate(
            { id: req.params.id },
            { $set: req.body },
            { new: true, upsert: true } // Erstellt das Projekt, falls es noch nicht existiert
        );
        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;