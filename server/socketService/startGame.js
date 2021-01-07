// import models
const Game = require("../models/Game");

const startGameService = async (io, socket, gameID, sockets) => {
  let game = await Game.findById(gameID);

  game.isOpen = false;
  game = await game.save();

  let firstPlayer = game.players[0];
  console.log(firstPlayer);
  sockets[firstPlayer.nickName].emit("demo-abcd");
  io.to(gameID).emit("updateGame", game);
};

module.exports = startGameService;
