const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true }, // e.g., 'the-shafts'
    title: { type: String, required: true },
    version: { type: String, default: "1.0.0" },
    status: { 
        type: String, 
        enum: ['LIVE', 'ALPHA', 'BETA', 'MAINTENANCE', 'DEV'], 
        default: 'DEV' 
    },
    desc: String,
    longDesc: String,
    tags: [String],
    link: { type: String, default: "Inactive" }
});

module.exports = mongoose.model('Project', ProjectSchema);