const User = require('../models/user.js');
const hash = require('../utils/hash.js');
const generateAccessToken = require('../utils/generateAccessToken.js')

module.exports = class AuthController{
    login(req, res){
        try{
            const email = req.body.email.toLowerCase();
            const password = req.body.password;

            if(!email)
            {
                res.send('Email cannot be empty!');
                return;
            }

            if(!password)
            {
                res.send('Password cannot be empty!');
                return;
            }
            
            if(!User.exists(email))
            {
                res.status(409).send(`There is not a registered user with the email ${email} in the database`);
            }
            else
            {
                const users = User.getDB();
                if(hash(password) === users[email].password){
                    const token = generateAccessToken(email);
                    res.json({token: token});
                }
                else
                    res.status(401).send('Wrong password!');
            }
        }
        catch(exception){
            res.status(500).send('An unexpected error occurred!');
            console.log(exception);
        }
    }

    logout(req, res){
        
    }
}