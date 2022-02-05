const jwt = require('jsonwebtoken');
const config = require('../config');
const DatabaseError = require('../exceptions/databaseError.js');
const TokenBlacklist = require('../models/tokenBlacklist.js');

async function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ status: 'fail', data: { message: "A token is required for authentication" } });
    }

    try {
        const tokenInBlacklist = await TokenBlacklist.findOne({ token });
        if (tokenInBlacklist) {
            return res.status(401).json({ status: 'fail', data: { message: 'Invalid token provided' } });
        }
        else {
            const decoded = jwt.verify(token, config.tokenSecret);
            req.user = decoded;
        }
    }
    catch (err) {
        if (err instanceof DatabaseError) {
            console.log(err.message);
            console.log(err.stack);
            return res.status(500).json({ status: 'error', data: { message: 'Internal server error!' } });
        }
        else {
            return res.status(401).json({ status: 'fail', data: { message: 'Invalid token provided' } });
        }
    }
    next();
}

module.exports = authenticateToken;