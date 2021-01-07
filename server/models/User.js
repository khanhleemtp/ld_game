const mongoose = require('mongoose');
const bycrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter ingame \n'],
        unique: true,
    },
    username: {
        unique: true,
        type: String,
        required: [true, 'Please enter a first name \n'],
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, 'Please enter a password \n'],
        minlength: [6, 'Minium password length is 6 character']
    },
})

// fire a function before doc saved to db
userSchema.pre('save', async function(next) {
    console.log('User about to be created and saved in db');
    const salt = await bycrypt.genSalt();
    this.password = await bycrypt.hash(this.password, salt);
    next();
})

// static method to login user
userSchema.statics.login = async function(username, password) {
    const user = await this.findOne({ username });
    if(user) {
        const auth = await bycrypt.compare(password, user.password);
        if(auth) {
            return user;
        }
        throw Error('Incorrect password');
    }
    throw Error('Incorrect username');
};



const User = mongoose.model('users', userSchema);

module.exports = { User };