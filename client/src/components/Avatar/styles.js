import styled from 'styled-components'

export const AvatarWrapper = styled.div`
    position: relative;
    min-width: 120px;
    min-height: 120px;
    width: 110px;
    height: 110px;
    border: 3px #fff solid;
    box-shadow: 0 0 0 3px #043173;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 100%;
    border: 4px #fff solid;
    box-shadow: 0 0 0 4px #043173;
`

export const AvatarImg = styled.div`
    background-image: ${props => `url(${props.src})`};
    width: 100%;
    height: 100%;
    position: absolute;
    bottom: 0;
    background-position: bottom center;
    background-repeat: no-repeat;
    background-size: 100%;
    left: 50%;
    transform: translateX(-50%);
`



