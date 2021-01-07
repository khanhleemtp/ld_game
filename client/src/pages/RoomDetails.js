import React, { useEffect, useState } from 'react'
import BackgroundImg from '../components/Background'
import ChatRoom from '../components/ChatRoom'
import DayRoom from '../components/DayRoom'
import { UserRoomDetails } from '../components/UserRoomDetails'

export const RoomDetails = () => {
    // const { socket } = useSocket();

    // const { id } = useParams();
    // const userInfo = TokenService.getToken('ldname');
    // console.log(id);

    // useEffect(() => {
    //     if(socket == null) return;
    //     socket.on('hello', (msg) => console.log(msg));
    //     socket.emit('roomInfo', { roomId: id, userInfo } );
    //     return () => {
    //         socket.off('hello');
    //     }
    // }, [socket])

    return (
        <>
            <div style={{ display: 'flex', position: 'relative', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
                <BackgroundImg 
                  bgSrc="/byDuong/menu_background.png"
                  bgColor="#0C58FD"
                  bgDesColor="#0A5EFB"
                />
                <UserRoomDetails />
                <div>
                    <DayRoom />
                    <ChatRoom />
                </div>
            </div>
        </>
    )
}
