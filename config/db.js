const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('>>> MONGO_DB_CONNECTED');
    } catch (err) {
        console.error('DATABASE_CONNECTION_ERROR:', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;