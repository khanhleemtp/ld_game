import styled from "styled-components";

export const ChatRoomContainer = styled.div`
  width: 100%;
  max-width: 720px;
  margin: 0 auto;
  height: 200px;
  border-radius: 12px;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.5);
  background-color: #fff;
  border: 1px #979797 solid;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 8px;
`;

export const ChatRoomRoles = styled.div`
  cursor: pointer;
  font-weight: 600;
  padding: 8px 16px;
  margin: 0 12px;
  background: #dfe;
  width: 120px;
  border-radius: 8px;
  color: #fff;
  background: ${({ wolf }) => (wolf ? "#fb006d" : `#524280`)};
`;

export const ChatRoomTextWrapper = styled.div`
  height: 100%;
  overflow-y: auto;
  height: 100px;
  padding: 8px;
`;

export const ChatRoomText = styled.div`
  font-size: 18px;
  font-weight: 600;
`;

export const ChatRoomInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px;
`;
export const ChatRoomFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ChatRoomInput = styled.input`
  width: 100%;
  height: 40px;
  padding: 8px 12px;
  border-radius: 8px;
  outline: none;
  display: flex;
  align-items: center;
`;

export const ChatRoomIconContainer = styled.div`
  display: flex;
`;
