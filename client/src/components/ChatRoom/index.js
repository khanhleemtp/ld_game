import React from 'react'
import { AiOutlineSend } from 'react-icons/ai'
import { MdKeyboardVoice } from 'react-icons/md'
import SocialBtn from '../SocialBtn'
import { 
    ChatRoomContainer, ChatRoomIconContainer,
    ChatRoomRoles, ChatRoomInput, ChatRoomInputWrapper,
    ChatRoomText, ChatRoomFooter, ChatRoomTextWrapper
} from './styles'

const ChatRoom = () => {
    return (
        <>
            <ChatRoomContainer>
                <ChatRoomRoles></ChatRoomRoles>
                <ChatRoomInputWrapper>
                    <ChatRoomTextWrapper>
                        <ChatRoomText>
                            abc
                        </ChatRoomText>
                        <ChatRoomText>
                            abc
                        </ChatRoomText>
                        <ChatRoomText>
                            abc
                        </ChatRoomText>
                        <ChatRoomText>
                            abc
                        </ChatRoomText>
                        <ChatRoomText>
                            abc
                        </ChatRoomText>
                        <ChatRoomText>
                            abc
                        </ChatRoomText>
                        <ChatRoomText>
                            abc
                        </ChatRoomText>
                        <ChatRoomText>
                            abc
                        </ChatRoomText>
                        <ChatRoomText>
                            abc
                        </ChatRoomText>
                    </ChatRoomTextWrapper>
                    <ChatRoomFooter>
                        <ChatRoomInput />
                        <ChatRoomIconContainer>
                            <SocialBtn
                                icon={< AiOutlineSend />}
                                bgColor="#ca1f56"
                                color="#fff"
                                size="24px"
                                width="32px"
                                height="32px"
                                margin="0 12px"
                            />
                            <SocialBtn
                                icon={< MdKeyboardVoice />}
                                bgColor="#ca1f56"
                                color="#fff"
                                size="24px"
                                width="32px"
                                height="32px"
                                margin="0 12px"
                            />
                        </ChatRoomIconContainer>
                    </ChatRoomFooter>
                </ChatRoomInputWrapper>
            </ChatRoomContainer>
        </>
    )
}

export default ChatRoom
