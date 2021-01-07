// import models
const Game = require("../models/Game");

const joinGameService = async (io, socket, _id, nickName) => {
  console.log("Join game", _id, nickName);
  try {
    // get game room
    let game = await Game.findById(_id);

    // check if game is allowing users to join
    if (!game)
      return socket.emit("join-game", {
        success: false,
        message: "Không tìm thấy phòng này, vui lòng tải lại trang!"
      });

    // check if game full slot
    if (game.maxPlayer === game.players.length)
      return socket.emit("join-game", {
        success: false,
        message: "Phòng đã đầy, vui lòng tải lại trang!"
      });

    if (game.isOpen) {
      // make players socket join the game room
      const gameID = game._id.toString();
      socket.join(gameID);
      // create our player
      let player = {
        socketID: socket.id,
        nickName
      };
      // add player to the game
      game.players.push(player);
      // save the game
      game = await game.save();
      socket.emit("join-game", { success: true, message: "Đã vào phòng" });
      // send updated game to all sockets within game
      io.to(gameID).emit("updateGame", game);
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = joinGameService;
