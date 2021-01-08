// import models
const Game = require("../models/Game");

const startGameService = async (io, socket, gameID, sockets) => {
  let game = await Game.findById(gameID);

  game.isOpen = false;

  generateRoleForListPlayer(game);
  for (let i = 0; i < game.players.length; i++) {
    const player = game.players[i];
    sockets[player.nickName].emit("updateRole", player);
  }

  console.log(game);
  game = await game.save();
  io.to(gameID).emit("updateGame", game);
};

const generateRoleForListPlayer = game => {
  let { players, maxPlayer, maxWolf } = game;
  let listRole = {
    wolf: "wolf",
    seer: "seer",
    villager: "villager",
    guard: "guard"
  };

  // Find wolf
  for (let i = 0; i < maxWolf; i++) {
    players = generateRoleForSinglePlayer(players, maxPlayer, listRole, listRole.wolf);
  }

  players = generateRoleForSinglePlayer(players, maxPlayer, listRole, listRole.seer);
  players = generateRoleForSinglePlayer(players, maxPlayer, listRole, listRole.guard);

  for (let i = 0; i < maxPlayer - maxWolf - 2; i++) {
    players = generateRoleForSinglePlayer(players, maxPlayer, listRole, listRole.villager);
  }
};

const randomFrom0To1000 = () => {
  let unit1 = Math.random();
  let unit2 = Math.random();
  let unit3 = Math.random();

  return unit1 * 100 + unit2 * 10 + unit3;
};

const generateRoleForSinglePlayer = (players, maxPlayer, listRole, role) => {
  while (true) {
    let indexUser = randomFrom0To1000() % maxPlayer;
    indexUser = Math.floor(indexUser);

    if (!players[indexUser].role) {
      players[indexUser].role = listRole[role];
      break;
    }
  }

  return players;
};

module.exports = startGameService;
