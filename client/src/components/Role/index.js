import React from "react";
import styled from "styled-components";

const StyleRole = styled.div`
  .role {
    height: 48px;
    display: flex;
    align-items: center;

    &__image {
      width: 48px;
      height: 48px;

      &__init {
        width: 100%;
        height: 100%;
        /* filter: grayscale(100%); */
      }
    }

    span {
      margin-left: 4px;
      font-weight: bold;
      font-size: 20px;
    }
  }
`;

const listSourceImage = {
  seer: {
    src: "/logo_card/magic.png"
  },
  wolf: {
    src: "/logo_card/wolf_normal.png"
  },
  villager: {
    src: "/logo_card/Villager.png"
  },
  guard: {
    src: "/logo_card/Bodyguard.png"
  }
};

const Role = ({ userInfo }) => {
  return (
    <StyleRole>
      <div className="role">
        <div className="role__image">
          {userInfo?.role ? (
            <img className="role__image__init" src={listSourceImage[userInfo.role].src} alt="icon" />
          ) : null}
        </div>
        <span>{userInfo?.role}</span>
      </div>
    </StyleRole>
  );
};

export default Role;
