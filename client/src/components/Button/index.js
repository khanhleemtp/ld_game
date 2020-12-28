import React from 'react'
import { ButtonWrapper, ButtonIcon, ButtonText } from './styles'

export const Button = ({ bgColor, iconSrc, text, alt, textColor }) => {
    return (
        <ButtonWrapper bgColor={bgColor}>
            <ButtonIcon 
                src={iconSrc}
                alt={alt} />
            <ButtonText textColor={textColor}>
                {text}
            </ButtonText>
        </ButtonWrapper>
    )
}
