const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const protect = (req, res, next) => {
    let token;

    // Check if the 'Authorization' header exists and starts with 'Bearer'
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get the token from the 'Authorization' header.
            // It looks like 'Bearer TOKEN', so we split it and take the second part.
            token = req.headers.authorization.split(' ')[1];

            // Verifys the token using the secret key.
            const decoded = jwt.verify(token, JWT_SECRET);

            // Add the decoded user ID to the request object.
            // This makes the user's ID available in all subsequent route handlers.
            req.user = decoded.id;

            // Call the next middleware or route handler.
            next();
        } catch (error) {
            // If the token is invalid, send an unauthorized error.
            res.status(401).json({ message: 'Not authorized, token failed.' });
        }
    }

    // If no token is provided in the header, send an error.
    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token.' });
    }
};

const adminProtect = (req, res, next) => {
    // We can rely on the 'protect' middleware to run first.
    // If we reach this point, the token is valid, and we just need to check the role.
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Forbidden: Admin access required.' });
    }
};
module.exports = { protect,adminProtect };