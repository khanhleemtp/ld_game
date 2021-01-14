import React from "react";
import { useSocket } from "../../context/SocketProvider";
import {
  UserContainer,
  UserWrapper,
  UserDetail,
  UserAvatarWrapper,
  UserAvatarContent,
  UserInfoWrapper,
  UserInfoName,
  UserInfoVote
} from "./styles";
import { AiFillDingtalkCircle } from "react-icons/ai";

export const UserRoomDetails = () => {
  const { gameState, userInfo, timeRole, voteHandler, isHiddenVoteButton } = useSocket();
  const { players } = gameState;

  return (
    <div>
      <UserContainer>
        <UserWrapper>
          {players &&
            players.map(player => (
              <UserDetail key={player._id} user={userInfo && userInfo._id === player._id}>
                <UserAvatarWrapper>
                  <UserAvatarContent isDie={player.isDie}></UserAvatarContent>
                </UserAvatarWrapper>
                <UserInfoWrapper>
                  <UserInfoName>
                    {player.nickName}
                    {player.isPartyLeader ? <AiFillDingtalkCircle /> : ""}
                  </UserInfoName>
                  {(timeRole?.role === userInfo?.role || timeRole?.role == "villager") &&
                  !isHiddenVoteButton &&
                  !userInfo?.isDie &&
                  !player.isDie ? (
                    <button onClick={() => voteHandler(player)}>Vote</button>
                  ) : null}
                  <UserInfoVote>10 votes</UserInfoVote>
                </UserInfoWrapper>
              </UserDetail>
            ))}
        </UserWrapper>
      </UserContainer>
    </div>
  );
};
