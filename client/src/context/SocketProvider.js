import React, { useState, useEffect, useContext } from "react";
import io from "socket.io-client";
import { TokenService } from "../services/storage.service";

const SocketContext = React.createContext();

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ children }) {
  const [gameState, setGameState] = useState({ _id: "", isOpen: false, players: [], maxPlayer: 4, maxWolf: 1 });
  const [socket, setSocket] = useState();
  const [isStart, setIsStart] = useState(false);

  const nickName = TokenService.getToken("ldname");
  const userInfo = gameState && gameState.players.filter(player => player.nickName === nickName)[0];
  console.log("userInfo", userInfo, "\n", "gameState: ", gameState);

  const startDayGame = () => {
    console.log("start day game");
    // distribution random card
    // socket.emit('timer', {playerID : userInfo._id, gameID: gameState._id });
    socket.emit("start-game", { gameID: gameState._id });
  };

  useEffect(() => {
    // effect
    const newSocket = io("http://localhost:4000", {
      query: {
        id: nickName
      }
    });

    setSocket(newSocket);

    newSocket.on("updateGame", game => {
      // console.log("Game: ", game);
      setGameState(prev => ({ ...prev, ...game }));
      setIsStart(game.players.length === game.maxPlayer);
      // hàm này chỉ chạy 1 lần trc khi render ra view, khi nhận đc sk updateGame thì nó mới bắt đầu setGameState
      // cái log ra chỉ là state cũ ban đầu khởi tạo
    });

    newSocket.on("updateRole", playerData => {
      console.log("Ahihi do ngoc", playerData, userInfo, gameState);
    });

    // unmount
    return () => {
      newSocket.close();
    };
  }, []);

  const value = { socket, gameState, setGameState, userInfo, isStart, startDayGame };

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
}
