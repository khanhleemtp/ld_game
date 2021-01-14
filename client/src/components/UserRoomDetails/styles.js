import styled from "styled-components";

export const UserDetail = styled.div`
  transform: translate3d(0px, 0px, 0px);
  background: ${({ user }) => (user ? "#fdc6f4" : "")};
  height: 70px;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  top: 0;
  left: 0;
  width: 100%;
  border-bottom: 1px solid #797979;
`;

export const UserContainer = styled.div`
  user-select: none;
  border-radius: 10px;
  margin: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 320px;
  border-radius: 8px;
  background: ${props => (props.user ? "#efe" : "#ddd")};
  margin-right: 16px;
  &:hover {
    UserDetail {
      background: red;
    }
  }
`;

export const UserWrapper = styled.div`
  height: 520px;
  width: 100%;
  overflow-y: auto;
  margin: 12px;
`;

export const UserAvatarWrapper = styled.div`
  width: 45px;
  height: 45px;
  border-width: 1px;
  margin: 0 10px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 50%;
  border: 2px #fff solid;
  box-shadow: 0 0 0 4px #043173;
  position: relative;
`;

export const UserAvatarContent = styled.div`
  width: 45px;
  height: 57px;
  background-image: url("/avatar/6.svg");
  position: absolute;
  bottom: 0;
  background-position: bottom center;
  background-repeat: no-repeat;
  background-size: 100%;
  left: 50%;
  transform: translateX(-50%);
`;

export const UserInfoWrapper = styled.div`
  max-width: 125px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const UserInfoName = styled.div`
  font-size: 17px;
  color: #797979;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 1.2;
  font-weight: 800;
`;

export const UserInfoVote = styled.div`
  font-size: 14px;
  color: #d10087;
  font-weight: 600;
`;
