const mongoose = require('mongoose');

const VehicleTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    brand_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'VehicleBrand',
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

module.exports = mongoose.model('VehicleType', VehicleTypeSchema);
