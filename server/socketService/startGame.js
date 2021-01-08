// import models
const Game = require("../models/Game");

const startGameService = async (io, socket, gameID, sockets) => {
  let game = await Game.findById(gameID);

  game.isOpen = false;
  game = await game.save();
  console.log(game);

  for (let i = 0; i < game.players.length; i++) {
    const player = game.players[i];
    console.log(player);
    sockets[player.nickName].emit("demo-abcd");
  }

  io.to(gameID).emit("updateGame", game);
};

module.exports = startGameService;
