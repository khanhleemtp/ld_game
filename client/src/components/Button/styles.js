import styled from 'styled-components'

export const ButtonWrapper = styled.button`
    width: 230px;
    height: 40px;
    display: flex;
    align-items: center;
    background: ${ props => props.bgColor};
    padding: 10px 15px 10px 15px;
    border-top-width: 1px;
    border-bottom-width: 1px;
    border-radius: 34px;
    box-shadow: 0 0 0 2px #002043, 0 0 0 2px #7c92b0;
    line-height: 1;
    outline: none;
    cursor: pointer;
    margin: 0 4px 12px 4px;
    &:hover{
        filter: brightness(95%);
    }
    @media (min-width: 640px) {
        width: 186px;
    }
`

export const ButtonIcon = styled.img`
    flex-grow: 1;

`

export const ButtonText = styled.strong`
    flex-grow: 3;
    text-align: center;
    text-transform: uppercase;
    font-size: 18px;
    color: ${ props => props.textColor || `#fff` };
    font-weight: 800;
`


