const User = require('../models/user.js');
const generateAccessToken = require('../utils/generateAccessToken');
const hash = require('../utils/hash');


const signUp = async (req, res) => {
    try {
        const email = req.body.email.toLowerCase().trim();
        const firstName = req.body.firstName.trim();
        const lastName = req.body.lastName.trim();
        const password = req.body.password.trim();

        let user = await User.findOne({ email })
        if (user) {
            res.status(409).json({ status: 'fail', data: { message: `There is already an user with the email ${email}` } })

        }
        else {
            user = new User({ firstName, lastName, email, password: hash(password) });
            await user.save();
            const token = generateAccessToken(email);
            res.status(201).json({ status: 'success', data: { message: 'Successfully signed up!', token } });
        }
    }
    catch (err) {
        res.status(500).json({ status: 'error', data: { message: 'An unexpected error occurred!' } });
        console.log(err.message);
    }
}


module.exports = signUp;