import styled from "styled-components";

export const OverlayWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 100vh;
    z-index: 100;
    height: 100%;
    background-color: rgb(46 45 45 / 90%);
    /* opacity: 0; */
    opacity: ${ ({ isOpenPopup }) => isOpenPopup ? 1: 0 }
`