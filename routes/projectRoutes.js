const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// Das entspricht: GET https://stratox-cloud.onrender.com/api/projects
router.get('/', async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects); // Schickt die Liste an dein Frontend
    } catch (err) {
        res.status(500).json({ error: "DB_FETCH_FAILED" });
    }
});

module.exports = router;