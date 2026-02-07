const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();

app.use(express.json());
app.use(express.static('public'));

// Mock Database (In a real app, use MongoDB or PostgreSQL)
let projectStatus = {
    state: "PRE-ALPHA",
    obsidian: "OPERATIONAL",
    lastUpdated: new Date().toLocaleString()
};

// GET current status
app.get('/api/status', (req, res) => {
    res.json(projectStatus);
});

// POST update status (The Secure Part)
app.post('/api/admin/update', (req, res) => {
    const { adminKey, newState, newObsidian } = req.body;

    // Check against secret key stored on Render's Environment Variables
    if (adminKey === process.env.ADMIN_SECRET_KEY) {
        projectStatus.state = newState;
        projectStatus.obsidian = newObsidian;
        projectStatus.lastUpdated = new Date().toLocaleString();
        console.log("Status updated by Admin");
        return res.json({ success: true, status: projectStatus });
    }

    res.status(401).json({ success: false, message: "Invalid Unauthorized Key" });
});

// Route for all pages (Serving the main HTML)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));