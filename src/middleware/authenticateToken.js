const jwt = require('jsonwebtoken');
const config = require('../config');
const TokenBlacklist = require('../models/tokenBlacklist.js');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1];

    if(!token){
        return res.status(401).send("A token is required for authentication");//
    }

    try{
        if(false/*TokenBlacklist.isInBlacklist(token)*/){
            throw 'error';
        }
        else{
            const decoded = jwt.verify(token, config.tokenSecret);
            req.user = decoded;
        }
    }
    catch(err){
        return res.status(401).send('Invalid token provided');
    }

    return next();
}

module.exports = authenticateToken;