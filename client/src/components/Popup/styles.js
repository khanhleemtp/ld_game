import styled, { css, keyframes } from 'styled-components';

const flash = keyframes`
    0% {
        opacity: 0;
        transform: scale(0.1);
        transform: translate(-50%, 12px);
    }
    100% {
        opacity: 1;
    }
`;

const styles = css`
  color: red;
  animation-name: ${flash};
  animation-duration: 0.25s;
  animation-delay: 0s;
  animation-timing-function: linear
`;



export const PopupWrapper = styled.div`
    user-select: none;
    max-width: 640px;
    z-index: 100;
    background-color: #fff;
    border: 1px #979797 solid;
    width: calc(100% - 30px);
    position: absolute;
    padding: 0;
    margin: 18px 0 0;
    background-color: #fff;
    border: 1px #979797 solid;
    border-radius: 22px;
    top: 240px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    height: auto;
    animation:  ${ ({ isOpenPopup }) => isOpenPopup ? styles: "" }
`


export const PopupBannerWrapper = styled.div`
    background: url('/avatar/popupDesk.png');
    width: 280px;
    height: 65px;
    background-size: cover;
    background-repeat: no-repeat;
    margin: -36px 0 0;
    display: flex;
    flex-direction: column;
    background-position: center;
    align-items: center;
`

export const PopupBannerText = styled.div`
    max-width: 140px;
    font-size: 19px;
    color: #f9c236;
    margin: 9px 0 0;
    padding: 0 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 2;
    letter-spacing: 0;
    font-family: nunitoblack;
    /* font-family: 'Nunito', sans-serif; */
    text-align: center;
    text-transform: uppercase;
    font-weight: semibold;
    text-shadow: 0 -1px 0 #fffa6d, #001b51 3px 0 0, #001b51 2.83487px 0.981584px 0, #001b51 2.35766px 1.85511px 0, #001b51 1.62091px 2.52441px 0, #001b51 0.705713px 2.91581px 0, #001b51 -0.287171px 2.98622px 0, #001b51 -1.24844px 2.72789px 0, #001b51 -2.07227px 2.16926px 0, #001b51 -2.66798px 1.37182px 0, #001b51 -2.96998px 0.42336px 0, #001b51 -2.94502px -0.571704px 0, #001b51 -2.59586px -1.50383px 0, #001b51 -1.96093px -2.27041px 0, #001b51 -1.11013px -2.78704px 0, #001b51 -0.137119px -2.99686px 0, #001b51 0.850987px -2.87677px 0, #001b51 1.74541px -2.43999px 0, #001b51 2.44769px -1.73459px 0, #001b51 2.88051px -0.838247px 0;
    `

export const PopupTitle = styled.div`
    color: #797979;
    font-size: 18px;
    line-height: 1;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    text-align: center;
`

export const SelectWrapper = styled.form`
    margin: 16px 0;
    div{
        font-size: 18px;
        color: #f70089;
        font-weight: 600px;
    }
    select{
        border-radius: 8px;
        padding: 8px 12px;
        width: 120px;
        outline: none;
        margin: 4px 0 12px 0;
    }
    input{
        outline: none;
        padding: 8px 12px;
        border-radius: 8px;
    }
`


export const PopupContent = styled.div`
    margin: 16px 0;
`

export const IconWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 4px 16px;
    svg{
        cursor: pointer;
    }
`