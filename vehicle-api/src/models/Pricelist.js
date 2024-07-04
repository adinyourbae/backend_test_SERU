const mongoose = require('mongoose');

const PricelistSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    year_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'VehicleYear',
        required: true,
    },
    model_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'VehicleModel',
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

module.exports = mongoose.model('Pricelist', PricelistSchema);
