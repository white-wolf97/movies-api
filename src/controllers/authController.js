const User = require('../models/user.js');
const hash = require('../utils/hash.js');
const TokenBlacklist = require('../models/tokenBlacklist.js');
const generateAccessToken = require('../utils/generateAccessToken.js')

module.exports = class AuthController{
    login(req, res){
        try{
            const email = req.body.email.toLowerCase();
            const password = req.body.password;

            if(!email)
            {
                res.status(409).json({message: 'Email cannot be empty!'});
                return;
            }

            if(!password)
            {
                res.status(409).json({message: 'Password cannot be empty!'});
                return;
            }
            
            if(!User.exists(email))
            {
                res.status(409).json({message: `There is not a registered user with the email ${email} in the database`});
            }
            else
            {
                const users = User.getDB();
                if(hash(password) === users[email].password){
                    const token = generateAccessToken(email);
                    res.json({token: token});
                }
                else
                    res.status(401).json({message: 'Wrong password!'});
            }
        }
        catch(exception){
            res.status(500).json({message: 'An unexpected error occurred!'});
            console.log(exception);
        }
    }

    logout(req, res){
        try{
            const blacklist = TokenBlacklist.getBlacklist();
            const authHeader = req.headers['authorization']
            const token = authHeader && authHeader.split(' ')[1];

            blacklist.push(token);
            TokenBlacklist.saveToDB(blacklist);
            res.json({message: 'Logged out!'});
        }
        catch(err){
            res.status(500).json({message: 'An unexpected error occurred!'});
            console.log(err);
            console.log(err.stack);
        }
    }
}