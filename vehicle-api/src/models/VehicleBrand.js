const mongoose = require('mongoose');

const VehicleBrandSchema = new mongoose.Schema({
    name: {
        type: String,
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

module.exports = mongoose.model('VehicleBrand', VehicleBrandSchema);
