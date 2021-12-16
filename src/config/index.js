const path = require('path');
const dotenv = require('dotenv');

dotenv.config({
    path: path.resolve(__dirname, '..', '..', '.env')
});

const config = {
    apiKey: process.env.API_KEY || '',
    port: process.env.PORT || 3000
};

module.exports = config;