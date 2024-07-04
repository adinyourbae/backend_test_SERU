const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/auth');
const VehicleBrand = require('../models/VehicleBrand');

// GET all vehicle brands
router.get('/', authenticateToken, async (req, res) => {
    try {
        const vehicleBrands = await VehicleBrand.find();
        res.json(vehicleBrands);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// GET vehicle brand by ID
router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const vehicleBrand = await VehicleBrand.findById(req.params.id);
        if (!vehicleBrand) return res.status(404).json({ message: 'Vehicle brand not found' });
        res.json(vehicleBrand);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// POST new vehicle brand (Admin only)
router.post('/', authenticateToken, async (req, res) => {
    if (!req.user.is_admin) return res.status(403).json({ message: 'Access denied' });

    const { name } = req.body;

    try {
        const newVehicleBrand = new VehicleBrand({ name });
        const vehicleBrand = await newVehicleBrand.save();
        res.json(vehicleBrand);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// PATCH vehicle brand by ID (Admin only)
router.patch('/:id', authenticateToken, async (req, res) => {
    if (!req.user.is_admin) return res.status(403).json({ message: 'Access denied' });

    const { name } = req.body;

    try {
        let vehicleBrand = await VehicleBrand.findById(req.params.id);
        if (!vehicleBrand) return res.status(404).json({ message: 'Vehicle brand not found' });

        vehicleBrand.name = name || vehicleBrand.name;
        vehicleBrand.updated_at = Date.now();

        await vehicleBrand.save();
        res.json(vehicleBrand);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// DELETE vehicle brand by ID (Admin only)
router.delete('/:id', authenticateToken, async (req, res) => {
    if (!req.user.is_admin) return res.status(403).json({ message: 'Access denied' });

    try {
        const vehicleBrand = await VehicleBrand.findById(req.params.id);
        if (!vehicleBrand) return res.status(404).json({ message: 'Vehicle brand not found' });

        await vehicleBrand.remove();
        res.json({ message: 'Vehicle brand removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
