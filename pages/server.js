const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.static('public'));

// 1. DATABASE SCHEMA (The "Save" Structure)
const statusSchema = new mongoose.Schema({
    state: { type: String, default: "PRE-ALPHA" },
    obsidian: { type: String, default: "OPERATIONAL" },
    lastUpdated: { type: String, default: new Date().toLocaleString() }
});
const Status = mongoose.model('Status', statusSchema);

// 2. CONNECT TO MONGODB
mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log("CONNECTED TO OBSIDIAN_DATABASE"))
    .catch(err => console.error("CONNECTION_ERROR:", err));

// 3. SECURE ROUTES
app.get('/api/status', async (req, res) => {
    let data = await Status.findOne();
    if (!data) data = await Status.create({}); // Create first record if empty
    res.json(data);
});

app.post('/api/admin/update', async (req, res) => {
    const { adminKey, newState, newObsidian } = req.body;

    // Server-side password check
    if (adminKey !== process.env.ADMIN_SECRET_KEY) {
        return res.status(401).json({ success: false, message: "UNAUTHORIZED" });
    }

    const updated = await Status.findOneAndUpdate({}, {
        state: newState,
        obsidian: newObsidian,
        lastUpdated: new Date().toLocaleString()
    }, { new: true });

    res.json({ success: true, status: updated });
});

app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`CORE_LIVE_ON_PORT_${PORT}`));