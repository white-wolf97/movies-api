const config = require('../config');
const jwt = require('jsonwebtoken');

module.exports = function (email) {
    return jwt.sign({email}, config.tokenSecret, { expiresIn: '1800s' });
};