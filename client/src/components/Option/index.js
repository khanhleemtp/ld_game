import React from 'react'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import { IconContext } from 'react-icons'
import { OptionText, OptionWrapper } from './styles'
export default function Option({ text, size, color, icon }) {
    return (
        <IconContext.Provider
            value={{
                color: color,
                size: size,
            }}
        >   
            <OptionWrapper>
                {icon}
                <OptionText>
                    {text}
                </OptionText>   
            </OptionWrapper>
        </IconContext.Provider>
    )
}
