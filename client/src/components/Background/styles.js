import styled from 'styled-components';

export const BackgroundWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    background-image: ${ props => `url(${props.bgSrc})` };
    width: 100%;
    height: 100%;
    min-height: 100vh;
    background-color: ${ props => props.bgColor };
    background-repeat: repeat;
    background-position: center;
    z-index: -1;
    /* filter: brightness(80%); */
    /* filter: blur(1px); */
    @media (min-width: 640px) {
        filter: brightness(100%);
        background-color: ${ props => props.bgDesColor };
    }
`