const jwt = require('jsonwebtoken');
const config = require('../config');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1];

    if(!token){
        return res.status(401).send("A token is required for authentication");//
    }

    try{
        const decoded = jwt.verify(token, config.tokenSecret);
        req.user = decoded;
    }
    catch(err){
        return res.status(401).send('Invalid token provided');
    }

    return next();
}

module.exports = authenticateToken;