

const express = require('express');
const Parade = require('../../models/Parade');

const router = express.Router();


router.post('/', async (req, res) => {
    try {
        const { eventName, date, location } = req.body;

        // Check for required fields
        if (!eventName || !date || !location || !location.latitude || !location.longitude) {
            return res.status(400).json({ message: 'Please include all required fields: eventName, date, and location (latitude, longitude).' });
        }

        const parade = new Parade({
            eventName,
            date,
            location,
            createdBy: req.user.id,
        });

        const createdParade = await parade.save();

        res.status(201).json(createdParade);
    } catch (error) {
        console.error('Error creating parade:', error);
        res.status(500).json({ message: 'Server error while creating parade.' });
    }
});

module.exports = router;
