import React from 'react'
import BackgroundImg from './components/Background'
import { Button } from './components/Button'
import Option from './components/Option'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import { CgLogIn } from 'react-icons/cg'
import Logo from './components/Logo'
import InputContainer from './components/Input'
import Avatar from './components/Avatar'

const App = () => {
  return (
    <>
    <div style={{ position: 'relative' }}>
            <BackgroundImg 
              bgSrc="/imgBg/bg.png"
              bgColor="#0C58FD"
              bgDesColor="#0A5EFB"
            />
            <div style={{ height: '100%', width: '100%', position: 'absolute', top: 0, left: 0 }}>
                <div style={{ marginTop: '12px', height: '100%', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-around' }}>
                        <Option 
                          text="Thông tin" 
                          color="#fff"
                          size="32px"
                          icon={<AiOutlineInfoCircle />}
                          />
                        <Logo
                          alt="logo"
                          src="/imgLogo/logo.png"
                        />
                          <Option 
                          text="Đăng nhập" 
                          color="#fff"
                          size="32px"
                          icon={<CgLogIn />}
                          />
                  </div>
                    <div style={{ position: 'relative', width: '300px', height: '320px', margin: '120px 0' }}>
                      <div style={{ position: 'absolute', top: '-100px', left: '50%', transform: 'translateX(-50%)' }}>
                            <Avatar src="/avatar/1.svg" />
                      </div>
                      <div style={{ background: "#fff", display: 'flex', flexDirection: 'column', padding: '24px 32px' , borderRadius: '8px' }}>
                              <InputContainer
                                label="Tài khoản:"
                                placeholder="Vui lòng nhập tài khoản"
                              />
                              <InputContainer
                                label="Mật khẩu:"
                                placeholder="Vui lòng nhập mật khẩu"
                              />
                      </div>
                    </div>

                    <div>
                        <Button 
                          bgColor="#ffbf00"
                          text="Chơi!"
                          iconSrc="/imgButton/play.svg"
                          textColor="#001b4d"
                          alt="btn"
                          />
                        <Button 
                          bgColor="#13bafe"
                          text="Các phòng"
                          iconSrc="/imgButton/room.svg"
                          textColor="#001b4d"
                          alt="btn"
                        />
                    </div>
                </div>
            </div>
    </div>
    </>
  )
}

export default App
