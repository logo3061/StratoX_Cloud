const mongoose = require('mongoose');

// Das Schema definiert die Struktur der Daten in der Datenbank
const statusSchema = new mongoose.Schema({
    // Der aktuelle Status des Spiels (z.B. PRE-ALPHA, ALPHA, etc.)
    state: {
        type: String,
        default: "PRE-ALPHA",
        uppercase: true
    },
    // Der System-Status von Obsidian™ (z.B. OPERATIONAL, MAINTENANCE)
    obsidian: {
        type: String,
        default: "OPERATIONAL",
        uppercase: true
    },
    // Zeitstempel der letzten Änderung
    lastUpdated: {
        type: String,
        default: () => new Date().toLocaleString('de-DE', { timeZone: 'Europe/Berlin' })
    }
});

// Wir exportieren das Modell, damit wir es in der server.js benutzen können
module.exports = mongoose.model('Status', statusSchema);