const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// Middleware to check API Key for changes
const auth = (req, res, next) => {
    if (req.header('x-api-key') !== process.env.STUDIO_MASTER_KEY) {
        return res.status(401).json({ error: "UNAUTHORIZED_ACCESS" });
    }
    next();
};

// PUBLIC: Get all projects
router.get('/', async (req, res) => {
    const projects = await Project.find();
    res.json(projects);
});

// PRIVATE: Update a project (PATCH)
router.patch('/:id', auth, async (req, res) => {
    try {
        const updated = await Project.findOneAndUpdate(
            { id: req.params.id }, 
            req.body, 
            { new: true }
        );
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: "UPDATE_FAILED" });
    }
});
// Add this to projectRoutes.js to allow creating new entries
router.post('/', auth, async (req, res) => {
    try {
        const newProject = new Project(req.body);
        await newProject.save();
        res.status(201).json(newProject);
    } catch (err) {
        res.status(400).json({ error: "Creation failed. ID might already exist." });
    }
});
module.exports = router;