// Dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const socketio = require('socket.io');

// import models
const Game = require('./models/Game');

// initialize server
require('dotenv').config();
const port = process.env.PORT;
const app = express();
const server = require('http').Server(app);

const io = socketio(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
}
);

// connect db
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
.then(() => {
    server.listen(port, () => console.log(`App listen at port ${port} and mongoose is connected`));
})
.catch((err) => console.log(err));

io.on('connect', (socket) => {
   // create-game
   socket.on('create-game',async (nickName, maxPlayer, maxWolf, name) => {
    try{
        // get words that our users have to type out
        // const quotableData = await QuotableAPI();

        // create roles

        // create game
        let game = new Game();
        // set words
        // game.words = quotableData;
        // create player
        let player = {
            socketID : socket.id,
            isPartyLeader : true,
            nickName
        }
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
        io.to(gameID).emit('updateGame', game);
        
    }catch(err){
        console.log(err);
    }
    });

    // join-room
    socket.on('join-game',async ({ gameID : _id, nickName})=>{
        try{
            // get game room
            let game = await Game.findById(_id);

            // check if game is allowing users to join
            if(!game) return socket.emit("join-game", {success: false, message: "Room not found, please refresh page"})

            // check if game full slot 
            if(game.maxPlayer === game.players.length) return socket.emit("join-game", {success: false, message: "Room full, please refresh page and find another room" })

            if(game.isOpen){
                // make players socket join the game room
                const gameID = game._id.toString();
                socket.join(gameID);
                // create our player
                let player = {
                    socketID : socket.id,
                    nickName
                }
                // add player to the game
                game.players.push(player);
                // save the game
                game = await game.save();
                socket.emit("join-game", {success: true, message: "Join room success"})
                // send updated game to all sockets within game
                io.to(gameID).emit('updateGame', game);
            }
        }catch(err){
            console.log(err);
        }
    });



    ///left-room
    socket.on('left-game', async (nickName, gameId) => {
        let playerLeftIsLeader = false;
        console.log(`User ${nickName} left room : ${gameId}`);
        let game = await Game.findById(gameId);
        // console.log(game)
        let playerLeft = game.players.find(item => item.nickName === nickName)
        if(playerLeft.isPartyLeader){
            playerLeftIsLeader = true;
        }
        game.players = game.players.filter(item => item.nickName !== nickName)
        if(game.players.length === 0){
            await game.remove()
        }
        else{
            game.players[0].isPartyLeader = true;
            game = await game.save();
            io.to(gameId).emit('updateGame', game);
        }
    })


    // count down

    socket.on('timer', async({gameID,playerID})=>{
        // time in seconds
        let countDown = 5;
        // find game
        let game = await Game.findById(gameID);
        // find player who made request
        let player = game.players.id(playerID);

        // check if player has permission to start game
        if(player.isPartyLeader){
            // start time countdown
            let timerID = setInterval(async()=>{
                // keep counting down until we hit 0
                if(countDown >= 0){
                    // emit countDown to all players within game
                    io.to(gameID).emit('timer',{countDown,msg : "Starting Game"});
                    countDown--;
                }
                // start time clock over, now time to start game
                else{
                    // close game so no one else can join
                    game.isOpen = false;
                    // save the game
                    game = await game.save();
                    // send updated game to all sockets within game
                    io.to(gameID).emit('updateGame',game);
                    // start game clock
                    clearInterval(timerID);
                }
            }, 1000);
        }
    });


})




/// middleware
app.use(cors())
app.use(express.json());
app.use('/api/auth/', require('./routes/authRoutes'))
app.use('/api/room/', require('./routes/roomRoutes'))

// socket 

