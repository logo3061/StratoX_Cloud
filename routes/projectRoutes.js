// routes/projectRoutes.js
const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// Das hier ist dann automatisch: https://.../api/projects/
router.get('/', async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (err) {
        res.status(500).json({ error: "DB_FETCH_ERROR" });
    }
});

module.exports = router;