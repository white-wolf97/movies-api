const config = require('../config');
const User = require('../models/user.js')


const signUp = (req, res) => {
    try {
        const email = req.body.email.toLowerCase().trim();
        const firstName = req.body.firstName.trim();
        const lastName = req.body.lastName.trim();
        const password = req.body.password.trim();

        if (!email) {
            res.status(409).json({ status: 'fail', data: { message: 'Email cannot be empty!' } });
            return;
        }
        if (!/.+\@.+\..+/.test(email)) {
            res.status(409).json({ status: 'fail', data: { message: 'Invalid email!' } });
            return;
        }

        if (!firstName) {
            res.status(409).json({ status: 'fail', data: { message: 'FirstName cannot be empty!' } });
            return;
        }

        if (!lastName) {
            res.status(409).json({ status: 'fail', data: { message: 'LastName cannot be empty!' } });
            return;
        }

        if (!password) {
            res.status(409).json({ status: 'fail', data: { message: 'Password cannot be empty!' } });
            return;
        }

        if (!User.exists(email)) {
            User.add(email, firstName, lastName, password);
            res.status(201).json({ status: 'success', data: { message: 'Successfully signed up!' } });
        }
        else
            res.status(409).json({ status: 'fail', data: { message: `There is already an user with the email ${email}` } })
    }
    catch (err) {
        res.status(500).json({ status: 'error', data: { message: 'An unexpected error occurred!' } });
        console.log(err.message);
    }
}


module.exports = signUp;