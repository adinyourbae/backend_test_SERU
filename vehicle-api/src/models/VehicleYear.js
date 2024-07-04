const mongoose = require('mongoose');

const VehicleYearSchema = new mongoose.Schema({
    year: {
        type: Number,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('VehicleYear', VehicleYearSchema);
