const mongoose = require('mongoose');


const PlayerSchema = new mongoose.Schema({
    socketID : {type : String},
    isPartyLeader : {type : Boolean,default : false},
    nickName : {type : String},
    role: {type: String}
});

const gameSchema = new mongoose.Schema({
    name: {type: String},
    maxPlayer : {type : Number},
    currentPlayer: { type: Number, default: 0},
    maxWolf: { type: Number },
    isOpen : {type : Boolean, default : true },
    isOver : {type : Boolean, default : false },
    players : [PlayerSchema],
    startTime : { type : Number }
});

module.exports = mongoose.model('Game', gameSchema);

