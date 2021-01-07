const { User } = require('../models/User');
const jwt = require('jsonwebtoken');

const handleError = (err) => {
    // duplicate error code
    if(err.code === 11000) {
        return 'That username or name is already registered';
    }
    // validation errors
    console.log('err', err.message)
    if (err.message) {
        return err.message;
    }
} 

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT, { expiresIn: 3 * 24 * 60 * 60 })
}

module.exports.signup_post = async (req, res) => {
    const { name, password, username } = req.body;
    try {
        const user = await User.create({ name, password, username });
        const token = createToken(user._id);
        res.status(201).json({ user, token })
    } catch (err) {
        console.log(err.code)
        const errors = handleError(err);
        res.status(400).json(errors);
    }
}

module.exports.signin_post = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.login(username, password);
        const token = createToken(user._id);
        console.log('Login success');
        res.status(201).json({ user, token })
    } catch (err) {
        console.log(err)
        const errors = handleError(err);
        res.status(400).json(errors);
    }
}

module.exports.get_user = (req, res) => {
    User.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user))
}