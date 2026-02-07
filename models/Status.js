const mongoose = require('mongoose');

const statusSchema = new mongoose.Schema({
    state: { type: String, default: "PRE-ALPHA" },
    obsidian: { type: String, default: "OPERATIONAL" },
    lastUpdated: { type: String, default: () => new Date().toLocaleString('de-DE') }
});

module.exports = mongoose.model('Status', statusSchema);