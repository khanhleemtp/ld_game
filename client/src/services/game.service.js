const nickName = TokenService.getToken("ldname");
const GameService = {
    onCreateGame = (socket, name,maxPlayer, maxWolf, nickName = nickName ) => {
        if (!name) {
          return alert("Tên phòng không để trống!");
        }
        TokenService.saveToken(name, "room_name");
        socket.emit("create-game", nickName, maxPlayer, maxWolf, name);
      },
    
    joinRoom = (socket, room, history) => {
    TokenService.saveToken(room.name, "room_name");
    socket.emit("join-game", { gameID: room._id, nickName });
    socket.once("join-game", (data) => {
      if (data.success) history.push(`/room/${room._id}`);
      else alert(data.message);
    })
  },

   leftRoom = (socket, history, nextState) => {
    socket.emit("left-game", nickName, gameState._id);
    // setGameState(prev => {
    //     return { ...prev, _id: "", players: players.filter(player => player.nickName !== nickName) };
    // });
    
    nextState();
    TokenService.removeToken("room_name");

    history.push("/");
  }

}