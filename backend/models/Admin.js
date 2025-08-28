const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// future we'll abstract the schema
const AdminSchema = new mongoose.Schema({
    unitName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    // We'll add a 'role' field to easily differentiate admin from other users
    // practice for role-based access control.
    role: {
        type: String,
        default: 'admin',
    },
});

// Add a pre-save hook to hash the password, just like the Cadet model
AdminSchema.pre('save', async function(next) {
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

const Admin = mongoose.model('Admin', AdminSchema);

module.exports = Admin;
