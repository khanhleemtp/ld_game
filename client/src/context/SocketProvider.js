import React, { useState, useEffect, useContext } from "react";
import io from "socket.io-client";
import { TokenService } from "../services/storage.service";

const SocketContext = React.createContext();
let isFirstShowInfo = true;

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ children }) {
  const [gameState, setGameState] = useState({ _id: "", isOpen: false, players: [], maxPlayer: 4, maxWolf: 1 });
  const [socket, setSocket] = useState();
  const [isStart, setIsStart] = useState(false);

  const nickName = TokenService.getToken("ldname");
  const userInfo = gameState && gameState.players.filter(player => player.nickName === nickName)[0];

  const onCreateGame = (name, maxPlayer, maxWolf, nickName = TokenService.getToken("ldname")) => {
    if (!name) {
      return alert("Tên phòng không để trống!");
    }
    TokenService.saveToken(name, "room_name");
    socket.emit("create-game", nickName, maxPlayer, maxWolf, name);
  };

  const joinRoom = (room, history) => {
    TokenService.saveToken(room.name, "room_name");
    socket.emit("join-game", { gameID: room._id, nickName });
    socket.once("join-game", data => {
      if (data.success) history.push(`/room/${room._id}`);
      else alert(data.message);
    });
  };

  const leftRoom = history => {
    socket.emit("left-game", nickName, gameState._id);
    console.log("state change");
    setGameState(prev => {
      return { ...prev, _id: "", players: gameState.players.filter(player => player.nickName !== nickName) };
    });
    TokenService.removeToken("room_name");
    history.push("/");
  };

  const startDayGame = () => {
    // distribution random card
    // socket.emit('timer', {playerID : userInfo._id, gameID: gameState._id });
    socket.emit("start-game", { gameID: gameState._id });
  };

  if (isFirstShowInfo && userInfo && gameState) {
    isFirstShowInfo = false;
    console.log("UserInfo: ", userInfo);
    console.log("GameState: ", gameState);
  }

  useEffect(() => {
    // effect
    const newSocket = io("http://localhost:4000", {
      query: {
        id: nickName
      }
    });

    setSocket(newSocket);

    newSocket.on("updateGame", game => {
      setGameState(prev => ({ ...prev, ...game }));
      setIsStart(game.players.length === game.maxPlayer);
      // hàm này chỉ chạy 1 lần trc khi render ra view, khi nhận đc sk updateGame thì nó mới bắt đầu setGameState
      // cái log ra chỉ là state cũ ban đầu khởi tạo
    });

    newSocket.on("updateRole", playerData => {
      console.log("Update Role", playerData);
    });

    // unmount
    return () => {
      newSocket.close();
    };
  }, []);

  const value = { socket, gameState, setGameState, userInfo, isStart, startDayGame, onCreateGame, joinRoom, leftRoom };

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
}
