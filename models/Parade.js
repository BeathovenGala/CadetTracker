const mongoose = require('mongoose');

// Define the Parade schema.
const ParadeSchema = new mongoose.Schema({
    eventName: {
        type: String,
        required: true,
        trim: true,
    },
    date: {
        type: Date,
        required: true,
    },
    location: {
        latitude: {
            type: Number,
            required: true,
        },
        longitude: {
            type: Number,
            required: true,
        },
    },
    // We'll store a list of cadets who attended this parade.
    // This is a list of references to the Cadet model.
    attendees: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cadet', // This links the attendee's ID to the Cadet model
    }],
    // The admin who created this event.
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin', // Links the event to the Admin who created it
    },
});

// Create and export the Mongoose model.
const Parade = mongoose.model('Parade', ParadeSchema);

module.exports = Parade;