import React, { useEffect, useState } from "react";
import SocialBtn from "../SocialBtn";
import {
  DayRoomContainer,
  DayRoomTitle,
  DayRoomContent,
  DayRoomFooter,
  DayRoomRoleAmount,
  DayRoomRoleImmg,
  DayRoomRoles,
  DayRoomTimmer,
  DayRoomTurnImg,
  DayRoomDay,
  DayRoomRoleWrapper
} from "./styles";
import { useHistory } from "react-router-dom";
import { AiOutlineClose, AiOutlineClockCircle } from "react-icons/ai";
import { Button } from "../Button";
import { TokenService } from "../../services/storage.service";
import { useSocket } from "../../context/SocketProvider";
import Role from "../Role";
import CountDown from "../CountDown";

const listSourceImage = {
  seer: {
    src: "/logo_card/magic.png"
  },
  wolf: {
    src: "/logo_card/wolf_normal.png"
  },
  villager: {
    src: "/logo_card/Villager.png"
  },
  guard: {
    src: "/logo_card/Bodyguard.png"
  }
};

const DayRoom = () => {
  const {
    socket,
    gameState,
    setGameState,
    userInfo,
    isStart,
    startDayGame,
    leftRoom,
    timeRole,
    isHiddenStartButton
  } = useSocket();
  const { players, maxPlayer, maxWolf } = gameState;
  const history = useHistory();
  const nickName = TokenService.getToken("ldname");
  // const leftRoom = () => {
  //   socket.emit("left-game", nickName, gameState._id);
  //   setGameState(prev => {
  //     return { ...prev, _id: "", players: players.filter(player => player.nickName !== nickName) };
  //   });

  //   TokenService.removeToken("room_name");

  //   history.push("/");
  // };
  return (
    <DayRoomContainer>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ color: "#4e14ff" }}>
          <span style={{ textTransform: "uppercase", fontWeight: "800", marginRight: "8px", color: "#000" }}>
            Tên phòng:
          </span>
          {TokenService.getToken("room_name")}
        </div>
        <SocialBtn
          icon={<AiOutlineClose />}
          bgColor="#ca1f56"
          color="#fff"
          size="24px"
          width="32px"
          height="32px"
          onClick={() => leftRoom(history)}
        />
      </div>
      <DayRoomTitle>
        <DayRoomRoles>
          <DayRoomRoleWrapper title="Bảo vệ">
            <DayRoomRoleImmg src="/logo_card/Bodyguard.png" alt="roles" />
            <DayRoomRoleAmount>X1</DayRoomRoleAmount>
          </DayRoomRoleWrapper>

          <DayRoomRoleWrapper>
            <DayRoomRoleImmg title="Dân làng" src="/logo_card/Villager.png" alt="roles" />
            <DayRoomRoleAmount>X{maxPlayer - 1 - maxWolf - 1}</DayRoomRoleAmount>
          </DayRoomRoleWrapper>

          <DayRoomRoleWrapper>
            <DayRoomRoleImmg title="Sói" src="/logo_card/wolf_normal.png" alt="roles" />
            <DayRoomRoleAmount>X{maxWolf}</DayRoomRoleAmount>
          </DayRoomRoleWrapper>

          <DayRoomRoleWrapper>
            <DayRoomRoleImmg title="Tiên tri" src="/logo_card/magic.png" alt="roles" />
            <DayRoomRoleAmount>X1</DayRoomRoleAmount>
          </DayRoomRoleWrapper>
        </DayRoomRoles>
        <DayRoomDay>{timeRole?.role ? `Lượt của ${timeRole.role}` : "Cả nhà cùng vui"}</DayRoomDay>
      </DayRoomTitle>

      <DayRoomContent>
        {timeRole?.role ? (
          <DayRoomTurnImg src={listSourceImage[timeRole.role].src} alt="bg" />
        ) : (
          <DayRoomTurnImg src="/logo_card/witch.png" alt="bg" />
        )}
      </DayRoomContent>

      <DayRoomFooter>
        <Role userInfo={userInfo} />

        <DayRoomTimmer>
          <SocialBtn
            icon={<AiOutlineClockCircle />}
            bgColor="#ca1f56"
            color="#fff"
            size="24px"
            width="24px"
            height="24px"
            margin="0 12px"
          />
          <CountDown />
        </DayRoomTimmer>

        <div>
          {userInfo && userInfo.isPartyLeader && !isHiddenStartButton ? (
            <Button
              bgColor={isStart ? "#13bafe" : "#ddd"}
              text="Start"
              textColor="#001b4d"
              alt="btn"
              disabled={!isStart}
              onClick={startDayGame}
            />
          ) : null}
        </div>
      </DayRoomFooter>
    </DayRoomContainer>
  );
};

export default DayRoom;
