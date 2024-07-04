// routes/vehicleYearRoutes.js
const express = require('express');
const router = express.Router();
const VehicleYear = require('../models/VehicleYear');

// Route untuk mendapatkan semua tahun kendaraan
router.get('/', async (req, res) => {
    try {
        const vehicleYears = await VehicleYear.find();
        res.json(vehicleYears);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route untuk membuat tahun kendaraan baru
router.post('/', async (req, res) => {
    const vehicleYear = new VehicleYear({
        year: req.body.year
    });

    try {
        const newVehicleYear = await vehicleYear.save();
        res.status(201).json(newVehicleYear);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Route untuk mendapatkan detail tahun kendaraan berdasarkan ID
router.get('/:id', getVehicleYear, (req, res) => {
    res.json(res.vehicleYear);
});

// Middleware untuk mendapatkan tahun kendaraan berdasarkan ID
async function getVehicleYear(req, res, next) {
    let vehicleYear;
    try {
        vehicleYear = await VehicleYear.findById(req.params.id);
        if (vehicleYear == null) {
            return res.status(404).json({ message: 'Cannot find vehicle year' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.vehicleYear = vehicleYear;
    next();
}

// Route untuk mengupdate tahun kendaraan berdasarkan ID
router.patch('/:id', getVehicleYear, async (req, res) => {
    if (req.body.year != null) {
        res.vehicleYear.year = req.body.year;
    }
    res.vehicleYear.updated_at = Date.now();

    try {
        const updatedVehicleYear = await res.vehicleYear.save();
        res.json(updatedVehicleYear);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Route untuk menghapus tahun kendaraan berdasarkan ID
router.delete('/:id', getVehicleYear, async (req, res) => {
    try {
        await res.vehicleYear.remove();
        res.json({ message: 'Deleted vehicle year' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
