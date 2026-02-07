const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true }, // z.B. "shafts"
    title: { type: String, required: true },
    version: { type: String, default: "V1.0" },
    status: { type: String, default: "ALPHA" },
    desc: { type: String },
    tags: [String]
});

module.exports = mongoose.model('Project', ProjectSchema);