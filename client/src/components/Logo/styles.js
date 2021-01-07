import styled from 'styled-components'

export const LogoWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 120px;
    position: relative;
`

export const LogoImg = styled.img`
    width: 100%;
    position: absolute;
    bottom: -100%;
    left: 50%;
    transform: translate(-50%, 100%);

`