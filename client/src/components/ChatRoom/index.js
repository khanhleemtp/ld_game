import React, { useState, useCallback } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { MdKeyboardVoice } from "react-icons/md";
import { useSocket } from "../../context/SocketProvider";
import SocialBtn from "../SocialBtn";
import {
  ChatRoomContainer,
  ChatRoomIconContainer,
  ChatRoomRoles,
  ChatRoomInput,
  ChatRoomInputWrapper,
  ChatRoomText,
  ChatRoomFooter,
  ChatRoomTextWrapper,
  ChatRoomSender,
  ChatElement
} from "./styles";

const ChatRoom = () => {
  const value = useSocket();

  const { sendMessage, gameState, userInfo, messageInfo, setMessageInfo, messageWolfInfo, setMessageWolfInfo } = value;
  const [wolfMessage, setWolfMessage] = useState(false);
  const setRef = useCallback(node => {
    if (node) {
      node.scrollIntoView({ smooth: true });
    }
  }, []);
  return (
    <>
      <ChatRoomContainer>
        <div style={{ display: "flex", alignItems: "center", padding: "4px 0" }}>
          <ChatRoomRoles onClick={() => setWolfMessage(false)}>Villager</ChatRoomRoles>
          {value?.userInfo?.role && value.userInfo.role == "wolf" ? (
            <ChatRoomRoles wolf={true} onClick={() => setWolfMessage(true)}>
              Wolf
            </ChatRoomRoles>
          ) : null}
        </div>
        <ChatRoomInputWrapper>
          {!wolfMessage ? (
            <ChatRoomTextWrapper>
              villager
              {gameState?.messages &&
                gameState.messages.map((chat, index) => {
                  const lastMessage = gameState.messages.length - 1;
                  return (
                    <ChatElement key={index} ref={lastMessage ? setRef : null}>
                      <ChatRoomSender isSender={userInfo.nickName === chat.sender}>{chat.sender}:</ChatRoomSender>
                      <ChatRoomText>{chat.message}</ChatRoomText>
                    </ChatElement>
                  );
                })}
            </ChatRoomTextWrapper>
          ) : value?.userInfo?.role && value.userInfo.role == "wolf" ? (
            <ChatRoomTextWrapper>
              wolf
              {gameState?.messagesWolf &&
                gameState.messagesWolf.map((chat, index) => {
                  const lastMessage = gameState.messagesWolf.length - 1;
                  return (
                    <ChatElement key={index} ref={lastMessage ? setRef : null}>
                      <ChatRoomSender isSender={userInfo.nickName === chat.sender}>{chat.sender}:</ChatRoomSender>
                      <ChatRoomText>{chat.message}</ChatRoomText>
                    </ChatElement>
                  );
                })}
            </ChatRoomTextWrapper>
          ) : null}
          <ChatRoomFooter>
            {!wolfMessage ? (
              <ChatRoomInput value={messageInfo} onChange={e => setMessageInfo(e.target.value)} />
            ) : (
              <ChatRoomInput value={messageWolfInfo} onChange={e => setMessageWolfInfo(e.target.value)} />
            )}
            <ChatRoomIconContainer>
              <SocialBtn
                icon={<AiOutlineSend />}
                bgColor="#ca1f56"
                color="#fff"
                size="24px"
                width="32px"
                height="32px"
                margin="0 12px"
                onClick={() => {
                  sendMessage(messageInfo, userInfo, gameState._id, messageWolfInfo);
                  console.log(`send-message from ${userInfo.nickName} with message ${messageInfo} in ${gameState._id}`);
                }}
              />
              <SocialBtn
                icon={<MdKeyboardVoice />}
                bgColor="#ca1f56"
                color="#fff"
                size="24px"
                width="32px"
                height="32px"
                margin="0 12px"
              />
            </ChatRoomIconContainer>
          </ChatRoomFooter>
        </ChatRoomInputWrapper>
      </ChatRoomContainer>
    </>
  );
};

export default ChatRoom;
