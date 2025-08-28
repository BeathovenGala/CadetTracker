// models/User.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the unified User schema
const UserSchema = new mongoose.Schema({
    // Fields common to both cadets and admins
    username: { // Used for admin login
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['cadet', 'admin'],
        required: true,
    },

    // Fields specific to cadets
    name: {
        type: String,
        trim: true,
        // The 'required' status is conditional based on the role
        required: function() { return this.role === 'cadet'; }
    },
    regimentalNo: {
        type: String,
        trim: true,
        unique: true,
        required: function() { return this.role === 'cadet'; }
    },
    unit: {
        type: String,
        trim: true,
        required: function() { return this.role === 'cadet'; }
    },
    college: {
        type: String,
        trim: true,
        required: function() { return this.role === 'cadet'; }
    },
    gender: {
        type: String,
        trim: true,
        enum: ['SD', 'SW', null],
        required: function() { return this.role === 'cadet'; }
    },
    year: {
        type: String,
        trim: true,
        required: function() { return this.role === 'cadet'; }
    },
    enrollmentYear: {
        type: Number,
        required: function() { return this.role === 'cadet'; }
    }
});

// Add a pre-save hook to hash the password before saving
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
