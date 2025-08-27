

const express = require('express');
const Parade = require('C:\\Users\\nseg.lcl\\Documents\\CadetTracker\\models\\Parade.js');
const { protect, adminProtect } = require('../../../utils/authMiddleware');
const crypto = require('crypto');
const router = express.Router();


router.post('/', async (req, res) => {
    try {
        const { eventName, date, location } = req.body;

        // Check for required fields
        if (!eventName || !date || !location || !location.latitude || !location.longitude) {
            return res.status(400).json({ message: 'Please include all required fields: eventName, date, and location (latitude, longitude).' });
        }

        const qrCodeId = crypto.randomUUID(); 

        const parade = new Parade({
            eventName,
            date,
            location,
            qrCodeId,
            createdBy: req.user.id,
        });

        const createdParade = await parade.save();

        res.status(201).json(createdParade);
    } catch (error) {
        console.error('Error creating parade:', error);
        res.status(500).json({ message: 'Server error while creating parade.' });
    }
});

// API endpoint that retrieves a list of all parades from the database
router.get('/', async (req, res) => {
    try {
        // Find all parades and populate the 'createdBy' and 'attendees' fields.
        // The .populate() method replaces the user ID with the full user document.
        const parades = await Parade.find()
            .populate('createdBy', 'unitName username') // Get admin's unit and username
            .populate('attendees', 'name regimentalNo'); // Get cadet's name and regimental number

        res.status(200).json(parades);
    } catch (error) {
        console.error('Error fetching parades:', error);
        res.status(500).json({ message: 'Server error while fetching parades.' });
    }
});

//This route gets all the data for a single parade document--eventName, date, location, description,createdBy(unit name,username),attendees
router.get('/:id', async (req, res) => {
    try {
        const parade = await Parade.findById(req.params.id)
            .populate('createdBy', 'unitName username')
            .populate('attendees', 'name regimentalNo');

        if (!parade) {
            return res.status(404).json({ message: 'Parade not found.' });
        }

        res.status(200).json(parade);
    } catch (error) {
        console.error('Error fetching parade:', error);
        res.status(500).json({ message: 'Server error while fetching parade.' });
    }
});

module.exports = router;
