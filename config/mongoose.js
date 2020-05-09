const mongoose = require('mongoose');
const env = require('../config/environment');
mongoose.connect(`mongodb://localhost/${env.db}`);

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to mongodb"));

db.once('open', function () {
    console.log('Connected to DB MongoDB'); 
});

module.exports = db;