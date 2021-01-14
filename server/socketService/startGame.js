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

  game = await game.save();
  io.to(gameID).emit("updateGame", game);

  startGameForRoom(sockets, game);
};

const generateRoleForListPlayer = game => {
  let { players, maxPlayer, maxWolf } = game;
  let listRole = {
    wolf: "wolf",
    seer: "seer",
    guard: "guard",
    villager: "villager"
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

// Start game for Room

const startGameForRoom = async (sockets, game) => {
  let listTimerByRole = {
    wolf: {
      time: 5 // 5s
    },
    seer: {
      time: 5
    },
    guard: {
      time: 5
    },
    villager: {
      time: 10
    }
  };

  let index = 0;
  let listRole = Object.keys(listTimerByRole);

  while (true) {
    let timeObject = listTimerByRole[listRole[index]];
    console.log("Send to ", listRole[index], timeObject);
    for (let i = 0; i < game.players.length; i++) {
      const player = game.players[i];
      let payload = {
        role: listRole[index],
        time: timeObject.time
      };
      sockets[player.nickName].emit("play-with-role", payload);
    }

    await waittingByPromise(timeObject.time);
    index++;
    index = index % listRole.length;
  }
};

const waittingByPromise = timeout => {
  // timeout = second
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(), timeout * 1000);
  });
};

module.exports = startGameService;
