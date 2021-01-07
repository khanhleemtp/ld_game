// import models
const Game = require("../models/Game");

const createGameService = async (io, socket, nickName, maxPlayer, maxWolf, name) => {
  try {
    // get words that our users have to type out
    // const quotableData = await QuotableAPI();

    // create roles

    // create game
    let game = new Game();
    // set words
    // game.words = quotableData;
    // create player
    let player = {
      socketID: socket.id,
      isPartyLeader: true,
      nickName
    };
    // add player
    game.players.push(player);
    game.maxPlayer = maxPlayer;
    game.maxWolf = maxWolf;
    game.name = name;
    // save the game
    game = await game.save();
    // make players socket join the game room

    const gameID = game._id.toString();
    socket.join(gameID);
    // send updated game to all sockets within game
    io.to(gameID).emit("updateGame", game);
  } catch (err) {
    console.log(err);
  }
};

module.exports = createGameService;
