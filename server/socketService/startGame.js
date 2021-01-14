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
    if (listRole[index] == "villager") {
      game = await actionBeforeVillagerTurn(sockets, game);
      if (checkConditionEndGame(sockets, game)) break;
    }
    if (listRole[index] == "wolf") {
      game = await actionBeforeWolfTurn(sockets, game);
      if (checkConditionEndGame(sockets, game)) break;
    }
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

  console.log("ENDGAME: -------------------------------------------");
  console.log(game);
};

const waittingByPromise = timeout => {
  // timeout = second
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(), timeout * 1000);
  });
};

const actionBeforeVillagerTurn = async (sockets, game) => {
  game = await Game.findById(game._id);
  let clonePlayers = game.players.map(player => {
    return {
      nickName: player.nickName,
      beVoted: player.beVoted
    };
  });
  console.log(clonePlayers);

  clonePlayers.forEach(player => {
    let isGuardVoted = false;
    let isWolfVoted = false;
    if (player.beVoted.includes("wolf")) isWolfVoted = true;
    if (player.beVoted.includes("guard")) isGuardVoted = true;

    if (isWolfVoted && !isGuardVoted) {
      let findPlayerIngame = game.players.find(item => item.nickName == player.nickName);
      findPlayerIngame.isDie = true;
    }
  });

  game.players.forEach(player => {
    player.beVoted = [];
  });

  game = await game.save();
  for (let i = 0; i < game.players.length; i++) {
    const p = game.players[i];
    sockets[p.nickName].emit("updateGame", game);
  }
  await waittingByPromise(2);
  return game;
};

const actionBeforeWolfTurn = async (sockets, game) => {
  game = await Game.findById(game._id);

  let playerMaxVote = null;
  game.players.forEach(player => {
    if (!playerMaxVote) playerMaxVote = player;

    if (playerMaxVote.beVoted.length < player.beVoted.length) {
      playerMaxVote = player;
    }
  });

  if (playerMaxVote && playerMaxVote.beVoted.length) {
    let findPlayerIngame = game.players.find(item => item.nickName == playerMaxVote.nickName);
    findPlayerIngame.isDie = true;
  }

  game.players.forEach(player => {
    player.beVoted = [];
  });

  game = await game.save();
  for (let i = 0; i < game.players.length; i++) {
    const p = game.players[i];
    sockets[p.nickName].emit("updateGame", game);
  }
  await waittingByPromise(2);
  return game;
};

const checkConditionEndGame = (sockets, game) => {
  let totalWolf = 0;
  let totalVillager = 0;
  // wolf = 0 => nguoi thang
  // nguoi = soi => soi thang

  game.players.forEach(player => {
    if (player.role == "wolf" && !player.isDie) totalWolf++;
    if (player.role != "wolf" && !player.isDie) totalVillager++;
  });

  console.log("check: ", game, totalVillager, totalWolf);

  if (totalWolf == 0) {
    for (let i = 0; i < game.players.length; i++) {
      const p = game.players[i];
      sockets[p.nickName].emit("villager-win");
    }
    return true;
  }

  if (totalWolf == totalVillager) {
    for (let i = 0; i < game.players.length; i++) {
      const p = game.players[i];
      sockets[p.nickName].emit("wolf-win");
    }
    return true;
  }

  return false;
};

module.exports = startGameService;
