import React, { useState, useEffect, useContext } from "react";
import io from "socket.io-client";
import { TokenService } from "../services/storage.service";

const SocketContext = React.createContext();
let isFirstShowInfo = true;

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ children }) {
  const [gameState, setGameState] = useState({
    _id: "",
    isOpen: false,
    players: [],
    maxPlayer: 4,
    maxWolf: 1,
    messages: []
  });
  const [socket, setSocket] = useState();
  const [isStart, setIsStart] = useState(false);
  const [timeRole, setTimeRole] = useState({ role: "", time: 0 });
  const [isHiddenStartButton, setIsHiddenStartButton] = useState(false);
  const [isHiddenVoteButton, setIsHiddenVoteButton] = useState(true);

  const [messageInfo, setMessageInfo] = useState("");
  const [messageWolfInfo, setMessageWolfInfo] = useState("");

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
    // setGameState(prev => {
    //   return { ...prev, _id: "", players: gameState.players.filter(player => player.nickName !== nickName) };
    // });
    TokenService.removeToken("room_name");
    history.push("/rooms");
    window.location.reload();
  };

  const startDayGame = () => {
    // distribution random card
    // socket.emit('timer', {playerID : userInfo._id, gameID: gameState._id });
    setIsHiddenStartButton(true);
    socket.emit("start-game", { gameID: gameState._id });
  };

  const voteHandler = votedUser => {
    setIsHiddenVoteButton(true);
    console.log(`${userInfo.nickName} voted ${votedUser.nickName}`);
    if (userInfo.role == "seer") {
      alert(`Chức năng của ${votedUser.nickName} là ${votedUser.role}`);
    } else socket.emit("vote-user", { gameID: gameState._id, userVoted: userInfo, beVoted: votedUser });
  };

  const sendMessage = (message, userInfo, gameID, wolfMessage) => {
    socket.emit("message", { message, userInfo, gameID, wolfMessage });
    setMessageInfo("");
    setMessageWolfInfo("");
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
      console.log(game);
      setGameState(prev => ({ ...prev, ...game }));
      setIsStart(game.players.length === game.maxPlayer);
      // hàm này chỉ chạy 1 lần trc khi render ra view, khi nhận đc sk updateGame thì nó mới bắt đầu setGameState
      // cái log ra chỉ là state cũ ban đầu khởi tạo
    });

    newSocket.on("updateRole", playerData => {
      console.log("Update Role", playerData);
    });

    newSocket.on("play-with-role", payload => {
      setIsHiddenVoteButton(false);
      console.log("Play session: ", payload);
      setTimeRole(time => ({ ...time, ...payload }));
    });

    newSocket.on("play-die", payload => {
      console.log("Have player die: ", payload);
    });

    newSocket.on("villager-win", payload => {
      alert("Dân làng đã thắng");
    });

    newSocket.on("wolf-win", payload => {
      alert("Sói đã thắng");
    });

    // newSocket.on("send-message", ({ messages, userInfo, gameID }) => {
    //   setMessages(messages);
    // });

    // unmount
    return () => {
      newSocket.close();
    };
  }, []);

  const value = {
    socket,
    gameState,
    setGameState,
    userInfo,
    isStart,
    startDayGame,
    onCreateGame,
    joinRoom,
    leftRoom,
    timeRole,
    voteHandler,
    isHiddenVoteButton,
    isHiddenStartButton,
    sendMessage,
    messageInfo,
    setMessageInfo,
    messageWolfInfo,
    setMessageWolfInfo
  };

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
}
