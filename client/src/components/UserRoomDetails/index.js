import React from 'react'
import { useSocket } from '../../context/SocketProvider'
import { UserContainer, UserWrapper, UserDetail, 
        UserAvatarWrapper, UserAvatarContent,
        UserInfoWrapper, UserInfoName, UserInfoVote
} from './styles'
import { AiFillDingtalkCircle } from 'react-icons/ai'

export const UserRoomDetails = () => {
    const { gameState, userInfo } = useSocket();
    const { players } = gameState;

    return (
        <div>
            <UserContainer>
            
                <UserWrapper>
                {
                    players && players.map(player => (
                        <UserDetail key={player._id} user={userInfo && userInfo._id === player._id}>
                            <UserAvatarWrapper>
                                <UserAvatarContent>
                                </UserAvatarContent>
                            </UserAvatarWrapper>
                            <UserInfoWrapper>
                                <UserInfoName>{player.nickName}
                                    {player.isPartyLeader ? <AiFillDingtalkCircle /> : ""}
                                </UserInfoName>
                                <UserInfoVote>10 votes</UserInfoVote>
                            </UserInfoWrapper>
                        </UserDetail>
                    ))
                }
                </UserWrapper>
            </UserContainer>

        </div>
    )
}
