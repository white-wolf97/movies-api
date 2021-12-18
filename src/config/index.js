const path = require('path');
const dotenv = require('dotenv');

dotenv.config({
    path: path.resolve(__dirname, '..', '..', '.env')
});

const config = {
    passwordSalt: process.env.PASSWORD_SALT || 'b1313eca95ce2035f9b8a2ec2974d756',
    apiKey: process.env.API_KEY || '',
    port: process.env.PORT || 3000
};

module.exports = config;