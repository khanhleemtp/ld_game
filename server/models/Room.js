const mongoose = require('mongoose');



const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter room name \n'],
        unique: true,
    },
    maxPerson: {
        type: Number,
        default: 8,
        min: 8
    },
    currentPerson: {
        type: Number,
        default: 0,
    },
    maxWolf: {
        type: Number,
    },
    persons: {
        type: Array,
        default: [],
    }
})



const Room = mongoose.model('rooms', roomSchema);

module.exports = Room;