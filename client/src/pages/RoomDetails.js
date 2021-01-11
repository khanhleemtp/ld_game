import React, { useEffect, useState } from "react";
import BackgroundImg from "../components/Background";
import ChatRoom from "../components/ChatRoom";
import DayRoom from "../components/DayRoom";
import { UserRoomDetails } from "../components/UserRoomDetails";

export const RoomDetails = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          position: "relative",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh"
        }}
      >
        <BackgroundImg bgSrc="/byDuong/menu_background.png" bgColor="#0C58FD" bgDesColor="#0A5EFB" />
        <UserRoomDetails />
        <div>
          <DayRoom />
          <ChatRoom />
        </div>
      </div>
    </>
  );
};
