const crypto = require('crypto');
const config = require('../config');

module.exports = function (data) {
    const sha256gen = crypto.createHmac('sha256', config.passwordSalt);
    const result = sha256gen.update(data).digest('hex');
    return result;
};