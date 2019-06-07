const mongoose = require('mongoose');

let areaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Area', areaSchema);