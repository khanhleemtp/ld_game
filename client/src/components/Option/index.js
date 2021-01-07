import React from 'react'
import { IconContext } from 'react-icons'
import { OptionText, OptionWrapper } from './styles'
export default function Option({ text, size, color, icon, onClick }) {
    return (
        <IconContext.Provider
            value={{
                color: color,
                size: size,
            }}
        >   
            <OptionWrapper
                onClick={onClick}
            >
                {icon}
                <OptionText>
                    {text}
                </OptionText>   
            </OptionWrapper>
        </IconContext.Provider>
    )
}
