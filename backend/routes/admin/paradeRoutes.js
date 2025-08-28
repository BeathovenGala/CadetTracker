

const express = require('express');
const Parade = require('../../models/Parade');
const { protect, adminProtect } = require('../../utils/authMiddleware.js');
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
            .populate('attendees', 'name regimentalNo college gender');  // Populate the new college and gender fields

        if (!parade) {
            return res.status(404).json({ message: 'Parade not found.' });
        }
        // Process the attendance data to generate the requested statistics
        const attendees = parade.attendees;
        const totalCadets = attendees.length;

        // Count SDs and SWs
        const totalSDs = attendees.filter(cadet => cadet.gender === 'SD').length;
        const totalSWs = attendees.filter(cadet => cadet.gender === 'SW').length;

        // Count cadets by college using reduce
        const cadetsByCollege = attendees.reduce((acc, cadet) => {
            acc[cadet.college] = (acc[cadet.college] || 0) + 1;
            return acc;
        }, {});

        const paradeDetails = {
            eventName: parade.eventName,
            date: parade.date,
            location: parade.location,
            createdBy: parade.createdBy,
            attendanceStats: {
                totalCadets,
                totalSDs,
                totalSWs,
                cadetsByCollege,
            },
            attendees: attendees.map(cadet => ({
                name: cadet.name,
                regimentalNo: cadet.regimentalNo,
                college: cadet.college,
                gender: cadet.gender
            })),
        };
        res.status(200).json(parade);
    } catch (error) {
        console.error('Error fetching parade:', error);
        res.status(500).json({ message: 'Server error while fetching parade.' });
    }
});

module.exports = router;
