import React, { useState, useEffect, useContext } from "react";
import io from "socket.io-client";
import { TokenService } from "../services/storage.service";

const SocketContext = React.createContext();

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ children }) {
  const [gameState, setGameState] = useState({ _id: "", isOpen: false, players: [], maxPlayer: 8, maxWolf: 2 });
  const nickName = TokenService.getToken("ldname");

  const userInfo = gameState && gameState.players.filter(player => player.nickName === nickName)[0];
  // console.log("userInfo: ", userInfo);
  const [socket, setSocket] = useState();
  const [isStart, setIsStart] = useState(false);

  const startDayGame = () => {
    console.log("start day game");
    // distribution random card
    // socket.emit('timer', {playerID : userInfo._id, gameID: gameState._id });
    socket.emit("start-game", { gameID: gameState._id });
  };

  useEffect(() => {
    const newSocket = io("http://localhost:4000", {
      query: {
        id: nickName
      }
    });

    setSocket(newSocket);

    newSocket.on("updateGame", game => {
      console.log("Update game state");
      setGameState(game);
      // setIsStart(game.players.length === game.maxPlayer)
      setIsStart(game.players.length === 2);
    });

    newSocket.on("demo-abcd", () => {
      console.log("Ahihi do ngoc");
    });

    return () => {
      newSocket.close();
    };
  }, []);

  const value = { socket, gameState, setGameState, userInfo, isStart, startDayGame };

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
}
