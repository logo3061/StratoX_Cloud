const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true }, // z.B. "shafts"
    title: { type: String, required: true },
    version: { type: String, default: "V1.0" },
    desc: { type: String },
    longDesc: { type: String },
    status: { type: String, default: "ALPHA" },
    link: { type: String, default: "Inactive" },
    tags: [String]
});

module.exports = mongoose.model('Project', ProjectSchema);