const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();

app.use(express.json());
app.use(express.static('public'));

// This is your persistent state
let projectStatus = {
    state: "PRE-ALPHA",
    obsidian: "OPERATIONAL",
    lastUpdated: new Date().toLocaleString()
};

// Public API
app.get('/api/status', (req, res) => res.json(projectStatus));

// Secure Admin API
app.post('/api/admin/update', (req, res) => {
    const { adminKey, newState, newObsidian } = req.body;

    // Checks the password safely on the server
    if (adminKey === process.env.ADMIN_KEY) {
        projectStatus.state = newState;
        projectStatus.obsidian = newObsidian;
        projectStatus.lastUpdated = new Date().toLocaleString();
        return res.json({ success: true });
    }
    res.status(401).json({ success: false });
});

app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server live on port ${PORT}`));