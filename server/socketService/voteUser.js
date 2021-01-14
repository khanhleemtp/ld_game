const Game = require("../models/Game");

const voteUserService = async (io, socket, sockets, gameID, userVoted, beVoted) => {
  let game = await Game.findById(gameID);
  let playerVoted = game.players.find(player => player.nickName == userVoted.nickName);
  let bePlayerVoted = game.players.find(player => player.nickName == beVoted.nickName);
  bePlayerVoted.beVoted.push(playerVoted.role);

  game = await game.save();
  io.to(gameID).emit("updateGame", game);
};

module.exports = voteUserService;
