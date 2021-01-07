import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import BackgroundImg from '../components/Background'
import { Button } from '../components/Button'
import { ListRoomElement } from '../components/ListRoom'
import Popup from '../components/Popup'
import { useSocket } from '../context/SocketProvider'
import { getRooms } from '../redux/actions/roomAction'

export const ListRoom = () => {
    const { gameState } = useSocket();
    const [isOpenPopup, setIsOpenPopup] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getRooms())
    }, [dispatch, gameState])
    return (
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {
              isOpenPopup ? (
                <Popup 
                  isOpenPopup={isOpenPopup}
                  setIsOpenPopup={setIsOpenPopup}
                  />
                ) : null
              }
              <BackgroundImg
                    bgSrc="/byDuong/menu_background.png"
                    bgColor="#0C58FD"
                    bgDesColor="#0A5EFB"     
              />
              <ListRoomElement />  
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', margin: '32px', width: '100%', maxWidth: '1280px' }}>
                <div onClick={() => setIsOpenPopup(true)}>
                    <Button 
                        bgColor="#13bafe"
                        text="Phòng mới"
                        iconSrc="/imgButton/room.svg"
                        textColor="#001b4d"
                        alt="btn"
                    />
                </div>
              </div>
          </div>
    )
}
