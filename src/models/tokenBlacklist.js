const { Schema, model } = require('mongoose');

const TokenBlacklistSchema = Schema({
    token: {
        type: String,
        required: true,
    },
});

module.exports = model('TokenBlacklist', TokenBlacklistSchema);