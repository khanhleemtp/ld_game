import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import BackgroundImg from "../components/Background";
import { Button } from "../components/Button";
import Option from "../components/Option";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { CgLogIn } from "react-icons/cg";
import Logo from "../components/Logo";
import InputContainer from "../components/Input";
import Avatar from "../components/Avatar";
import Popup from "../components/Popup";
import styled from "styled-components";
import { Link, Redirect } from "react-router-dom";
import { TokenService } from "../services/storage.service";
import { clearErrors } from "../redux/actions/errorActions";

// layout

const LoginContainer = styled.div`
  position: relative;
`;

const OptionContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-around;
`;

const LoginContentContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const LoginContentWrapper = styled.div`
  margin-top: 12px;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormContainer = styled.form`
  position: relative;
  width: 300px;
  height: 320px;
  margin: 200px 0 0 0;
  @media (min-width: 640px) {
    width: 640px;
  }
`;

const FormWrapper = styled.div`
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 24px 32px;
  border-radius: 8px;
  box-shadow: 0 2.5px 10px 0 rgba(0, 0, 0, 0.3);
`;

const AvatarContainer = styled.div`
  position: absolute;
  top: -100px;
  left: 50%;
  transform: translateX(-50%);
`;

const FormInputWrapper = styled.div`
  width: 100%;
  margin: 16px 0 32px 0;
`;

const BtnContainer = styled.div`
  a {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    text-align: center;
    margin-top: 12px;
    text-decoration: none;
    cursor: pointer;
    font-size: 16px;
    &:hover {
      color: blueviolet;
    }
  }
  @media (min-width: 640px) {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    a {
      margin-top: 0;
      font-size: 20px;
    }
  }
`;

//

export const LogPage = ({ login, loginResource, registerResource, onLogin, onRegister }) => {
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const error = useSelector(state => state.error);
  const dispatch = useDispatch();

  if (TokenService.getToken()) {
    return <Redirect to={"/rooms"} />;
  }

  return (
    <LoginContainer>
      {isOpenPopup ? <Popup login isOpenPopup={isOpenPopup} setIsOpenPopup={setIsOpenPopup} /> : null}
      <BackgroundImg bgSrc="/byDuong/menu_background.png" bgColor="#0C58FD" bgDesColor="#0A5EFB" />
      <LoginContentContainer>
        <LoginContentWrapper>
          <OptionContainer>
            <Option text="Hướng dẫn" color="#fff" size="32px" icon={<AiOutlineInfoCircle />} />
            <Logo alt="logo" src="/byDuong/logo_3.png" />
            <Option
              text="Đăng nhập"
              color="#fff"
              size="32px"
              icon={<CgLogIn />}
              onClick={() => {
                setIsOpenPopup(true);
              }}
            />
          </OptionContainer>

          <FormContainer onSubmit={login ? onLogin : onRegister}>
            <AvatarContainer>
              <Avatar src="/byDuong/logo_1.png" />
            </AvatarContainer>
            <FormWrapper>
              <FormInputWrapper>
                {error && error.msg && <div style={{ color: "red" }}>{error.msg}</div>}
                {login ? (
                  <>
                    <InputContainer
                      label="Tài khoản:"
                      placeholder="Vui lòng nhập tài khoản"
                      setResource={loginResource.setUsername}
                    />
                    <InputContainer
                      label="Mật khẩu:"
                      placeholder="Vui lòng nhập mật khẩu"
                      setResource={loginResource.setPassword}
                    />
                  </>
                ) : (
                  <>
                    <InputContainer label="Tên nhân vật:" placeholder="" setResource={registerResource.setName} />
                    <InputContainer label="Tài khoản:" placeholder="" setResource={registerResource.setUsername} />
                    <InputContainer label="Mật khẩu:" placeholder="" setResource={registerResource.setPassword} />
                  </>
                )}
              </FormInputWrapper>

              <BtnContainer>
                {login ? (
                  <>
                    <Button
                      bgColor="#ffbf00"
                      text="Chơi!"
                      iconSrc="/imgButton/play.svg"
                      textColor="#001b4d"
                      alt="btn"
                    />
                    <Link to="register" onClick={() => dispatch(clearErrors())}>
                      Bạn chưa có tài khoản ?
                    </Link>
                  </>
                ) : (
                  <>
                    <Button
                      bgColor="#13bafe"
                      text="Đăng kí"
                      iconSrc="/imgButton/room.svg"
                      textColor="#001b4d"
                      alt="btn"
                    />
                    <Link to="/" onClick={() => dispatch(clearErrors())}>
                      Bạn đã có tài khoản ?
                    </Link>
                  </>
                )}
              </BtnContainer>
            </FormWrapper>
          </FormContainer>
        </LoginContentWrapper>
      </LoginContentContainer>
    </LoginContainer>
  );
};
