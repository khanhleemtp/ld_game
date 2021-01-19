// import models
const Game = require("../models/Game");

const chatGameService = async (io, socket, sockets, gameID, userInfo, message) => {
  console.log("gameId", gameID);
  let game = await Game.findById(gameID);
  console.log("game", game);
  for (let i = 0; i < game.players.length; i++) {
    const p = game.players[i];
    sockets[p.nickName].emit("send-message", { gameID, userInfo, message });
  }
};

module.exports = chatGameService;
