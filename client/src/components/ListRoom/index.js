import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  ListRoomContainer,
  RoomTitle,
  RoomContentWrapper,
  RoomContentContainer,
  RoomElementContainer,
  RoomElementAmount,
  RoomElementName,
  RoomTitleWrapper,
  RoomTitleText,
  RoomSearchWrapper,
  RoomSearchInput
} from "./styles";
import { AiOutlineSearch, AiOutlineLogout } from "react-icons/ai";
import Option from "../Option";
import { logout } from "../../redux/actions/authAction";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { TokenService } from "../../services/storage.service";
import { useSocket } from "../../context/SocketProvider";
export const ListRoomElement = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const logoutBtn = () => {
    dispatch(logout());
    history.push("/");
  };
  const room = useSelector(state => state.room);
  const { socket } = useSocket();
  const nickName = TokenService.getToken("ldname");
  const joinRoom = room => {
    console.log("Join to room", room._id);
    TokenService.saveToken(room.name, "room_name");
    socket.emit("join-game", { gameID: room._id, nickName });
    socket.once("join-game", function (data) {
      console.log("On Join game", data);
      if (data.success) history.push(`/room/${room._id}`);
      else alert(data.message);
    });
  };

  return (
    <div style={{ maxWidth: "1280px", margin: "0 auto", width: "100%" }}>
      <RoomTitleWrapper>
        <Option text="Đăng xuất" color="#fff" size="32px" icon={<AiOutlineLogout />} onClick={logoutBtn} />
        <RoomTitleText>Các phòng</RoomTitleText>
        <Option text="Tìm phòng" color="#fff" size="32px" icon={<AiOutlineSearch />} />
      </RoomTitleWrapper>
      <RoomSearchWrapper>
        <RoomSearchInput />
      </RoomSearchWrapper>
      <ListRoomContainer>
        <RoomTitle>Chọn phòng</RoomTitle>
        <RoomContentContainer>
          <RoomContentWrapper>
            {room && room.rooms ? (
              <>
                {room.rooms.map(room => (
                  <RoomElementContainer key={room._id} onClick={() => joinRoom(room)}>
                    <RoomElementName>{room.name}</RoomElementName>
                    <RoomElementAmount>
                      {room.players && room.players.length ? room.players.length : 0}/{room.maxPlayer}
                    </RoomElementAmount>
                  </RoomElementContainer>
                ))}
              </>
            ) : (
              <div>Loading...</div>
            )}
          </RoomContentWrapper>
        </RoomContentContainer>
      </ListRoomContainer>
    </div>
  );
};
