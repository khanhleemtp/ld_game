// import models
const Game = require("../models/Game");

const leftGameService = async (io, socket, nickName, gameId) => {
  let playerLeftIsLeader = false;
  console.log(`User ${nickName} left room : ${gameId}`);
  let game = await Game.findById(gameId);
  // console.log(game)
  let playerLeft = game.players.find(item => item.nickName === nickName);
  if (playerLeft.isPartyLeader) {
    playerLeftIsLeader = true;
  }
  game.players = game.players.filter(item => item.nickName !== nickName);
  if (game.players.length === 0) {
    await game.remove();
  } else {
    game.players[0].isPartyLeader = true;
    game = await game.save();
    io.to(gameId).emit("updateGame", game);
  }
};

module.exports = leftGameService;
