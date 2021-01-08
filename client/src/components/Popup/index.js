import React, { useState, useEffect } from "react";
import SocialBtn from "../SocialBtn";
import {
  PopupWrapper,
  PopupBannerText,
  PopupBannerWrapper,
  PopupContent,
  PopupTitle,
  IconWrapper,
  SelectWrapper
} from "./styles";
import { AiFillFacebook, AiFillGoogleCircle, AiOutlineClose } from "react-icons/ai";
import { BiGame } from "react-icons/bi";

import { IconContext } from "react-icons";
import Overlay from "../Overlay";
import { useSocket } from "../../context/SocketProvider";
import { TokenService } from "../../services/storage.service";
import { useHistory } from "react-router-dom";

export default function Popup({ isOpenPopup, setIsOpenPopup, login }) {
  const value = useSocket();
  const { socket, gameState } = value;
  const history = useHistory();
  useEffect(() => {
    if (gameState._id !== "") history.push(`/room/${gameState._id}`);
  }, [gameState._id]);

  const [maxPlayer, setMaxPlayer] = useState(4);
  const [maxWolf, setMaxWolf] = useState(1);
  const [name, setName] = useState("");
  const onPlayerChange = e => setMaxPlayer(e.target.value);
  const onNameChange = e => setName(e.target.value);
  const onWolfChange = e => setMaxWolf(e.target.value);

  const nickName = TokenService.getToken("ldname");

  const onCreateGame = e => {
    e.preventDefault();
    if (!name) {
      return alert("Tên phòng không để trống!");
    }
    TokenService.saveToken(name, "room_name");

    socket.emit("create-game", nickName, maxPlayer, maxWolf, name);
  };

  const closePopup = () => {
    setIsOpenPopup(false);
  };

  return (
    <>
      <Overlay isOpenPopup={isOpenPopup} />
      <PopupWrapper isOpenPopup={isOpenPopup}>
        <PopupBannerWrapper>
          <PopupBannerText>{login ? "Đăng nhập" : "Tạo phòng"}</PopupBannerText>
        </PopupBannerWrapper>

        <IconContext.Provider
          value={{
            color: "#797979",
            size: "32px"
          }}
        >
          <IconWrapper>
            <AiOutlineClose onClick={closePopup} />
          </IconWrapper>
        </IconContext.Provider>

        <PopupTitle>{login ? `Để đăng nhập, chọn một tài khoản bên dưới: ` : `Cài đặt phòng chơi: `}</PopupTitle>
        {login ? null : (
          <SelectWrapper onSubmit={onCreateGame}>
            <div>Tên phòng</div>
            <input onChange={onNameChange} value={name} autoFocus />
            <div>Chọn số người: </div>
            <select value={maxPlayer} onChange={onPlayerChange}>
              <option>4</option>
              <option>8</option>
              <option>10</option>
              <option>12</option>
            </select>
            <div>Chọn số sói: </div>
            <select value={maxWolf} onChange={onWolfChange}>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </select>
          </SelectWrapper>
        )}
        <PopupContent>
          {login ? (
            <>
              <SocialBtn text="Facebook" icon={<AiFillFacebook />} bgColor="#5270ff" color="#fff" size="24px" />
              <SocialBtn text="Google" icon={<AiFillGoogleCircle />} bgColor="#ca1f56" color="#fff" size="24px" />
            </>
          ) : (
            <SocialBtn
              text="Tạo phòng"
              icon={<BiGame />}
              bgColor="#ca1f56"
              color="#fff"
              size="24px"
              onClick={onCreateGame}
              type="text"
            />
          )}
        </PopupContent>
      </PopupWrapper>
    </>
  );
}
