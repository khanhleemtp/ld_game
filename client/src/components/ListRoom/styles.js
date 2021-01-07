import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const RoomTitleWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px;
`

export const RoomTitleText = styled.div`
    display: flex;
    margin: 1px 0 0;
    font-size: 22px;
    padding: 0 5px;
    text-transform: uppercase;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-family: nunitoblack;
    text-align: center;
    font-size: 24px;
    line-height: 2;
    color: #ffbf00;
    letter-spacing: 0;
    margin: 12px 0 0;
    text-shadow: 0 -1px 0 #fffa6d, #001b51 3px 0 0, #001b51 2.83487px 0.981584px 0, #001b51 2.35766px 1.85511px 0, #001b51 1.62091px 2.52441px 0, #001b51 0.705713px 2.91581px 0, #001b51 -0.287171px 2.98622px 0, #001b51 -1.24844px 2.72789px 0, #001b51 -2.07227px 2.16926px 0, #001b51 -2.66798px 1.37182px 0, #001b51 -2.96998px 0.42336px 0, #001b51 -2.94502px -0.571704px 0, #001b51 -2.59586px -1.50383px 0, #001b51 -1.96093px -2.27041px 0, #001b51 -1.11013px -2.78704px 0, #001b51 -0.137119px -2.99686px 0, #001b51 0.850987px -2.87677px 0, #001b51 1.74541px -2.43999px 0, #001b51 2.44769px -1.73459px 0, #001b51 2.88051px -0.838247px;
`

export const ListRoomContainer = styled.div`
    user-select: none;
    margin: 12px;
    background-color: #fff;
    box-shadow: 0 2.5px 10px 0 rgba(0,0,0,.3);
    align-self: stretch;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    border: none;
    overflow: hidden;
    flex: 1;
`

export const RoomTitle = styled.div`
    text-transform: uppercase;
    font-size: 20px;
    display: flex;
    font-size: 15px;
    color: #868d96;
    letter-spacing: 1.15px;
    text-align: left;
    padding: 10px;
    box-shadow: 0 2.5px 10px 0 rgba(0,0,0,.3);
    font-weight: 800;
`

export const RoomContentContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: flex-start;
    min-height: 0;
    overflow: hidden;
    margin: 0;
`

export const RoomContentWrapper = styled.div`
    height: 520px;
    overflow: auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: initial;
    margin: 0;
`

export const RoomElementContainer = styled.div`
    text-decoration: none;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 36px;
    font-size: 18px;
    font-weight: 500;
    color: #797979;
    &:hover{
        background: #ddd;
    }
`


export const RoomElementName = styled.div`
`

export const RoomElementAmount = styled.div`

`

export const RoomSearchWrapper = styled.div`
    width: 100%;
    display: flex; 
    max-width: 1280px;
    /* max-width: 320px; */
    align-items: center;
    justify-content: flex-end;
`

export const RoomSearchInput = styled.input`
    width: 100%;
    max-width: 320px;
    display: flex;
    margin: 0px 12px;
    outline: none;
    padding: 8px 6px;
    border-radius: 8px;
`