// import models
const Game = require("../models/Game");

const startGameService = async (io, socket, gameID) => {
  let game = await Game.findById(gameID);
  game.isOpen = false;
  game = await game.save();
  let firstPlayer = game.players[0];
  console.log(firstPlayer);
  let firstSocket = socket.id;
  io.to(gameID).emit("updateGame", game);
};

module.exports = startGameService;
