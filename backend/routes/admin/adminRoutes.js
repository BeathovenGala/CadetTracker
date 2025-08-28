

const express = require('express');
const { protect ,adminProtect } = require('../../utils/authMiddleware.js');
 // Path changed to reflect new folder depth
const paradeRoutes = require('./paradeRoutes.js'); // Correct path because both files are in the same folder

const router = express.Router();

// Apply the 'protect' and 'adminProtect' middleware to all routes
// that use this router. This simplifies security greatly.
router.use(protect, adminProtect);

// All routes in paradeRoutes will now be prefixed with '/parades'.
// For example, the POST '/' route in paradeRoutes becomes POST '/parades'.
router.use('/parades', paradeRoutes);

// You can add more admin-related routes here later, like for managing cadets.
// router.use('/cadets', require('./admin/cadetRoutes'));

module.exports = router;
