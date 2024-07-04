const mongoose = require('mongoose');

const VehicleModelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'VehicleType',
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

module.exports = mongoose.model('VehicleModel', VehicleModelSchema);
