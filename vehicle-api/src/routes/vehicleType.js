const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/auth');
const VehicleType = require('../models/VehicleType');

// GET all vehicle types
router.get('/', authenticateToken, async (req, res) => {
    try {
        const vehicleTypes = await VehicleType.find();
        res.json(vehicleTypes);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// GET vehicle type by ID
router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const vehicleType = await VehicleType.findById(req.params.id);
        if (!vehicleType) return res.status(404).json({ message: 'Vehicle type not found' });
        res.json(vehicleType);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// POST new vehicle type (Admin only)
router.post('/', authenticateToken, async (req, res) => {
    if (!req.user.is_admin) return res.status(403).json({ message: 'Access denied' });

    const { name, brand_id } = req.body;

    try {
        const newVehicleType = new VehicleType({ name, brand_id });
        const vehicleType = await newVehicleType.save();
        res.json(vehicleType);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// PATCH vehicle type by ID (Admin only)
router.patch('/:id', authenticateToken, async (req, res) => {
    if (!req.user.is_admin) return res.status(403).json({ message: 'Access denied' });

    const { name, brand_id } = req.body;

    try {
        let vehicleType = await VehicleType.findById(req.params.id);
        if (!vehicleType) return res.status(404).json({ message: 'Vehicle type not found' });

        vehicleType.name = name || vehicleType.name;
        vehicleType.brand_id = brand_id || vehicleType.brand_id;
        vehicleType.updated_at = Date.now();

        await vehicleType.save();
        res.json(vehicleType);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// DELETE vehicle type by ID (Admin only)
router.delete('/:id', authenticateToken, async (req, res) => {
    if (!req.user.is_admin) return res.status(403).json({ message: 'Access denied' });

    try {
        const vehicleType = await VehicleType.findById(req.params.id);
        if (!vehicleType) return res.status(404).json({ message: 'Vehicle type not found' });

        await vehicleType.remove();
        res.json({ message: 'Vehicle type removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
