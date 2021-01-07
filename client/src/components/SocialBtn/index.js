import React from 'react'
import { SocialBtnIcon, SocialBtnText, SocialBtnWrapper } from './styles'
import { IconContext} from 'react-icons'

export default function SocialBtn({ type, icon, text, bgColor, color, size, width, height, margin, onClick }) {
    return (
        <IconContext.Provider
                value={{
                    color: color,
                    size: size,
            }}
        >
                <SocialBtnWrapper
                    bgColor={bgColor}
                    width={width}
                    height={height}
                    margin={margin}
                    type={type ? type : "submit"}
                    onClick={onClick}
                >
                    <SocialBtnIcon>
                        {icon}
                    </SocialBtnIcon>
                    {
                        text ? <SocialBtnText>{text}</SocialBtnText> : null
                    }
                </SocialBtnWrapper>
        </IconContext.Provider>
    )
}
