const config = require('../config');
const User = require('../models/user.js')

module.exports = class UsersController {
    signUp(req, res){
        try{
            const email = req.body.email.toLowerCase();
            const firstName = req.body.firstName;
            const lastName = req.body.lastName;
            const password = req.body.password;

            if(!email)
            {
                res.send('Email cannot be empty!');
                return;
            }

            if(!firstName)
            {
                res.send('FirstName cannot be empty!');
                return;
            }

            if(!lastName)
            {
                res.send('LastName cannot be empty!');
                return;
            }

            if(!password)
            {
                res.send('Password cannot be empty!');
                return;
            }
            
            if(!User.exists(email))
            {
                User.add(email, firstName, lastName, password);
                res.status(201).send('Successfully signed up!');
            }
            else
                res.status(409).send(`There is already an user with the email ${email}`)
        }
        catch(err){
            res.status(500).send('An unexpected error occurred!');
            console.log(err);
        }
    }
}