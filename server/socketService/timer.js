// import models
const Game = require("../models/Game");

const timerService = async (io, socket, gameID, playerID) => {
  // time in seconds
  let countDown = 5;
  // find game
  let game = await Game.findById(gameID);
  // find player who made request
  let player = game.players.id(playerID);

  // check if player has permission to start game
  if (player.isPartyLeader) {
    // start time countdown
    let timerID = setInterval(async () => {
      // keep counting down until we hit 0
      if (countDown >= 0) {
        // emit countDown to all players within game
        io.to(gameID).emit("timer", { countDown, msg: "Starting Game" });
        countDown--;
      }
      // start time clock over, now time to start game
      else {
        // close game so no one else can join
        game.isOpen = false;
        // save the game
        game = await game.save();
        // send updated game to all sockets within game
        io.to(gameID).emit("updateGame", game);
        // start game clock
        clearInterval(timerID);
      }
    }, 1000);
  }
};

module.exports = timerService;
