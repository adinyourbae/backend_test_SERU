// routes/vehicleModelRoutes.js
const express = require('express');
const router = express.Router();
const VehicleModel = require('../models/VehicleModel');
const VehicleType = require('../models/VehicleType'); // Import model VehicleType jika diperlukan
const mongoose = require('mongoose');

// Route untuk mendapatkan semua model kendaraan
router.get('/', async (req, res) => {
    try {
        const vehicleModels = await VehicleModel.find().populate('type_id');
        res.json(vehicleModels);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route untuk membuat model kendaraan baru
router.post('/', async (req, res) => {
    const vehicleModel = new VehicleModel({
        name: req.body.name,
        type_id: mongoose.Types.ObjectId(req.body.type_id)
    });

    try {
        const newVehicleModel = await vehicleModel.save();
        res.status(201).json(newVehicleModel);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Route untuk mendapatkan detail model kendaraan berdasarkan ID
router.get('/:id', getVehicleModel, (req, res) => {
    res.json(res.vehicleModel);
});

// Middleware untuk mendapatkan model kendaraan berdasarkan ID
async function getVehicleModel(req, res, next) {
    let vehicleModel;
    try {
        vehicleModel = await VehicleModel.findById(req.params.id).populate('type_id');
        if (vehicleModel == null) {
            return res.status(404).json({ message: 'Cannot find vehicle model' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.vehicleModel = vehicleModel;
    next();
}

// Route untuk mengupdate model kendaraan berdasarkan ID
router.patch('/:id', getVehicleModel, async (req, res) => {
    if (req.body.name != null) {
        res.vehicleModel.name = req.body.name;
    }
    if (req.body.type_id != null) {
        res.vehicleModel.type_id = mongoose.Types.ObjectId(req.body.type_id);
    }
    res.vehicleModel.updated_at = Date.now();

    try {
        const updatedVehicleModel = await res.vehicleModel.save();
        res.json(updatedVehicleModel);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Route untuk menghapus model kendaraan berdasarkan ID
router.delete('/:id', getVehicleModel, async (req, res) => {
    try {
        await res.vehicleModel.remove();
        res.json({ message: 'Deleted vehicle model' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
