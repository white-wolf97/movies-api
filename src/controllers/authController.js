const User = require('../models/user.js');
const hash = require('../utils/hash.js');
const TokenBlacklist = require('../models/tokenBlacklist.js');
const generateAccessToken = require('../utils/generateAccessToken.js')

module.exports = class AuthController {
    login(req, res) {
        try {
            const email = req.body.email.toLowerCase().trim();
            const password = req.body.password.trim();

            if (!email) {
                res.status(409).json({ status: 'fail', data: { statusmessage: 'Email cannot be empty!' } });
                return;
            }

            if (!/.+\@.+\..+/.test(email)) {
                res.status(409).json({ status: 'fail', data: { message: 'Invalid email!' } });
                return;
            }

            if (!password) {
                res.status(409).json({ status: 'fail', data: { message: 'Password cannot be empty!' } });
                return;
            }

            if (!User.exists(email)) {
                res.status(409).json({ status: 'fail', data: { message: `There is not a registered user with the email ${email} in the database` } });
                return;
            }

            const users = User.getDB();
            if (hash(password) === users[email].password) {
                const token = generateAccessToken(email);
                const { firstName, lastName } = users[email];
                res.json({ status: 'success', data: { token: token, user: firstName + ' ' + lastName } });
            }
            else
                res.status(401).json({ status: 'fail', data: { message: 'Wrong password!' } });

        }
        catch (exception) {
            res.status(500).json({ status: 'error', data: { message: 'An unexpected error occurred!' } });
            console.log(exception);
        }
    }

    logout(req, res) {
        try {
            const blacklist = TokenBlacklist.getBlacklist();
            const authHeader = req.headers['authorization']
            const token = authHeader && authHeader.split(' ')[1];

            blacklist.push(token);
            TokenBlacklist.saveToDB(blacklist);
            res.json({ status: 'success', data: { message: 'Logged out!' } });
        }
        catch (err) {
            res.status(500).json({ status: 'error', data: { message: 'An unexpected error occurred!' } });
            console.log(err.message);
            console.log(err.stack);
        }
    }
}