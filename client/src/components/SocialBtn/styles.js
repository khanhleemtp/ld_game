import styled from 'styled-components'

export const SocialBtnWrapper = styled.button`
    width: ${ props => props.width ? props.width : '140px' };
    height: ${ props => props.height ? props.height : '40px' };
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${ props => props.bgColor};
    padding: 8px 10px 8px 10px;
    border: 2px;
    border-radius: 8px;
    box-shadow: 0 0 0 1px #002043, 0 0 0 1px #7c92b0;
    line-height: 1;
    outline: none;
    cursor: pointer;
    margin: ${ props => props.margin ? props.margin : '0 4px 12px 4px' };
    &:hover{
        filter: brightness(95%);
    }
    @media (min-width: 640px) {
        width: ${ props => props.width ? props.width : '160px' };
    }
`

export const SocialBtnIcon = styled.div`
    flex-grow: 1;
`

export const SocialBtnText = styled.strong`
    flex-grow: 3;
    text-align: center;
    text-transform: uppercase;
    font-size: 16px;
    color: ${ props => props.textColor || `#fff` };
    font-weight: 800;
`
