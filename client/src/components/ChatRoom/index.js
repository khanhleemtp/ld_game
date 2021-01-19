import React, { useState } from "react";
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
  ChatRoomTextWrapper
} from "./styles";

const ChatRoom = () => {
  const value = useSocket();
  const [messageInfo, setMessageInfo] = useState("");
  const { sendMessage, message, gameState, userInfo } = value;
  console.log("value userInfo:", userInfo);
  return (
    <>
      <ChatRoomContainer>
        <div style={{ display: "flex", alignItems: "center", padding: "4px 0" }}>
          <ChatRoomRoles>Villager</ChatRoomRoles>
          {value?.userInfo?.role && value.userInfo.role == "wolf" ? (
            <ChatRoomRoles wolf={true}>Wolf</ChatRoomRoles>
          ) : null}
        </div>
        <ChatRoomInputWrapper>
          <ChatRoomTextWrapper>
            <ChatRoomText>{message}</ChatRoomText>
          </ChatRoomTextWrapper>
          <ChatRoomFooter>
            <ChatRoomInput value={messageInfo} onChange={e => setMessageInfo(e.target.value)} />
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
                  sendMessage(messageInfo, userInfo, gameState._id);
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
