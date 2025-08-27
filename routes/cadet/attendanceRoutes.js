// routes/cadet/attendanceRoutes.js

const express = require('express');
const { protect } = require('C:\\Users\\nseg.lcl\\Documents\\CadetTracker\\Utils\\authMiddleware.js');
const Parade = require('C:\\Users\\nseg.lcl\\Documents\\CadetTracker\\models\\Parade.js');

const router = express.Router();
const { getDistance } = require('C:\\Users\\nseg.lcl\\Documents\\CadetTracker\\Utils\\functions\\getDistance.js');
const { deg2rad } = require('C:\\Users\\nseg.lcl\\Documents\\CadetTracker\\Utils\\functions\\deg2rad.js');

router.post('/attendance', protect, async (req, res) => {
    try {
        const { qrCodeId, latitude, longitude } = req.body;
        const cadetId = req.user.id; // Get the cadet's ID from the decoded JWT

        if (!qrCodeId || latitude === undefined || longitude === undefined) {
            return res.status(400).json({ message: 'Please provide QR code ID and location.' });
        }

        // Find the parade using the unique QR code ID
        const parade = await Parade.findOne({ qrCodeId });

        if (!parade) {
            return res.status(404).json({ message: 'Parade not found.' });
        }

        // Simple GPS location verification logic
        
        // geospatial library (e.g., GeoJSON, turf.js)
        const distance = getDistance(
            parade.location.latitude,
            parade.location.longitude,
            latitude,
            longitude
        );

        // Define a radius for verification (e.g., 50 meters)
        const verificationRadius = 0.05; // 0.05 km = 50 meters

        if (distance > verificationRadius) {
            return res.status(403).json({ message: 'You are not at the parade location.' });
        }

        // Check if the cadet has already submitted attendance
        if (parade.attendees.includes(cadetId)) {
            return res.status(409).json({ message: 'Attendance already marked for this parade.' });
        }

        // Mark attendance by adding the cadet's ID to the attendees array
        parade.attendees.push(cadetId);
        await parade.save();

        res.status(200).json({ message: 'Attendance marked successfully.' });

    } catch (error) {
        console.error('Error marking attendance:', error);
        res.status(500).json({ message: 'Server error while marking attendance.' });
    }
});

// A simple helper function to calculate distance between two GPS coordinates
// This is a basic implementation of the Haversine formula
function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
}

function deg2rad(deg) {
    return deg * (Math.PI / 180);
}

module.exports = router;
