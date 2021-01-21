// import models
const Game = require("../models/Game");

const chatGameService = async (io, socket, sockets, gameID, userInfo, message, wolfMessage) => {
  console.log("message", message);
  let game = await Game.findById(gameID);

  // create our player
  // add player to the game
  if (message) {
    game.messages.push({ sender: userInfo.nickName, message });
  }
  if (wolfMessage) {
    game.messagesWolf.push({ sender: userInfo.nickName, message: wolfMessage });
  }
  // save the game
  game = await game.save();
  console.log("game_state", game);
  // send updated game to all sockets within game
  io.to(gameID).emit("updateGame", game);

  // console.log("Messages", messages);
  // for (let i = 0; i < game.players.length; i++) {
  //   const p = game.players[i];
  //   sockets[p.nickName].emit("send-message", { gameID, userInfo, messages });
  // }
};

module.exports = chatGameService;
