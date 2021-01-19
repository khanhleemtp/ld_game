// Dependencies
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const socketio = require("socket.io");

// import models
const Game = require("./models/Game");
const createGameService = require("./socketService/createGame");
const joinGameService = require("./socketService/joinGame");
const leftGameService = require("./socketService/leftGame");
const timerService = require("./socketService/timer");
const startGameService = require("./socketService/startGame");
const voteUserService = require("./socketService/voteUser");
const chatGameService = require("./socketService/chatGame");

// initialize server
require("dotenv").config();
const port = process.env.PORT;
const app = express();
const server = require("http").Server(app);

const io = socketio(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});
const sockets = {};

// connect db
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => {
    server.listen(port, () => console.log(`App listen at port ${port} and mongoose is connected`));
  })
  .catch(err => console.log(err));

io.on("connect", socket => {
  console.log("Connected socket id: ", socket.id);
  let userID = socket.handshake.query.id;
  sockets[userID] = socket;

  let listNickName = Object.keys(sockets);
  let listSocketId = listNickName.map(nickName => {
    return { socketID: sockets[nickName].id, nickName: nickName };
  });
  console.log(listSocketId);

  // create-game
  socket.on("create-game", (nickName, maxPlayer, maxWolf, name) => {
    createGameService(io, socket, nickName, maxPlayer, maxWolf, name);
  });

  // join-room
  socket.on("join-game", async ({ gameID: _id, nickName }) => {
    joinGameService(io, socket, _id, nickName);
  });

  ///left-room
  socket.on("left-game", async (nickName, gameId) => {
    leftGameService(io, socket, nickName, gameId);
  });

  // count down

  socket.on("timer", async ({ gameID, playerID }) => {
    timerService(io, socket, gameID, playerID);
  });

  socket.on("start-game", async ({ gameID }) => {
    startGameService(io, socket, gameID, sockets);
  });

  socket.on("vote-user", async ({ gameID, userVoted, beVoted }) => {
    voteUserService(io, socket, sockets, gameID, userVoted, beVoted);
  });

  socket.on("message", async ({ message, userInfo, gameID }) => {
    chatGameService(io, socket, sockets, gameID, userInfo, message);
  });
});

/// middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth/", require("./routes/authRoutes"));
app.use("/api/room/", require("./routes/roomRoutes"));

// socket
