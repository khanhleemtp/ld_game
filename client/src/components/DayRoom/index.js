import React from 'react'
import SocialBtn from '../SocialBtn'
import { DayRoomContainer,
    DayRoomTitle,
    DayRoomContent,
    DayRoomFooter,
    DayRoomRoleAmount,
    DayRoomRoleImmg,
    DayRoomRoles,
    DayRoomTimmer,
    DayRoomTurnImg,
    DayRoomDay,
    DayRoomRoleWrapper
} from './styles'
import {useHistory } from 'react-router-dom'
import { AiOutlineClose, AiOutlineClockCircle } from 'react-icons/ai'
import { Button } from '../Button'
import { TokenService } from '../../services/storage.service'
import { useSocket } from '../../context/SocketProvider'
import CountDown from '../Countdown/Countdown'

const DayRoom = () => {
    const { socket, gameState, setGameState, userInfo, isStart, startDayGame } = useSocket();
    const { players, maxPlayer, maxWolf } = gameState;
    
    const history = useHistory();
        const nickName = TokenService.getToken('ldname');
    const leftRoom = () => {
        console.log("Left room",nickName, gameState)
        socket.emit('left-game', nickName, gameState._id);


        setGameState(prev => { 
            return {...prev, _id: "", players: players.filter(player => player.nickName!== nickName ) }
        })

        TokenService.removeToken('room_name');

        history.push('/');
    }
    return (
        <DayRoomContainer>
            <div  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <div style={{ color: '#4e14ff' }}>
                   <span style={{ textTransform: 'uppercase', fontWeight: '800', marginRight: '8px', color: '#000' }}>
                       Tên phòng:  
                   </span> 
                   {TokenService.getToken('room_name')}
                </div>
                <SocialBtn
                    icon={< AiOutlineClose />}
                    bgColor="#ca1f56"
                    color="#fff"
                    size="24px"
                    width="32px"
                    height="32px"
                    onClick={leftRoom}
                />
            </div>
            <DayRoomTitle>
                <DayRoomRoles>
                    <DayRoomRoleWrapper title="Bảo vệ">
                        <DayRoomRoleImmg src="/logo_card/Bodyguard.png" alt="roles" />
                        <DayRoomRoleAmount>X1</DayRoomRoleAmount>
                    </DayRoomRoleWrapper>
                    {/* <DayRoomRoleWrapper>
                        <DayRoomRoleImmg title="Phù thủy" src="/logo_card/Witch.png" alt="roles" />
                        <DayRoomRoleAmount>X1</DayRoomRoleAmount>
                    </DayRoomRoleWrapper> */}
                    <DayRoomRoleWrapper>
                        <DayRoomRoleImmg title="Dân làng" src="/logo_card/Villager.png" alt="roles" />
                        <DayRoomRoleAmount>X{maxPlayer - 1 - maxWolf - 1}</DayRoomRoleAmount>
                    </DayRoomRoleWrapper>
                    <DayRoomRoleWrapper>
                        <DayRoomRoleImmg title="Sói" src="/logo_card/wolf_normal.png" alt="roles" />
                        <DayRoomRoleAmount>X{maxWolf}</DayRoomRoleAmount>
                    </DayRoomRoleWrapper>
                    {/* <DayRoomRoleWrapper>
                        <DayRoomRoleImmg title="Thợ săn" src="/logo_card/hunter.png" alt="roles" />
                        <DayRoomRoleAmount>X1</DayRoomRoleAmount>
                    </DayRoomRoleWrapper> */}
                    <DayRoomRoleWrapper>
                        <DayRoomRoleImmg title="Tiên tri" src="/logo_card/magic.png" alt="roles" />
                        <DayRoomRoleAmount>X1</DayRoomRoleAmount>
                    </DayRoomRoleWrapper>
                </DayRoomRoles>
                <DayRoomDay>Ngày 2</DayRoomDay>
            </DayRoomTitle>
            <DayRoomContent>
                <DayRoomTurnImg />
            </DayRoomContent>
            <DayRoomFooter>
                <CountDown />
                <DayRoomTimmer>
                    <SocialBtn
                        icon={< AiOutlineClockCircle />}
                        bgColor="#ca1f56"
                        color="#fff"
                        size="24px"
                        width="24px"
                        height="24px"
                        margin="0 12px"
                    />
                        Time: 2:00
                </DayRoomTimmer>
                {
                    userInfo && userInfo.isPartyLeader ? 
                        <Button 
                            bgColor={isStart ? "#13bafe": '#ddd'}
                            text="Start"
                            textColor="#001b4d"
                            alt="btn"
                            disabled={!isStart}
                            onClick={startDayGame}
                    /> : null
                }
            </DayRoomFooter>
        </DayRoomContainer>
    )
}

export default DayRoom
