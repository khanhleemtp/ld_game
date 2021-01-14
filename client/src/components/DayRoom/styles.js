import styled from "styled-components";

export const DayRoomContainer = styled.div`
  height: 520px;
  border-radius: 12px;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.5);
  background-color: #fff;
  border: 1px #979797 solid;
  width: 100%;
  max-width: 720px;
  padding: 12px;
  @media (min-width: 720px) {
    width: 720px;
  }
`;

export const DayRoomTitle = styled.div`
  display: flex;
  justify-content: space-between;
  color: #797979;
  align-items: center;
  padding: 8px;
  border-radius: 8px;
  border: 4px solid #fed;
`;

export const DayRoomDay = styled.div`
  font-size: 20px;
  font-weight: 800;
  color: #7c04f4;
`;

export const DayRoomRoles = styled.div`
  display: flex;
  align-items: center;
`;

export const DayRoomRoleWrapper = styled.div`
  width: 64px;
  margin: 8px;
  display: flex;
  align-items: center;
`;

export const DayRoomRoleImmg = styled.img`
  width: 48px;
`;

export const DayRoomRoleAmount = styled.div`
  font-weight: 800;
  color: #b92aa1;
`;

export const DayRoomContent = styled.div`
  font-size: 20px;
`;

export const DayRoomTurnImg = styled.div`
  margin: 32px 0;
  width: 100%;
  height: 240px;
  background-image: ${props => `url(${props.src})`};
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`;

export const DayRoomFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 48px;
`;

export const DayRoomTimmer = styled.div`
  font-weight: 700;
  font-size: 20px;
  color: #7c04f4;
  display: flex;
  align-items: center;
  text-align: center;
`;

export const DayRoomPower = styled.div``;
