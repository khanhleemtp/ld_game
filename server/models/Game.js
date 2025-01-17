const mongoose = require("mongoose");

const PlayerSchema = new mongoose.Schema({
  socketID: { type: String },
  isPartyLeader: { type: Boolean, default: false },
  nickName: { type: String },
  role: { type: String, default: "" },
  isDie: { type: Boolean, default: false },
  beVoted: { type: [String], default: [] }
});

const gameSchema = new mongoose.Schema({
  name: { type: String },
  maxPlayer: { type: Number },
  currentPlayer: { type: Number, default: 0 },
  maxWolf: { type: Number },
  isOpen: { type: Boolean, default: true },
  isOver: { type: Boolean, default: false },
  players: [PlayerSchema],
  startTime: { type: Number },
  messages: {
    type: [
      {
        sender: { type: String },
        message: { type: String }
      }
    ],
    default: []
  },
  messagesWolf: {
    type: [
      {
        sender: { type: String },
        message: { type: String }
      }
    ],
    default: []
  }
});

module.exports = mongoose.model("Game", gameSchema);
